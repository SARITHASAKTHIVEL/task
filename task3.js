let isEditing = false;
let currentEditElement = null;

document.getElementById('todo-form').addEventListener('submit', function(event){
    event.preventDefault();

    let addInput = document.getElementById('myinput').value.trim();
    let todoList = document.getElementById('todo-list');
    let demo = document.getElementById('demo');


    demo.innerHTML = '';

    if (addInput==='') {
        demo.innerHTML = 'Please enter your task';
        return;
    }


    if (!isEditing) {
        let listItems = todoList.getElementsByTagName('li');
        for (let i = 0; i < listItems.length; i++) {
            if (listItems[i].firstChild.textContent === addInput) {
                demo.innerHTML = 'Already Exist';
                return;
            }
        }
    }
    if (isEditing) {
currentEditElement.firstChild.textContent = addInput;
isEditing = false;
currentEditElement = null;
document.getElementById('submit-btn').textContent = '+';
    }else { 
        let list = document.createElement('li');
        list.appendChild(document.createTextNode(addInput));
        list.appendChild(createbutton());
        todoList.appendChild(list);
    }
    

    document.getElementById('myinput').value = '';
});

function createbutton() {
    let divbutton = document.createElement('div');
    divbutton.className = 'actionbtn';

    let editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fa fa-edit"></i>';
    editBtn.className = 'edit-btn';
    editBtn.addEventListener('click', editTask);

    let removeBtn = document.createElement('button');
    removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
    removeBtn.className = 'rm_btn';
    removeBtn.addEventListener('click', removeTask);

    divbutton.appendChild(editBtn);
    divbutton.appendChild(removeBtn);

    return divbutton;
}

function editTask(event) {
let taskItem = event.target.closest('li');
let taskText = taskItem.firstChild.textContent;
document.getElementById('myinput').value = taskText;
document.getElementById('submit-btn').textContent = 'Save';
document.getElementById('submit-btn').style.padding ="10px 20px";

isEditing = true;
currentEditElement = taskItem;
}

function removeTask(event) {
    if (confirm('Are you sure to delete this task?')) {
        let taskItem = event.target.closest('li');
        taskItem.remove();
    }
}
document.querySelectorAll('#todo-list li').forEach(li => {
    li.appendChild(createbutton());
});