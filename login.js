import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js'; 
import {getDatabase, set ,child,get ,ref } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js" ;
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-analytics.js";
import { getAuth, onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword  } from  "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import { getStorage, ref as sref , getDownloadURL,uploadBytes } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-storage.js";




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






  let b =  document.getElementById("submitac");
  b.onclick =  function(){

    
  

 
    let d = document.getElementById("username").value;
    let e = document.getElementById("password1").value;
    // let afd = prompt("in js234 function")
    console.log(d, e);
    signInWithEmailAndPassword(auth, d, e)
    .then((userCredential) => {
      sessionStorage.setItem("mail", d);
        
        setTimeout(myFunction, 4000)

      const user = userCredential.user;
      
     
     

    })
    .catch((error) => {
     
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage,errorCode)
      document.getElementById("result").innerHTML = "login Unsuccessfull"+errorMessage;
    });

   

    
  }



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
     
     const user1 = userCredential.user;    
     const db = getDatabase();
     
     set(ref(db,'UsersData/'+ user1.uid), {
         name: name,
         number: phone,
         email: email,
         password: pass,
 
      
 
     });

   const user = userCredential.user;
   setTimeout(myFunction, 4000)
   

 })
 .catch((error) => {
    
   const errorCode = error.code;
   const errorMessage = error.message;
   console.log(errorMessage,errorCode)
   document.getElementById("result").innerHTML = "login Unsuccessful:"+errorMessage;
 });



}
 
onAuthStateChanged(auth, (user) => {
  if (user) {
    
    const uid = user.uid;
    setTimeout(myFunction, 4000)
   
  
  } else {
    
  }
});

function myFunction() {
    window.location.replace("main.html"); 
  }



