
const minbtn= document.getElementById("min");
// console.log(minbtn);
minbtn.addEventListener('click', minimize);

async function minimize(e){
 console.log(e);
 
 const chatBox = document.getElementById("user-chat-box");
 chatBox.style.display= 'none';
 
 const plusBtn= document.getElementById("openchat");
  plusBtn.style.display= 'flex'; 

}
const plusBtn= document.getElementById("openchat");
// console.log(minbtn);
plusBtn.addEventListener('click', maximize);

async function maximize(e){
 console.log(e);
 
 const plusBtn= document.getElementById("openchat");
  plusBtn.style.display= 'none'; 
 const chatBox = document.getElementById("user-chat-box");
 chatBox.style.display= 'block';
 


}
