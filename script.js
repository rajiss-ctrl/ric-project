

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
 const firebaseConfig = {
    apiKey: "AIzaSyCLhqyhVDEbc-_hMc9eA7bU9vClsgQuxNU",
    authDomain: "ricproject-601d9.firebaseapp.com",
    projectId: "ricproject-601d9",
    storageBucket: "ricproject-601d9.appspot.com",
    messagingSenderId: "31141448820",
    appId: "1:31141448820:web:c1ec483cd4a451496c9521"
  };

import { getFirestore,collection,addDoc,query,onSnapshot} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
 const app = initializeApp(firebaseConfig);
const db = getFirestore();



const content = document.querySelector('.content');
// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit',(e)=>{
    e.preventDefault();


    addDoc(collection(db,'ricproject'),{
        name:createForm['name'].value,
        email:createForm['email'].value,
        question:createForm['question'].value,
        message:createForm['message'].value
    }).then(()=>{
        // close the modal and reset the form 
       
         createForm.reset();
    }).catch((err)=>{
        console.log(err.message)
    })
})


if(createForm){
  const projectCollection = collection(db, 'ricproject');
  const q = query(projectCollection);
  onSnapshot(q,(snapshop)=>{
       setupProject(snapshop.docs)
       
    
  })
}else{
    // hide accout info

    setupProject([])
}




// set up projects

const setupProject =(data)=>{
    if(data.length){
let html ='';
data.forEach((doc)=>{
    const guide = doc.data();
    console.log(guide)
    const li=`
        <li>
         <div class="collapsible-header grey lighten-4">${guide.name}</div>
        <div class="collapsible-body white">${guide.email}</div>
        <div class="collapsible-body white">${guide.question}</div>
        <div class="collapsible-body white">${guide.message}</div>
        </li>
    `;
    html +=li;
})
content.innerHTML=html;
    }else{
        content.innerHTML='<h5 class="center-align">choose a question and submit your answer to view your answer</h5>';
    }
}

