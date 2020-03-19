let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
    todo: [],
    completed: []
};




let removeTxt = 'Del';
let completeTxt = 'OK';

renderTodoList();


document.getElementById('add').addEventListener('click', function() {
    let value = document.getElementById('item').value;
    if (value) {
        addItemTodo(value);
        document.getElementById('item').value = '';
        data.todo.push(value);
       
        dataObjectUpdate()
    }
});

document.getElementById('item').addEventListener('keydown', function (e) {
    let value = this.value;
    if (e.code === 'Enter' && value) {
       addItemTodo(value);
       document.getElementById('item').value = '';
       data.todo.push(value);
      
       dataObjectUpdate()
    }
})


function renderTodoList() {
    if (!data.todo.length && !data.completed.length) return;

    for ( let i = 0; i < data.todo.length; i++) {
        let value = data.todo[i];
        addItemTodo(value);
    }

    for ( let j = 0; j < data.completed.length; j++) {
        let value = data.completed[j];
        addItemTodo(value, true);
    }

}

function dataObjectUpdate() {
localStorage.setItem('todoList', JSON.stringify(data))
}

function removeItem() {
    let item = this.parentNode.parentNode;
    let parent = item.parentNode;
    let id = parent.id;
    let value = item.innerText;

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
    }

    dataObjectUpdate();

    parent.removeChild(item);
}

function completeItem() {
    let item = this.parentNode.parentNode;
    let parent = item.parentNode;
    let id = parent.id;
    let value = item.innerText;

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value)
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
        data.todo.push(value)
    }

    dataObjectUpdate();

    

    let target=(id === 'todo')?document.getElementById('completed'):document.getElementById('todo');
    parent.removeChild(item);
    target.appendChild(item);
}

function addItemTodo(text, completed) {

    let list = (completed) ? document.getElementById('completed') : document.getElementById('todo')
    let item = document.createElement('li');
    item.innerText = text;

    let buttons = document.createElement('div');
    buttons.classList.add('buttons');

    let remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeTxt;

    remove.addEventListener('click', removeItem);

    let complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeTxt;

    complete.addEventListener('click',completeItem);

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
}
