import * as THREE from 'three'
import {Canvas, useLoader, useThree} from '@react-three/fiber'
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader.js';
import {Suspense, useContext, useEffect, useRef, useState} from "react";
import {Asset} from "../../../entities/Assets.ts";
import {Center, GizmoHelper, GizmoViewport, Grid, Html, OrbitControls, useProgress} from '@react-three/drei'
import {useElementSize} from "@mantine/hooks";
import {Alert} from "@mantine/core";
import { SettingsContext } from '@/core/utils/settingsContext.ts';


type ModelProps = {
    model: Asset,
    projectUuid: string
}

function Model({model, projectUuid}: ModelProps) {
    const {local_backend} = useContext(SettingsContext);
    const geom = useLoader(STLLoader, `${local_backend}/projects/${projectUuid}/assets/${model.sha1}`);
    const meshRef = useRef<THREE.Mesh>(null!)

    const [active, setActive] = useState(false)

    // Subscribe this component to the render-loop, rotate the mesh every frame
    //useFrame((state, delta) => (meshRef.current.rotation.z += delta))
    return (
        <>
            <mesh
                name={model.sha1}
                onClick={(event) => setActive(!active)}
                ref={meshRef}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={0.1}>
                <primitive object={geom} attach="geometry"/>
                <meshStandardMaterial color="#9d4b4b"/>
            </mesh>
        </>

    )
}


type SceneProps = {
    models: Asset[],
    projectUuid: string
}

function Scene({models, projectUuid}: SceneProps) {
    return (
        <>
            <ambientLight intensity={0.5}/>
            <directionalLight castShadow position={[2.5, 5, 5]} intensity={1.5} shadow-mapSize={[1024, 1024]}>
                <orthographicCamera attach="shadow-camera" args={[-5, 5, 5, -5, 1, 50]}/>
            </directionalLight>
            <Center>
                <Suspense fallback={<Progress/>}>
                    <MoveCamera models={models}>
                        {models.map((model) => (
                            <Model key={model.sha1} model={model} projectUuid={projectUuid}/>
                        ))}
                    </MoveCamera>
                </Suspense>
            </Center>
            <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
                <GizmoViewport labelColor="white" axisHeadScale={1}/>
            </GizmoHelper>
            <OrbitControls makeDefault/>
        </>
    )
}

function MoveCamera({children, models}) {
    const group = useRef()
    const {camera, scene} = useThree()
    useEffect(() => {
        const box = new THREE.Box3();
        models.forEach((model) => {
            console.log(model.sha1, scene.getObjectByName(model.sha1));
            box.expandByObject(scene.getObjectByName(model.sha1));
        });
        const offset = 1.25
        console.log('weee', models)

        const center = box.getCenter(new THREE.Vector3());
        const middle = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getSize(size);
        const fov = camera.fov * (Math.PI / 180);
        const fovh = 2 * Math.atan(Math.tan(fov / 2) * camera.aspect);
        let dx = size.z / 2 + Math.abs(size.x / 2 / Math.tan(fovh / 2));
        let dy = size.z / 2 + Math.abs(size.y / 2 / Math.tan(fov / 2));
        let cameraZ = Math.max(dx, dy);

        // offset the camera, if desired (to avoid filling the whole canvas)
        if (offset !== undefined && offset !== 0) cameraZ *= offset;

        camera.position.set(0, 0, cameraZ);

        // set the far plane of the camera so that it easily encompasses the whole object
        const minZ = box.min.z;
        const cameraToFarEdge = (minZ < 0) ? -minZ + cameraZ : cameraZ - minZ;

        camera.far = cameraToFarEdge * 3;
        camera.updateProjectionMatrix();
        const box3Helper = new THREE.Box3Helper(box, 0x00ff00);
        box3Helper.material.linewidth = 3;
        scene.add(box3Helper);
    }, [models]);
    return (
        <group ref={group}>
            {children}
        </group>
    );
}

function Progress() {
    const {active, progress, errors, item, loaded, total} = useProgress()
    console.log(progress, loaded)
    return <Html center>{progress} % loaded {loaded}</Html>
}

type ModelDetailPaneProps = {
    models: Asset[],
    projectUuid: string
    onClose: () => void;
}

export function ModelDetailPane({models, projectUuid, onClose}: ModelDetailPaneProps) {
    console.log(models);
    const {ref, width} = useElementSize();
    return (
        <>
            <Alert variant="filled" color="gray" withCloseButton onClose={onClose} title={' '} ref={ref}>
                <Canvas shadows raycaster={{params: {Line: {threshold: 0.15}}}}
                        camera={{position: [-10, 10, 10], fov: 20}}
                        style={{height: width * (9 / 16)}}>
                    <Scene models={models} projectUuid={projectUuid}/>
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