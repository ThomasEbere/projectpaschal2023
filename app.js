
const date=document.querySelector('#startDate');
const sub=document.querySelector('.user-input');
const subb=document.querySelector('.update-input');
const submitted=document.querySelector('.new-input');
const gettodos=document.querySelector('.todos');
const newform=document.querySelector('.users');
const myitems=document.querySelector('.myitems');
const mytodo = document.querySelector('.inner-todos');
const email=localStorage.getItem('email');
const pending=document.querySelector('.pending-todos');
const firstName=document.querySelector('span');
myFirstName=localStorage.getItem('firstName');

firstName.innerText=myFirstName;


if(sub){
sub.addEventListener('submit', e =>{
    e.preventDefault();
    console.log("click go here");
    console.log(sub.activity.value);
    console.log(sub.exampleFormControlTextarea1.value.trim());
    const now = new Date();
    todoDate=sub.startDate.value;
    console.log(todoDate);
    
    const todo={
        Activity:sub.activity.value,
        Created_at:firebase.firestore.Timestamp.fromDate(now),
        DateofActivity:todoDate,
        Description:sub.exampleFormControlTextarea1.value,
        Status:"Pending",
        created_by:email
    };
    console.log(todo);
    db.collection('newtodos').add(todo).then((result)=>{
        console.log(result);
    }).catch(err =>{
        console.log(err);
    });
    presentNewDate();
});
}


const display=(todo, id)=>{
    let time = todo.Created_at.toDate();
    let html=`<li data-id="${id}">
    <div class="update"><h3>Activity</h3>${todo.Activity}</div>
    <div class="update"><h3>Description</h3>${todo.Description}</div>
    <div class="update"><h3>Status</h3>${todo.Status}</div>
    <div class="update"><h3>Execution Date</h3>${todo.DateofActivity}</div>
    <div><h3>Created Date</h3>${time}</div>
    <button class ="btn btn-danger btn-sm my-2">Delete</button>
    <button class ="btn btn-secondary btn-sm my-2">update</button>
    <button class ="btn btn-secondary btn-sm my-2 save">save</button>
    </li>`;
    gettodos.innerHTML+=html;
}

const pendingtodos=(todo, id)=>{
    let time = todo.Created_at.toDate();
    let html=`<li data-id="${id}">
    <div class="update"><h3>Activity</h3>${todo.Activity}</div>
    <div class="update"><h3>Description</h3>${todo.Description}</div>
    <div class="update"><h3>Status</h3>${todo.Status}</div>
    <div class="update"><h3>Execution Date</h3>${todo.DateofActivity}</div>
    <div><h3>Created Date</h3>${time}</div>
    <button class ="btn btn-danger btn-sm my-2">Delete</button>
    <button class ="btn btn-secondary btn-sm my-2">update</button>
    <button class ="btn btn-secondary btn-sm my-2 save">save</button>
    </li>`;
    pending.innerHTML+=html;
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

if(db)
{
db.collection('newtodos').where('created_by', '==',email).onSnapshot(snapshot=>{
        snapshot.docChanges().forEach(change=>{
            const doc=change.doc;
            if(change.type==='added'){
                if(gettodos){
                display(doc.data(), doc.id);
                }
            }
            else if(change.type === 'removed')
            {
                console.log(change.type);
                deletetodo(doc.id);
            }
        })
    });
}

db.collection('newtodos').where('Status', '==','Pending').orderBy('Created_at').onSnapshot(snapshot=>{
    snapshot.docChanges().forEach(change=>{
        const doc=change.doc;
        if(change.type==='added')
        {
            pendingtodos(doc.data(), doc.id);
        }else if(change.type==='removed')
        {
            deletetodo(doc.id);
        }
       
    })
});


// const fetchdata = ()=>
// {
//     db.collection('todos').where('Status', '==','Pending').orderBy('Created_at').get().then((snapshot)=>{
//         snapshot.docs.forEach(doc=>{
//             display(doc.data(), doc.id);
//         })
//         }).catch((err)=>{
//             console.log(err);
//     });
//}

// fetchdata();

presentNewDate=function(){
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

 arrayelement=["Activity", "Description","Status","carryout_date", "created_date"]


if (gettodos) {
    gettodos.addEventListener('click', e =>
    {
        if(e.target.tagName ==='BUTTON')
        {
            if(e.target.childNodes[0].data === 'Delete'){ 
                console.log("delete got clicked");
                const id=e.target.parentElement.getAttribute('data-id');
                db.collection('todos').doc(id).delete();
            }
            else if (e.target.childNodes[0].data === 'update'){
                const items=document.querySelectorAll('li');
                const newid=e.target.parentElement.getAttribute('data-id');
                items.forEach(item=>{
                    if(item.getAttribute('data-id')==newid){
                        const myinitems=(item.getElementsByTagName('div'));
                        for(let i=0; i<myinitems.length, i<arrayelement.length; i++)
                        {
                        arrayelement[i]=myinitems[i].firstChild.nextSibling.data
                        }
                        console.log(arrayelement);
                        console.log(arrayelement[4]);
                        }
                    })
                    mytodo.remove();
                    myitems.innerText="Update your todos";
                    newform.style.setProperty('display','block');
                    subb.activity.value=(arrayelement[0]);
                    subb.exampleFormControlTextarea1.value=(arrayelement[1]);
                    subb.startDate.value=(arrayelement[3]);
                    subb.addEventListener('submit', e=>{
                        e.preventDefault();
                        console.log(subb.activity.value);
                        console.log(subb.exampleFormControlTextarea1.value);
                        console.log(subb.startDate.value);
                        console.log(subb.status.value);

                        let newString=new Date(arrayelement[4]).toISOString();
                        let mystring=firebase.firestore.Timestamp.fromDate(new Date(arrayelement[4]));
                        console.log(newString);
                        console.log("This is the date time value here "+mystring);
                        const newTodo={  
                            Activity:subb.activity.value,
                            Created_at:mystring,
                            DateofActivity:subb.startDate.value,
                            Description:subb.exampleFormControlTextarea1.value,
                            Status:subb.status.value
                        };
                        console.log(newTodo);
                        db.collection('todos').doc(newid).update(newTodo).then((result)=>{
                            console.log(result);
                        }).catch(err =>{
                            console.log(err);
                        });
                    })

                    // function formatDate(arrayelement[3]) 
                    // {
                    //     var d = new Date(arrayelement[3]),
                    //         month = '' + (d.getMonth() + 1),
                    //         day = '' + d.getDate(),
                    //         year = d.getFullYear();
                    
                    //     if (month.length < 2) 
                    //         month = '0' + month;
                    //     if (day.length < 2) 
                    //         day = '0' + day;
                    
                    //     return [year, month, day].join('-');
                    // }
                    myitems.innerText="Update your todos";
                //     sub.addEventListener('submit', e =>{
                //     e.preventDefault();
                //     console.log(sub.activity.value);
                //     console.log(sub.exampleFormControlTextarea1.value);
                //     console.log(sub.status.value);
                //     console.log(sub.startDate.value);
                // });
            }
        }
    });
}
    

function getEmail(){
    let newEmail= localStorage.getItem('email');
    console.log(newEmail);
}

getEmail();

