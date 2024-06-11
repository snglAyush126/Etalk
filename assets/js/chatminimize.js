
// const minbtn= document.getElementById("min");
// // console.log(minbtn);
// minbtn.addEventListener('click', minimize);

// async function minimize(e){
//  console.log(e);
 
//  const chatBox = document.getElementById("user-chat-box");
//  chatBox.style.display= 'none';
 
//  const plusBtn= document.getElementById("openchat");
//   plusBtn.style.display= 'flex'; 

// }
// const plusBtn= document.getElementById("openchat");
// // console.log(minbtn);
// plusBtn.addEventListener('click', maximize);


// async function maximize(e){
//  console.log(e);
 
//  const plusBtn= document.getElementById("openchat");
//   plusBtn.style.display= 'none'; 
//  const chatBox = document.getElementById("user-chat-box");
//  chatBox.style.display= 'block';
 


// }

document.addEventListener('DOMContentLoaded', () => {
  const minbtn = document.getElementById("min");
  const plusBtn = document.getElementById("openchat");
  const chatBox = document.getElementById("user-chat-box");

  minbtn.addEventListener('click', minimize);
  plusBtn.addEventListener('click', maximize);

  function minimize(e) {
      console.log(e);
      chatBox.style.display = 'none';
      plusBtn.style.display = 'flex';
  }

  function maximize(e) {
      console.log(e);
      plusBtn.style.display = 'none';
      chatBox.style.display = 'block';
  }
});
