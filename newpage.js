myEmail=localStorage.getItem('email');
firstName=localStorage.getItem('firstName');

const item=document.querySelector('span');

console.log(firstName);
item.innerText=firstName;