/*

##################################
##                              ##
##       GABRIEL PARRELLO       ##
##                              ##
##################################

*/



/*-----------------------------------
              DECLARE
-----------------------------------*/

const textarea = document.querySelector('textarea');
const addButton = document.getElementsByClassName('add-button')[0];
const taskslist = document.getElementsByClassName('tasks-container')[0];





/*-----------------------------------
            EVENTS INITS
-----------------------------------*/

addButton.addEventListener('click', addTaskBtn);









/*-----------------------------------
              FUNCTIONS
-----------------------------------*/
 
function autosize(event, element) {
  
  if (event.keyCode == 13 || event.keyCode == 9) {
    
    const nodes = Array.prototype.slice.call( document.getElementsByClassName('tasks-container')[0].children );
    
    const parentElement = element.parentElement.parentElement;
    
    const elementIndex = nodes.indexOf( parentElement );
    
    event.preventDefault();
    addTaskByKey( elementIndex );
  }
  else {
    setTimeout(function(){
      element.style.cssText = 'height:auto; padding:0';
      // for box-sizing other than "content-box" use:
      // el.style.cssText = '-moz-box-sizing:content-box';
      element.style.cssText = 'height:' + element.scrollHeight + 'px';
    },0);
  }
}

function addTaskBtn() {
  
  const textarea = this.children[2].children[0];
  const checkBtn = this.children[1];
  const deleteBtn = this.children[5];
  
  this.classList.remove('add-button');
  this.classList.add('deletable');
  
  this.removeEventListener('click', addTaskBtn);
  
  textarea.addEventListener('keydown', function(event) {
    autosize(event, this)
  });
  textarea.addEventListener('focusout', handleCheckable);
  
  checkBtn.addEventListener('click', handlePressCheck);
  deleteBtn.addEventListener('click', handleDelete);
  
  const currentIndex = taskslist.children.length + 1;
  
  const btnElementDOMString = '<div class="index">' + currentIndex + '.</div><div class="check"><img src="img/check-icon.png" /></div><div class="title"><textarea placeholder="Agregue una tarea..."></textarea></div><div class="cross-line"><div></div></div><div class="border-bottom"></div><div class="delete"><img src="img/close-icon.png" /></div>';
  
  const btnElement = document.createElement('li');
  btnElement.classList.add('task-item');
  btnElement.classList.add('add-button');
  btnElement.classList.add('inactive');
  btnElement.innerHTML = btnElementDOMString;
  
  btnElement.addEventListener('click', addTaskBtn);
  
  taskslist.appendChild(btnElement);
  
  setTimeout(function() {
    btnElement.classList.remove('inactive');
  }, 10);
  
//  const cardContainer = document.getElementsByClassName('card')[0]
//  cardContainer.style.minHeight = (cardContainer.offsetHeight + 80) + 'px !important';
  
}


function addTaskByKey(currentElementIndex) {
  
  const taskslist = document.getElementsByClassName('tasks-container')[0];
  
  const addBtn = taskslist.lastChild;
  
  const currentIndex = taskslist.children.length;
  
  const taskElementDOMString = '<div class="index">' + (currentElementIndex+2) + '.</div><div class="check"><img src="img/check-icon.png" /></div><div class="title"><textarea placeholder="Agregue una tarea..."></textarea></div><div class="cross-line"><div></div></div><div class="border-bottom"></div><div class="delete"><img src="img/close-icon.png" /></div>';
  
  for(let i = currentElementIndex+1; i < taskslist.children.length; i++)
    taskslist.children[i].children[0].innerHTML = (i+2) + '.';
  
  const taskElement = document.createElement('li');
  
  taskElement.classList.add('task-item');
  taskElement.classList.add('deletable');
  //btnElement.classList.add('inactive');
  
  taskElement.innerHTML = taskElementDOMString;
  taskslist.insertBefore(taskElement, taskslist.children[currentElementIndex+1]);
  
  const textarea = taskElement.children[2].children[0];
  const checkBtn = taskElement.children[1];
  const deleteBtn = taskElement.children[5];
  
  textarea.addEventListener('keydown', function(event) {
    autosize(event, this)
  });
  textarea.addEventListener('focusout', handleCheckable);
  
  checkBtn.addEventListener('click', handlePressCheck);
  deleteBtn.addEventListener('click', handleDelete);
  
  textarea.focus();
  
//  const cardContainer = document.getElementsByClassName('card')[0]
//  cardContainer.style.minHeight = (cardContainer.offsetHeight + 80) + 'px !important';
}

function addTaskFocused() {
  const element = addTask();
  const textarea = element.children[2].children[0];
  
  
  
}



function handleCheckable() {
  
  const parentElement = this.parentElement.parentElement;
  
  if (this.value.length > 0)
    parentElement.classList.add('checkable');
  else
    parentElement.classList.remove('checkable');
  
}

function handlePressCheck() {
  
  const parentElement = this.parentElement;
  
  if (parentElement.classList.contains('done'))
    handleUnCheck(parentElement)
  else
    handleCheck(parentElement)
}

function handleCheck(parentElement) {
  
  const textarea = parentElement.children[2].children[0];
  const crossLine = parentElement.children[3];
  
  const textWidth = getTextWidth(textarea.value, 'normal 30px Boogaloo') + 10;
  
  if (getTextAreaLinesCount(textarea) > 1)
    crossLine.style.width = 'calc(100% - 150px)';
  else
    crossLine.style.width = textWidth + 'px';
  
  parentElement.classList.add('done');
}
  
function handleUnCheck(parentElement) {
  
  const crossLine = parentElement.children[3];
  
  crossLine.style.width = '0%';
  parentElement.classList.remove('done');

}

function handleDelete() {
  const listItem = this.parentElement;
  const listContainer = this.parentElement.parentElement;
  
  listItem.parentNode.removeChild(listItem);
  
  for(let i=0; i < listContainer.children.length; i++)
    listContainer.children[i].children[0].innerHTML = (i+1) + '.'
  
//  listContainer.children.forEach( function(index, element) {
//    element.children[0].innerHTML = (index + 1) + '.';
//  })
  
//  const cardContainer = document.getElementsByClassName('card')[0]
//  cardContainer.style.minHeight = (cardContainer.offsetHeight - 80) + 'px !important';
  
}


function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}


function getElementIndex(node) {
    var index = 0;
    while ( (node = node.previousElementSibling) ) {
        index++;
    }
    return index;
}

function handleMultiLineCheckedTasks(textarea) {
  
  textarea.style.height = '80px';
  
}

function getTextAreaLinesCount(textarea) {
  
  const textWidth = getTextWidth(textarea.value, 'normal 30px Boogaloo');
  const taWidth = textarea.offsetWidth;
  const numRows = Math.ceil(textWidth / taWidth);
  
  return numRows;
}
