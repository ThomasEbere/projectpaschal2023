
const date=document.querySelector('#startDate');
const sub=document.querySelector('.user-input');
const submitted=document.querySelector('.new-input');
const gettodos=document.querySelector('.todos');

const getelement=()=>{
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
    </li>`;
    gettodos.innerHTML+=html;
}



const fetchdata = ()=>
{
    db.collection('todos').get().then((snapshot)=>{
        snapshot.docs.forEach(doc=>{
            display(doc.data(), doc.id);
        })
        }).catch((err)=>{
            console.log(err);
    });
}

const presentNewDate=()=>{
    console.log("this function was called");
    sub.reset();
    sub.classList.add('d-none');
    submitted.classList.remove('d-none');
    pageRedirect();
}

// getelement();
fetchdata();
function pageRedirect(){
    var delay = 4000; // time in milliseconds
  
    setTimeout(function(){
        window.location = "newindex.html";
    },delay);
 }


