

/*window.addEventListener('load', function() {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    for (let i = 1; i < 5; i++) {
        const api = `${proxy}https://superheroapi.com/api/2647497422136185/${i}`;

        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
        });
    }
});*/

let scene, camera, renderer, cube;
var mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000 
    );

    renderer = new THREE.WebGLRenderer({antialias : true});

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    
    const geometry = new THREE.BoxGeometry(2,2,2);
    const material = new THREE.MeshBasicMaterial({color : 0xfffff});
//  const texture = new THREE.TextureLoader().load('metal.jpg');
//  const material = new THREE.MeshLambertMaterial({color : 0xFFCC00});
    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 2;
    scene.add(cube);
 
    const geometry2 = new THREE.BoxGeometry(2,2,2);
    const material2 = new THREE.MeshBasicMaterial({color : 0xfffff});
//  const texture = new THREE.TextureLoader().load('metal.jpg');
//  const material = new THREE.MeshLambertMaterial({color : 0xFFCC00});
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = -2;
    scene.add(mesh);

    camera.position.z = 5;
}

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.012;
    cube.rotation.y += 0.002;
    mesh.rotation.x += 0.012;
    mesh.rotation.y += 0.002;
    //cube.rotation.z += 0.01;

    renderer.render(scene, camera);
};

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener( 'resize' , onWindowResize, false);

init();
animate();

function onMouseMove(event) {
    event.preventDefault;
    mouse.x  = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y  = (event.clientY / window.innerHeight) * 2 - 1;

    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(scene.children, true);
    for (let i = 0; i < intersects.length; i++) {
        intersects[i].object.material.color.set(0xFF0000);
        tl = new TimelineMax();
        tl.to(intersects[i].object.scale, 1, {x : 2, ease: Expo.easeOut});
        tl.to(intersects[i].object.scale, 0.5, {x : .5, ease: Expo.easeOut});
        tl.to(intersects[i].object.position, 0.5, {x : 0, ease: Expo.easeOut});
        tl.to(intersects[i].object.rotation, 0.5, {y : Math.PI*.5, ease: Expo.easeOut}, "=-1.5");
    }
}

window.addEventListener('mousemove', onMouseMove);