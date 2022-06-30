'use strict'

const getDataBase = ()=> JSON.parse(localStorage.getItem('todoList')) ?? [];
const setDataBase = (dataBase)=> localStorage.setItem('todoList', JSON.stringify(dataBase));

const TaskList = document.querySelector('.taskList')
let newsTask = (text, stats, indice)=>{
        const element = document.createElement('div');
        element.classList.add('task');
        element.innerHTML = `
            <input class="input" type="checkbox" ${stats} data-indice=${indice} >
            <p class="taskText">${text}</p>
            <input type="button" value="X"></input>
        `
        TaskList.appendChild(element)
    }
const listUpdate = ()=>{
    TaskList.innerHTML ='';
    const dataBase = getDataBase()
    dataBase.forEach((item, indice)=>newsTask(item.task, item.stats, indice ));
}
const insertItem = (event)=>{
    const text = event.target.value;
    if(event.key === 'Enter'){
        const dataBase = getDataBase();
        dataBase.push({'task': text, 'stats':''});
        setDataBase(dataBase)
        listUpdate(dataBase);
        event.target.value = ''
    }
}
const removeItem = (indice)=>{
    const dataBase = getDataBase()
    dataBase.splice(indice, 1);
    setDataBase(dataBase)
    listUpdate()
}
const updateItem = (indice) =>{
    const dataBase = getDataBase();
    dataBase[indice].stats = dataBase[indice].stats ===''? 'checked' : ''; 
    setDataBase(dataBase);
    listUpdate()
}
const clickItem = (e) =>{
    const element = e.target;
    if(element.type==='button'){
        const indice = element.dataset.indice;
        removeItem(indice);
    } else if(element.type==='checkbox') {
        const indice = element.dataset.indice;
        updateItem(indice)
    }
}
document.getElementById('newTask').addEventListener('keypress', insertItem);
document.querySelector('.taskList').addEventListener('click', clickItem)
listUpdate()