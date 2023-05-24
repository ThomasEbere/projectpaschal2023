const form=document.querySelector('.signup');
const boxes=document.querySelector('.mydiv');
const newdates=document.querySelector('.date');
const submith2=document.querySelector('.submith2');
const sidediv=document.querySelector('.innerdiv');
const signupmsg=document.querySelector('.signupmsg');
const newform=document.querySelector('.login');
const logindiv=document.querySelector('.innerdiv');


if (form){
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
}

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

async function getData(useremail, userpassword){
    let x=false;
     const data =db.collection('users').where('email', '==', useremail).get().then((result)=>{
        result.forEach(items=>{
            // console.log(items.data().email,items.data().password)
            if(items.data().email == useremail && items.data().password == userpassword)
            {
                window.open('http://127.0.0.1:5500/newindex.html'); 
                localStorage.setItem('email', useremail);
                localStorage.setItem('firstName', items.data().firstName);
            }
            else{
                logindiv.innerHTML+=`<p style="color:red;"> Wrong Credentials. Please Try again</p>`;
            }
            
        });
    
    }).catch((err)=>{
        console.log(err);
    })

    newdata=await data;
    console.log(newdata);
}


newform.addEventListener('submit', e =>{
    e.preventDefault();
    let useremail = newform.email.value;
   let userpassword=newform.password.value;
   console.log(userpassword);
   console.log(useremail);
  getData(useremail, userpassword);
})


// const getData= (email)=>{
//     db.collection('users').where('email'== email).get().then((result)=>{
//         console.log(result);
//     }).catch((err)=>{
//         console.log(err);
//     })
// }
