import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js'; 
import {getDatabase, set ,child,get ,ref } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js" ;
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword  } from  "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import { getStorage, ref as sref , getDownloadURL,uploadBytes } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-storage.js";
// Setup

// 
const firebaseConfig = {
  apiKey: "AIzaSyCzxx91tbJ93kSFTD3FQKKDlYzljZFApl8",
  authDomain: "relier-3ca82.firebaseapp.com",
  databaseURL: "https://relier-3ca82-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "relier-3ca82",
  storageBucket: "relier-3ca82.appspot.com",
  messagingSenderId: "748323432709",
  appId: "1:748323432709:web:bc013f69a0167c055baf6c",
  measurementId: "G-0T7PCFQZQQ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);





const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar

const jeffTexture = new THREE.TextureLoader().load('giphy.gif');

const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));

scene.add(jeff);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

jeff.position.z = -5;
jeff.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();


let SignupB = document.getElementById("done");



SignupB.onclick =  function() {
 
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("mobile").value;
  let pass = document.getElementById("password").value;
 
 console.log(name,email,phone,pass)
 createUserWithEmailAndPassword(auth, email,pass)
 .then((userCredential) => {
     document.getElementById("result").innerHTML = "login succesfull";
     
   
    
     const db = getDatabase();
     // let afd = prompt("in js234 function")
     set(ref(db,'UsersData/'+ phone), {
         name: name,
        
         number: phone,
         email: email,
         password: pass,
 
      
 
     });

   const user = userCredential.user;
   setTimeout(myFunction, 2000)
   

 })
 .catch((error) => {
    
   const errorCode = error.code;
   const errorMessage = error.message;
   console.log(errorMessage,errorCode)
   document.getElementById("result").innerHTML = "login Unsuccessful:"+errorMessage;
 });



}

function myFunction() {
  window.location.replace("login.html"); 
}