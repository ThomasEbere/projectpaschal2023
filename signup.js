const form=document.querySelector('form');
const boxes=document.querySelector('.mydiv');
const newdates=document.querySelector('.date');
const submith2=document.querySelector('.submith2');
const sidediv=document.querySelector('.innerdiv');
const signupmsg=document.querySelector('.signupmsg');

form.addEventListener('submit', e=>{
    e.preventDefault();
    if(form.password.value!=form.confirmpass.value)
    {
        boxes.innerHTML+='<p class="passcorrect">Password not correct. Please re-enter password</p>';
    }
    else{
        router();
        const user={
            firstName:form.firstname.value,
            lastName:form.lastname.value,
            email:form.email.value,
            password:form.password.value
        }

        db.collection('users').add(user).then((result)=>{
            console.log(result);
        }).catch(err =>{
            console.log(err);
        });
    }
})

router=function(){
    newdates.style.setProperty('display', 'none');
    submith2.style.setProperty('display', 'none');
    boxes.style.setProperty('display', 'none');
    signupmsg.style.setProperty('display','block');
    setTimeout(timeout,5000);
}

function timeout(){
     window.open('http://127.0.0.1:5500/dates.html');
}