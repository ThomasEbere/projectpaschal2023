//Setting Item in Local Storage
// localStorage.setItem('name', 'Mario');
// localStorage.setItem('age',50);

//get item from local storage

// let myName=localStorage.getItem('name');
// let age =localStorage.getItem('age');

// console.log(myName);
// console.log(age);

//updating Data
// localStorage.setItem('name', 'michael');
// localStorage.setItem('age',40);

// myName=localStorage.getItem('name');
// age=localStorage.getItem('age');

localStorage.removeItem('name');
localStorage.removeItem('age');


const form=document.querySelector('form');
form.addEventListener('submit', e =>{
    e.preventDefault();
    localStorage.setItem('firstname', form.firstname.value);
    localStorage.setItem('lastname', form.lastname.value);
    form.firstname.value;
    form.lastname.value;
});