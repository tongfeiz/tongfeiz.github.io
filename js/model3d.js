class Model3DHandler {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            physicallyCorrectLights: true
        });
        this.loadedObject = null;
        this.scrollY = 0;
        this.targetScrollY = 0;
        this.targetRotationX = 0;
        this.targetRotationY = 0;

        this.init();
        this.setupLights();
        this.loadModel();
        this.animate();
    }

    init() {
        const container = document.getElementById('canvas-container');
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this.renderer.domElement);
        this.camera.position.z = 8;

        window.addEventListener('scroll', () => {
            this.targetScrollY = window.scrollY;
        });

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }


    


    setupLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
        this.scene.add(ambientLight);


        const rectLight1 = new THREE.RectAreaLight(0xffffff, 30, 20, 10); // Intensity, width, height
        rectLight1.position.set(3, 20, 3);
        this.scene.add(rectLight1);
        
        /*
        COLOR OPTIONS:
        - FF3300 (fire kind of light)
        - 0b67ff (blue kind of light)
    */

        /*-----------BIG
        const directionalLight1 = new THREE.DirectionalLight(0xFFFFFF, 1);
        directionalLight1.position.set(10, 10, 3);
        this.scene.add(directionalLight1);


        const directionalLight2 = new THREE.DirectionalLight(0xFFFFFF, 1.2);
        directionalLight2.position.set(-5, -5, 3);
        this.scene.add(directionalLight2);
-----------*/
        
        /*-----------SMALL LIGHTS
        const pointLight1 = new THREE.PointLight(0xffffff, 0.5, 50, 2); // Higher distance and decay for softer effect
        pointLight1.position.set(3, 3, 3);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 0.5, 50, 2); // Match parameters for uniform effect
        pointLight2.position.set(-3, -3, 3);
        this.scene.add(pointLight2);
        -----------*/
        


    }

    createMetallicMaterial() {
        return new THREE.MeshPhysicalMaterial({
            color: 0xCECECE,
            metalness: 0.7,
            roughness: 0.2,
            reflectivity: 1,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2,
            envMapIntensity: 1.0

        });
    }

    loadModel() {
        const objLoader = new THREE.OBJLoader();
        objLoader.load(
            './models/homepagesigil.obj',
            (object) => {
                object.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.material = this.createMetallicMaterial();
                    }
                });

                const box = new THREE.Box3().setFromObject(object);
                const center = box.getCenter(new THREE.Vector3());
                object.position.sub(center);

                object.position.x -= 1; //position X
                object.position.y += 3; //position Y
                object.rotation.set(0, 0, 0);
                object.scale.set(0.35, 0.32, 0.15);
                object.userData.initialY = object.position.y;

                this.loadedObject = object;
                this.scene.add(object);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.error('Error loading OBJ:', error);
            }
        );
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.scrollY += (this.targetScrollY - this.scrollY) * 0.05;

        if (this.loadedObject) {
            this.targetRotationY = window.mouseX * 0.5;
            this.targetRotationX = -window.mouseY * 0.5;

            this.loadedObject.rotation.y += (this.targetRotationY - this.loadedObject.rotation.y) * 0.1;
            this.loadedObject.rotation.x += (this.targetRotationX - this.loadedObject.rotation.x) * 0.1;

            const scrollFactor = 0.05;
            const targetY = this.loadedObject.userData.initialY + (this.scrollY * scrollFactor);
            this.loadedObject.position.y += (targetY - this.loadedObject.position.y) * 0.05;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the 3D model handler
const model3D = new Model3DHandler();
