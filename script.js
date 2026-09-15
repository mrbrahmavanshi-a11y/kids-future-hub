// Default Preset Missions for Kids
const defaultTasks = [
  { id: 1, title: "🧠 Solve 1 Logic / Math Puzzle", points: 20, completed: false },
  { id: 2, title: "📚 Read 15 Minutes of a Book", points: 15, completed: false },
  { id: 3, title: "📵 0 Unnecessary Social/Screen Time", points: 25, completed: false },
  { id: 4, title: "🏃 30 Mins Outdoor Activity or Exercise", points: 20, completed: false }
];

// Initialize State from LocalStorage
let tasks = JSON.parse(localStorage.getItem('kidsTasks')) || defaultTasks;
let points = parseInt(localStorage.getItem('kidsPoints')) || 0;
let streak = parseInt(localStorage.getItem('kidsStreak')) || 1;

// Render App Data
function renderApp() {
  document.getElementById('pointCount').innerText = points;
  document.getElementById('streakCount').innerText = streak;

  const taskContainer = document.getElementById('taskList');
  taskContainer.innerHTML = '';

  tasks.forEach(task => {
    const card = document.createElement('div');
    card.className = `task-card ${task.completed ? 'completed' : ''}`;
    card.innerHTML = `
      <div class="task-info">
        <h4>${task.title}</h4>
        <p>+${task.points} Star Points</p>
      </div>
      <button class="check-btn" onclick="toggleTask(${task.id})">
        ${task.completed ? '✓ Completed' : 'Mark Done'}
      </button>
    `;
    taskContainer.appendChild(card);
  });

  // Save to LocalStorage
  localStorage.setItem('kidsTasks', JSON.stringify(tasks));
  localStorage.setItem('kidsPoints', points);
  localStorage.setItem('kidsStreak', streak);
}

// Toggle Task Complete / Incomplete
function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      if (!task.completed) {
        points += task.points;
      } else {
        points -= task.points;
      }
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  renderApp();
}

// Add Custom Mission
function addCustomTask() {
  const input = document.getElementById('customTaskInput');
  const title = input.value.trim();
  if (title === '') return;

  const newTask = {
    id: Date.now(),
    title: `⭐ ${title}`,
    points: 15,
    completed: false
  };

  tasks.push(newTask);
  input.value = '';
  renderApp();
}

// Switch Between Modules (Tabs)
function switchTab(tabName) {
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.container').forEach(c => c.classList.add('hidden'));

  event.target.classList.add('active');
  document.getElementById(`${tabName}-module`).classList.remove('hidden');
}

// First Load Initializer
renderApp();