// DOM Elements
const timeElement = document.getElementById('time'),
  greetingElement = document.getElementById('greeting'),
  nameInput = document.getElementById('name'),
  nameForm = document.getElementById('name-form'),
  focusElement = document.getElementById('focus'),
  quoteContentElement = document.getElementById('content'),
  quoteAuthorElement = document.getElementById('author');
  form = document.getElementById('new-task-form');
  input = document.getElementById('new-task-input');
  listElModal = document.getElementById('tasks-modal');
  openTodoModalButton = document.getElementById('openTodoModal');
  todoModal = document.getElementById('todoModal');
  closeTodoModalButton = document.querySelector('.close');
  newTaskFormModal = document.getElementById('new-task-form-modal');
  inputModal = document.getElementById('new-task-input-modal');


// Time Function
function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const amPm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;

  const formattedTime = `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${amPm}`;

  timeElement.textContent = formattedTime;
}

setInterval(updateTime, 1000);

updateTime();


// Name Function
nameForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const userName = nameInput.value;
  const hour = new Date().getHours();
  let greeting;

  if (hour < 12) {
    greeting = 'Good Morning';
  } else if (hour < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }
  greetingElement.textContent = `${greeting}, ${userName}`;

  localStorage.setItem('userName', userName);
});

// Background and Greeting Function
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours(),
    backgroundVideo = document.getElementById('backgroundVideo');

  const storedUserName = localStorage.getItem('userName');
  if (storedUserName) {
    nameInput.value = storedUserName;
    greetingElement.textContent = `Good ${getGreeting(hour)}, ${storedUserName}`;
  } else {
    greetingElement.textContent = `Good ${getGreeting(hour)}`;
  }

  if (hour < 12) {
    backgroundVideo.src = 'day.mp4';
  } else if (hour < 18) {
    backgroundVideo.src = 'day.mp4';
  } else {
    backgroundVideo.src = 'night.mp4';
    document.body.style.color = 'white';
  }
}

function getGreeting(hour) {
  if (hour < 12) {
    return 'Morning';
  } else if (hour < 18) {
    return 'Afternoon';
  } else {
    return 'Evening';
  }
}

setBgGreet();

// Function to open the modal
function openTodoModal() {
  todoModal.style.display = 'block';
}

// Function to close the modal
function closeTodoModal() {
  todoModal.style.display = 'none';
}

// Event listeners
openTodoModalButton.addEventListener('click', openTodoModal);
closeTodoModalButton.addEventListener('click', closeTodoModal);

function saveTodoList() {
  const tasks = Array.from(listElModal.querySelectorAll('.text'));

  const taskList = tasks.map(task => task.value);

  localStorage.setItem('todoList', JSON.stringify(taskList));
}

// To-Do List
newTaskFormModal.addEventListener('submit', (e) => {
  e.preventDefault();

  const task = inputModal.value;

  const taskEl = document.createElement('div');
  taskEl.classList.add('task');

  const taskContentEl = document.createElement('div');
  taskContentEl.classList.add('content');

  taskEl.appendChild(taskContentEl);

  const taskInputEl = document.createElement('textarea');
  taskInputEl.classList.add('text');
  taskInputEl.type = 'text';
  taskInputEl.value = task;
  taskInputEl.setAttribute('readonly', 'readonly');

  taskContentEl.appendChild(taskInputEl);

  const taskActionsEl = document.createElement('div');
  taskActionsEl.classList.add('actions');

  const taskEditEl = document.createElement('i');
  taskEditEl.classList.add('fas', 'fa-edit', 'edit-icon');
  taskEditEl.setAttribute('aria-label', 'Edit Task');
  taskEditEl.title = 'Edit Task';

  const taskDeleteEl = document.createElement('i');
  taskDeleteEl.classList.add('fas', 'fa-trash-alt', 'delete-icon');
  taskDeleteEl.setAttribute('aria-label', 'Delete Task');
  taskDeleteEl.title = 'Delete Task';

  taskActionsEl.appendChild(taskEditEl);
  taskActionsEl.appendChild(taskDeleteEl);

  taskEl.appendChild(taskActionsEl);

  listElModal.appendChild(taskEl);

  saveTodoList();
  
  inputModal.value = '';

  taskEditEl.addEventListener('click', (e) => {
    if (taskEditEl.classList.contains('fa-edit')) {
      taskEditEl.classList.remove('fa-edit');
      taskEditEl.classList.add('fa-save');
      taskInputEl.removeAttribute('readonly');
      taskInputEl.focus();
    } else if (taskEditEl.classList.contains('fa-save')) {
      taskEditEl.classList.remove('fa-save');
      taskEditEl.classList.add('fa-edit');
      taskInputEl.setAttribute('readonly', 'readonly');
    }

    saveTodoList();
    
  });

  taskDeleteEl.addEventListener('click', (e) => {
    listElModal.removeChild(taskEl);

    saveTodoList();
  });
});

// Load tasks from local storage
try {
  const storedList = localStorage.getItem('todoList');
  if (storedList) {
    const taskList = JSON.parse(storedList);

    listElModal.innerHTML = '';

    taskList.forEach(task => {
      const taskEl = document.createElement('div');
      taskEl.classList.add('task');

      const taskContentEl = document.createElement('div');
      taskContentEl.classList.add('content');

      taskEl.appendChild(taskContentEl);

      const taskInputEl = document.createElement('textarea');
      taskInputEl.classList.add('text');
      taskInputEl.type = 'text';
      taskInputEl.value = task;
      taskInputEl.setAttribute('readonly', 'readonly');

      taskContentEl.appendChild(taskInputEl);

      const taskActionsEl = document.createElement('div');
      taskActionsEl.classList.add('actions');

      const taskEditEl = document.createElement('i');
      taskEditEl.classList.add('fas', 'fa-edit', 'edit-icon');
      taskEditEl.setAttribute('aria-label', 'Edit Task');
      taskEditEl.title = 'Edit Task';

      const taskDeleteEl = document.createElement('i');
      taskDeleteEl.classList.add('fas', 'fa-trash-alt', 'delete-icon');
      taskDeleteEl.setAttribute('aria-label', 'Delete Task');
      taskDeleteEl.title = 'Delete Task';

      taskActionsEl.appendChild(taskEditEl);
      taskActionsEl.appendChild(taskDeleteEl);

      taskEl.appendChild(taskActionsEl);

      listElModal.appendChild(taskEl);
    });
  }
} catch (error) {
  console.error('Error accessing local storage:', error);
}


// Focus Function
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focusElement.textContent = 'Enter Focus';
  } else {
    focusElement.textContent = localStorage.getItem('focus');
  }
}

function setFocus(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focusElement.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

getFocus();

focusElement.addEventListener('keypress', setFocus);
focusElement.addEventListener('blur', setFocus);

   
// Random Quotes Function
function getStoredQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  return storedQuotes ? storedQuotes.split(',') : [];
}

function saveQuotesToLocalStorage(quotes) {
  localStorage.setItem('quotes', quotes.join(','));
}

function generateRandomQuote(quoteArray) {
  const randomIndex = Math.floor(Math.random() * quoteArray.length);
  return quoteArray[randomIndex];
}

let quotes = getStoredQuotes();

const defaultQuotes = ["If You Have an Idea that You Genuinely Think is Good Don’t Let Some Idiot Talk You Out of It. - Stan Lee", "No such thing as a life that's better than yours - J. Cole", "Service to others is the rent you pay for your room here on earth. - Muhammad Ali"];

if (quotes.length === 0) {
  quotes = defaultQuotes;
  saveQuotesToLocalStorage(quotes);
}

// Priority of Quote Display
function displayRandomQuote() {
  let randomQuote;

  const userQuotes = quotes.slice(defaultQuotes.length);
  if (userQuotes.length > 0) {
    randomQuote = generateRandomQuote(userQuotes);
  } else {
    randomQuote = generateRandomQuote(defaultQuotes);
  }

  document.getElementById('randomquotes').textContent = randomQuote;
}

// CRUD
function addNewQuote() {
  const newQuoteInput = document.getElementById('newQuoteInput');
  const newQuote = newQuoteInput.value;

  if (newQuote.trim() !== "") {
    quotes.push(newQuote);

    saveQuotesToLocalStorage(quotes);

    newQuoteInput.value = "";

    displayRandomQuote();
  }
}

function deleteQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quotes.splice(randomIndex, 1);

  saveQuotesToLocalStorage(quotes);

  displayRandomQuote();
}

displayRandomQuote();

const addQuoteButton = document.getElementById('addQuoteButton');
addQuoteButton.addEventListener('click', addNewQuote);

const deleteQuoteButton = document.getElementById('deleteQuoteButton');
deleteQuoteButton.addEventListener('click', deleteQuote);

