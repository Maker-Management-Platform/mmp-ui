import { Asset } from "@/assets/entities/Assets";
import * as THREE from 'three';
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import {ViewHelper} from 'three/addons/helpers/ViewHelper.js'
import { Box } from "@mantine/core";

type State = {
    models: Asset[] | null,
    modelsRendered: ModelMesh[],
    parent: HTMLElement,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer
    loader: STLLoader,
    local_backend: string,
    controls: OrbitControls | null,
    group: THREE.Group,
    dirty: boolean,
    boxHelper: THREE.Box3Helper | null,
}

type ModelMesh = {
    id: String,
    mesh: THREE.Mesh,
    model: Asset
}

export type Viewer3D = {
    destroy(): void;
    setModels(models: Asset[]): void;
}

export const createViewer3D = (parent: HTMLElement, local_backend: string): Viewer3D => {
    const state: State = {
        models: [],
        modelsRendered: [],
        parent: parent,
        camera: new THREE.PerspectiveCamera(20, parent.offsetWidth / parent.offsetHeight, 1, 1000),
        scene: new THREE.Scene(),
        local_backend: local_backend,
        renderer: new THREE.WebGLRenderer({ antialias: true }),
        loader: new STLLoader(),
        controls: null,
        group: new THREE.Group(),
        dirty: false,
        boxHelper: null
    }

    state.scene = new THREE.Scene();
    state.scene.background = new THREE.Color( 0x333333 );

    state.renderer.setPixelRatio( parent.offsetWidth / parent.offsetHeight );
    state.renderer.setSize( parent.offsetWidth , parent.offsetHeight );
    parent.appendChild( state.renderer.domElement );

    // state.camera = new THREE.PerspectiveCamera( 60, parent.offsetWidth / parent.offsetHeight, 1, 1000 );
    state.camera.position.set( 400, 200, 0 );
    state.camera.lookAt( 0,0,0 );

    // controls

    state.controls = new OrbitControls( state.camera, state.renderer.domElement );

    state.controls.enableDamping = true; 
    state.controls.dampingFactor = 0.05;
    state.controls.screenSpacePanning = false;
    state.controls.minDistance = 100;
    state.controls.maxDistance = 500;
    state.controls.maxPolarAngle = Math.PI / 2;

    // lights
    const dirLight1 = new THREE.DirectionalLight( 0xffffff, 3 );
    dirLight1.position.set( 1, 1, 1 );
    state.scene.add( dirLight1 );

    const dirLight2 = new THREE.DirectionalLight( 0x002288, 3 );
    dirLight2.position.set( -1, -1, -1 );
    state.scene.add( dirLight2 );

    const dirLight3 = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight3.position.set( -1, -1, -1 );
    state.scene.add( dirLight3 );

    const ambientLight = new THREE.AmbientLight( 0x555555 );
    // state.scene.add( ambientLight );

    state.scene.add(state.group)


    function onParentResize() {
        state.camera.aspect = parent.offsetWidth / parent.offsetHeight;
        state.renderer.setSize(state.parent.offsetWidth, state.parent.offsetHeight);
        state.camera.updateProjectionMatrix();
    }

    function drawHelpers(){
        state.scene.updateWorldMatrix(true, true); //make sure all transforms are updated after loading models 

        const groupCenter = new THREE.Vector3();
        const box = new THREE.Box3();
        box.setFromObject(state.group);
        box.getCenter(groupCenter);

        if(state.boxHelper){
            state.scene.remove(state.boxHelper);
        }
        state.boxHelper = new THREE.Box3Helper( box, 0x719CD6 );
        state.scene.add( state.boxHelper );
        
        //set camera and controls to look to center of boundingbox
        state.camera.lookAt(groupCenter);
        state.controls?.target.set(groupCenter.x, groupCenter.y, groupCenter.z);
    }

    function animate() {
        if(state.dirty){
            drawHelpers();
            state.dirty = false;
        }
        state.renderer.clear();
        state.controls.update();
        
        // helper.render(state.renderer);
        state.renderer.render(state.scene, state.camera);
        requestAnimationFrame(animate);
    }

    window.addEventListener( 'resize', onParentResize );
    animate();


    return {
        destroy() {
            state.renderer.dispose();
            state.renderer.forceContextLoss();
            console.log("WebGL Context Destroyed");
        },
        setModels(models: Asset[]) {
            state.models = models;
            const material = new THREE.MeshPhongMaterial({ color: 0xd5d5d5, specular: 0x494949, shininess: 10, flatShading : true});
            state.group.clear();
            state.models.forEach((model) => {
                const renderedModel = state.modelsRendered.find(mr => {return model.id == mr.id});
                if(renderedModel){
                    state.group.add(renderedModel.mesh);
                    state.dirty = true;
                    return;
                }

                state.loader.load(`${state.local_backend}/projects/${model.project_uuid}/assets/${model.id}/file`, function (geometry) {

                    const mesh = new THREE.Mesh(geometry, material);

                    mesh.position.set(0, 0, 0);
                    mesh.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
                    mesh.scale.set(1,1,1);

                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                    mesh.geometry.computeBoundingBox();

                    state.group.add(mesh);
                    const id:String =  model.id;
                    state.modelsRendered.push({mesh: mesh, id: id, model: model});
                    state.dirty = true;
                });
            });
        }
    }
}