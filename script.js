import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js'; 
import {getDatabase, set ,child,get ,ref,update ,onValue,onDisconnect,query, orderByKey,orderByChild,equalTo} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js" ;
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-analytics.js";
import { getAuth, onAuthStateChanged,signOut  } from  "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);



var useruid;
let listusers = []
function uuis() {
    const db = getDatabase();
    const starCountRef = ref(db, 'UsersData/' + useruid + '/spd_offer');
    onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
    console.log(data);
    console.log("i just called")
    createAnswer1(data);
});
    

  const dbRef = ref(db,'UsersData' );
  
  get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {



        snapshot.forEach((childSnapshot) => {
           
            const childData = childSnapshot.val().status;
            console.log( childData);
        });



      const lle =snapshot.val()
      console.log(lle)
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
    console.log(useruid);
   

const presenceRef = ref(db, 'UsersData/' +  useruid+"/status");
// Write a string when this client loses connection
onDisconnect(presenceRef).set("offline");
    
}




let createAnswer1 = async (data) => {
    peerConnection = new RTCPeerConnection(servers);
    remoteStream = new MediaStream()
    document.getElementById('user-2').srcObject = remoteStream



    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
    })


    peerConnection.ontrack = async (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track)
        })
    }

     peerConnection.onicecandidate = async (event) => {
        if(event.candidate){
            document.getElementById('answer-sdp').value = JSON.stringify(peerConnection.localDescription)

        }
    }


    let offer = data
    if(!offer) return alert('Retrieve offer from peer first')

    offer  =JSON.parse(offer)
    await peerConnection.setRemoteDescription(offer)

    let answer = await peerConnection.createAnswer()
    await  peerConnection.setLocalDescription(answer)

    document.getElementById('answer-sdp').value = JSON.stringify(answer)
    

}
























await onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user)
      
      useruid = user.uid;




      const db = getDatabase();

      const connectedRef = ref(db, ".info/connected");
        onValue(connectedRef, (snap) => {
          if (snap.val() === true) {
            const starCountRef = ref(db, 'UsersData/' +  useruid);
            let updates ={ status : "online" }
            update(starCountRef, updates);
            console.log("online")
          } else {
            const starCountRef = ref(db, 'UsersData/' +  useruid);
            let updates ={ status : "offline" }
            update(starCountRef, updates);
            console.log("offline")
            
          }
      });


      setTimeout(uuis, 2000)
   
      console.log(useruid)
      const mail = user.email;
      document.getElementById("user11").innerHTML =   mail;
     document.getElementById('status').innerHTML = "Login Out";
     let logout=  document.getElementById('status')
     logout.onclick = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            window.location.reload()
          }).catch((error) => {
            // An error happened.
          });
     }
     
    
    } else {
        document.getElementById('status').innerHTML = "Login In";
        window.location.replace("login.html"); 
      
    }
  });



  


let peerConnection;
let localStream;
let remoteStream;

let servers = {
    iceServers:[
        {
            urls:['stun:stun1.1.google.com:19302', 'stun:stun2.1.google.com:19302']
        }
    ]
}






let init = async () => {

   localStream = await navigator.mediaDevices.getUserMedia({video:{
    width: { min: 1280 },
    height: { min: 720 }
  }, audio: /* {
    channelCount: 2,
    sampleRate: 160000000,
    sampleSize: 16,
    volume: 1000000,
  }*/ true});
   document.getElementById('user-1').srcObject = localStream
   document.getElementById('user-2').srcObject = remoteStream
   console.log("this is inti funcation")

}



const db = getDatabase();
const dbRef = ref(db, 'UsersData');

onValue(dbRef, (snapshot) => {
    let data =""
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();
    const childData1 = childSnapshot.val().status;
    if(childData1 == "online"){
   
        console.log(childData.email)
         data += childData.email +"<br>";
}
    // ...
  });
  document.getElementById("usersid").innerHTML= data
}, {
  onlyOnce: true
});








let createOffer = async () =>{
    peerConnection = new RTCPeerConnection(servers);
    remoteStream = new MediaStream()
    document.getElementById('user-2').srcObject = remoteStream;

   


    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
    })


    peerConnection.ontrack = async (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track)
        })
    }

     peerConnection.onicecandidate = async (event) => {
        if(event.candidate){
            document.getElementById('offer-sdp').value = JSON.stringify(peerConnection.localDescription)
           


        }
    }

    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    document.getElementById('offer-sdp').value = JSON.stringify(offer);
    const keye = JSON.stringify(offer);
    console.log(keye);
    const db = getDatabase();
    const dbRef = ref(db, 'UsersData');
    let linkerid = document.getElementById('usermailid').value;
    console.log(linkerid);
    onValue(dbRef, (snapshot) => {
   
  snapshot.forEach((childSnapshot) => {
    const childData1 = childSnapshot.val().email;
    if(childData1 == linkerid){
       console.log(childSnapshot.key)
       console.log( useruid, "this is caller")
       const starCountRef = ref(db, 'UsersData/' + childSnapshot.key);
       let updates ={
           spd_offer : keye,
           caller_id :  useruid,
       }
   
       update(starCountRef, updates);
       console.log("done")
      
    }

  });
 
}, {
  onlyOnce: true
});

   
   
    
    console.log(" i told");
    
    // await onAuthStateChanged(auth, (user) => {
    //     if (user) {

    // const starCountRef = ref(db, 'UsersData/' +  user.uid);
    // let updates ={
    //     spd_offer : keye,
    // }

    // update(starCountRef, updates);
   
    
    //     }
    // });
  

}


function linkuser(userdat) {
    const db = getDatabase();
    const dbRef = ref(db, 'UsersData');
    let linkerid = document.getElementById('usermailid').value;
    console.log(linkerid);
onValue(dbRef, (snapshot) => {
   
  snapshot.forEach((childSnapshot) => {
    const childData1 = childSnapshot.val().email;
    if(childData1 == linkerid){
       console.log(childSnapshot.key)
       console.log(userdat)
       const starCountRef = ref(db, 'UsersData/' + childSnapshot.key);
       let updates ={
           spd_offer : userdat,
       }
   
       update(starCountRef, updates);
       console.log("done")
      
    }

  });
 
}, {
  onlyOnce: true
});

}





// this is a answer from the other peer

let createAnswer = async () => {
    peerConnection = new RTCPeerConnection(servers);
    remoteStream = new MediaStream()
    document.getElementById('user-2').srcObject = remoteStream



    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
    })


    peerConnection.ontrack = async (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track)
        })
    }

     peerConnection.onicecandidate = async (event) => {
        if(event.candidate){
            document.getElementById('answer-sdp').value = JSON.stringify(peerConnection.localDescription)

        }
    }


    let offer = document.getElementById('offer-sdp').value
    if(!offer) return alert('Retrieve offer from peer first')

    offer  =JSON.parse(offer)
    await peerConnection.setRemoteDescription(offer)

    let answer = await peerConnection.createAnswer()
    await  peerConnection.setLocalDescription(answer)

    document.getElementById('answer-sdp').value = JSON.stringify(answer)
    

}


let addAnswer = async () => {
    let answer = document.getElementById('answer-sdp').value
    if(!answer) return alert('Retrieve answer from peer first...')

    answer = JSON.parse(answer)

    if(!peerConnection.currentRemoteDescription){
        peerConnection.setRemoteDescription(answer)
    }

}







document.getElementById('create-offer').addEventListener('click', createOffer)
document.getElementById('create-answer').addEventListener('click', createAnswer)
document.getElementById('add-answer').addEventListener('click',addAnswer)


init()




