
const date=document.querySelector('#startDate');
const sub=document.querySelector('.user-input');
const submitted=document.querySelector('.new-input');
const gettodos=document.querySelector('.todos');

if(sub){
sub.addEventListener('submit', e =>{
    e.preventDefault();
    console.log("click go here");
    console.log(sub.activity.value);
    console.log(sub.exampleFormControlTextarea1.value.trim());
    newDate=(dateFns.format(sub.startDate.value.trim(), 'MMMM d, YYYY'));
    const now = new Date();
    todoDate=sub.startDate.value;
    
    const todo={
        Activity:sub.activity.value,
        Created_at:firebase.firestore.Timestamp.fromDate(now),
        DateofActivity:newDate,
        Description:sub.exampleFormControlTextarea1.value,
        Status:"Pending"
    };
    db.collection('todos').add(todo).then(()=>{
    }).catch(err =>{
        console.log(err);
    });
    presentNewDate();
});
}

const display=(todo, id)=>{
    let time = todo.Created_at.toDate();
    let html=`<li data-id="${id}">
    <div><h3>Activity</h3>${todo.Activity}</div>
    <div><h3>Description</h3>${todo.Description}</div>
    <div><h3>Status</h3>${todo.Status}</div>
    <div><h3>Execution Date</h3>${todo.DateofActivity}</div>
    <div><h3>Created Date</h3>${time}</div>
    <button class ="btn btn-danger btn-sm my-2">Delete</button>
    <button class ="btn btn-secondary btn-sm my-2">update</button>

    </li>`;
    gettodos.innerHTML+=html;
}
const deletetodo=(id)=>{
    const items =document.querySelectorAll('li');
    items.forEach(item=>{
        if(item.getAttribute('data-id') === id)
        {
            item.remove();
        }
    });
}

db.collection('todos').onSnapshot(snapshot=>{
    snapshot.docChanges().forEach(change=>{
        const doc=change.doc;
        if(change.type==='added'){
            display(doc.data(), doc.id);
        }
        else if(change.type === 'removed')
        {
            console.log(change.type);
            deletetodo(doc.id);
        }
    })
});
// const unsub= db.collection('todos').where('Status', '==','Pending').orderBy('Created_at').onSnapshot(snapshot=>{
//     snapshot.docChanges().forEach(change=>{
//         const doc=change.doc;
//         if(change.type==='added')
//         {
//             display(doc.data(), doc.id);
//         }else if(change.type==='removed')
//         {
//             deletetodo(doc.id);
//         }
       
//     })
//     }).catch((err)=>{
//         console.log(err);
// });


// const fetchdata = ()=>
// {
//     db.collection('todos').where('Status', '==','Pending').orderBy('Created_at').get().then((snapshot)=>{
//         snapshot.docs.forEach(doc=>{
//             display(doc.data(), doc.id);
//         })
//         }).catch((err)=>{
//             console.log(err);
//     });
// }


const presentNewDate=()=>{
    console.log("this function was called");
    sub.reset();
    sub.classList.add('d-none');
    submitted.classList.remove('d-none');
    pageRedirect();
}





 
function pageRedirect(){
    var delay = 4000; // time in milliseconds
  
    setTimeout(function(){
        window.location = "newindex.html";
    },delay);
 }

 gettodos.addEventListener('click', e =>{
    if(e.target.tagName ==='BUTTON')
    {
        if(e.target.childNodes[0].data === 'Delete'){
            console.log("delete got clicked");
            const id=e.target.parentElement.getAttribute('data-id');
            db.collection('todos').doc(id).delete();
        }
        // else if (e.target.childNodes[0].data === 'update'){
        //     const item=document.querySelector('li');
        //     console.log(item.childNodes);
        // }
    }
});