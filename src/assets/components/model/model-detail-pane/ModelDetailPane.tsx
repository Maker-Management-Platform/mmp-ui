import * as THREE from 'three'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { Suspense, useContext, useLayoutEffect, useRef, useState } from "react";
import { Asset } from "../../../entities/Assets.ts";
import { Center, GizmoHelper, GizmoViewport, Grid, Html, OrbitControls, useProgress } from '@react-three/drei'
import { useElementSize } from "@mantine/hooks";
import { Alert, lighten } from "@mantine/core";
import { SettingsContext } from '@/core/utils/settingsContext.ts';


type ModelProps = {
    color: string,
    model: Asset,
    projectUuid: string
}

function Model({ color, model, projectUuid }: ModelProps) {
    const { local_backend } = useContext(SettingsContext);
    const geom = useLoader(STLLoader, `${local_backend}/projects/${projectUuid}/assets/${model.id}`);
    const meshRef = useRef<THREE.Mesh>(null!)

    const [active, setActive] = useState(false)

    // Subscribe this component to the render-loop, rotate the mesh every frame
    //useFrame((state, delta) => (meshRef.current.rotation.z += delta))
    return (
        <>
            <mesh
                name={model.id}
                onClick={() => setActive(!active)}
                ref={meshRef}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={0.1}>
                <primitive object={geom} attach="geometry" />
                <meshStandardMaterial color={color} />
            </mesh>
        </>

    )
}


type SceneProps = {
    models: Asset[],
    projectUuid: string
}

function Scene({ models, projectUuid }: SceneProps) {
    const colors = ["#9d4b4b", "#4C5897", "#5474B4", "#504C97", "#6B31B2", "#C91A52"]
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight castShadow position={[2.5, 5, 5]} intensity={1.5} shadow-mapSize={[1024, 1024]}>
                <orthographicCamera attach="shadow-camera" args={[-5, 5, 5, -5, 1, 50]} />
            </directionalLight>
            <Center>
                <Suspense fallback={<Progress />}>
                    <MoveCamera models={models}>
                        {models.map((model, i) => (
                            <Model key={model.id} color={colors[i % colors.length]} model={model} projectUuid={projectUuid} />
                        ))}
                    </MoveCamera>
                </Suspense>
            </Center>
            <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
                <GizmoViewport labelColor="white" axisHeadScale={1} />
            </GizmoHelper>
            <OrbitControls makeDefault />
        </>
    )
}

function MoveCamera({ children, models }: { children: JSX.Element[], models: Asset[] }) {
    const group = useRef<THREE.Group>()
    const { camera } = useThree()
    useLayoutEffect(() => {
        if (!group.current) return;
        const box = new THREE.Box3();
        box.setFromObject(group.current);



        const size = new THREE.Vector3();
        box.getSize(size);
        const fov = camera.fov * (Math.PI / 180);
        const fovh = 2 * Math.atan(Math.tan(fov / 2) * camera.aspect);
        let dx = size.z / 2 + Math.abs(size.x / 2 / Math.tan(fovh / 2));
        let dy = size.z / 2 + Math.abs(size.y / 2 / Math.tan(fov / 2));
        let cameraZ = Math.max(dx, dy);

        // offset the camera, if desired (to avoid filling the whole canvas)
        cameraZ *= 1.25;

        camera.position.set(0, 0, cameraZ);

        const newX = camera.position.x - (size.x / 2);
        const newY = camera.position.y - (size.y / 2);
        group.current.position.set(newX, newY, group.current.position.z)

        // set the far plane of the camera so that it easily encompasses the whole object
        const minZ = box.min.z;
        const cameraToFarEdge = (minZ < 0) ? -minZ + cameraZ : cameraZ - minZ;


        const box3Helper = new THREE.Box3Helper(box, 0x00ff00);
        box3Helper.material.linewidth = 3;
        group.current.add(box3Helper);
        
        const axesHelper = new THREE.AxesHelper(5);
        const center = new THREE.Vector3();
        box.getCenter(center)
        axesHelper.position.set(center.x, center.y, center.z)
        group.current.add(axesHelper);

        camera.far = cameraToFarEdge * 3;
        camera.updateProjectionMatrix();
        return () => {
            if (group.current) {
                group.current.remove(box3Helper);
                group.current.remove(axesHelper);
            }
        }
    }, [models]);
    return (
        <group ref={group}>
            {children}
        </group>
    );
}

function Progress() {
    const { progress, loaded } = useProgress()
    return <Html center>{progress} % loaded {loaded}</Html>
}

type ModelDetailPaneProps = {
    models: Asset[],
    projectUuid: string
    onClose: () => void;
}

export function ModelDetailPane({ models, projectUuid, onClose }: ModelDetailPaneProps) {
    console.log(models);
    const { ref, width } = useElementSize();
    return (
        <>
            <Alert variant="filled" color="gray" withCloseButton onClose={onClose} title={' '} ref={ref}>
                <Canvas shadows raycaster={{ params: { Line: { threshold: 0.15 } } }}
                    camera={{ position: [0, 0, 0], fov: 20 }}
                    style={{ height: width * (9 / 16) }}>
                    <Scene models={models} projectUuid={projectUuid} />
                </Canvas>
            </Alert>
        </>
    );
}

function Ground() {
    const gridConfig = {
        cellSize: 0.5,
        cellThickness: 0.5,
        cellColor: '#6f6f6f',
        sectionSize: 3,
        sectionThickness: 1,
        sectionColor: '#9d4b4b',
        fadeDistance: 30,
        fadeStrength: 1,
        followCamera: false,
        infiniteGrid: true
    }
    return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />
}