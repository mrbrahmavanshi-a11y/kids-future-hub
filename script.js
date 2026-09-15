// LocalStorage Initial State
const defaultTasks = [
  { id: 1, title: "🧠 Solve 1 Logic / Math Puzzle", points: 20, completed: false },
  { id: 2, title: "📚 Read 15 Minutes of a Book", points: 15, completed: false },
  { id: 3, title: "📵 0 Unnecessary Screen Time", points: 25, completed: false }
];

let tasks = JSON.parse(localStorage.getItem('kidsTasks')) || defaultTasks;
let points = parseInt(localStorage.getItem('kidsPoints')) || 0;
let streak = parseInt(localStorage.getItem('kidsStreak')) || 1;

// Render Tracker App
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
        ${task.completed ? '✓ Done' : 'Mark Done'}
      </button>
    `;
    taskContainer.appendChild(card);
  });

  localStorage.setItem('kidsTasks', JSON.stringify(tasks));
  localStorage.setItem('kidsPoints', points);
  localStorage.setItem('kidsStreak', streak);
}

function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      points += task.completed ? -task.points : task.points;
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  renderApp();
}

function addCustomTask() {
  const input = document.getElementById('customTaskInput');
  const title = input.value.trim();
  if (!title) return;

  tasks.push({ id: Date.now(), title: `⭐ ${title}`, points: 15, completed: false });
  input.value = '';
  renderApp();
}

// Module Tab Switching
function switchTab(event, tabName) {
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.container').forEach(c => c.classList.add('hidden'));

  event.currentTarget.classList.add('active');
  document.getElementById(`${tabName}-module`).classList.remove('hidden');
}

// AI Logic Checker
function checkAnswer(button, isCorrect) {
  const options = document.querySelectorAll('#promptOptions .option-btn');
  const feedback = document.getElementById('feedbackText');

  options.forEach(opt => opt.disabled = true);

  if (isCorrect) {
    button.classList.add('correct');
    feedback.style.color = '#10b981';
    feedback.innerText = '🎯 Perfect! Detailed prompts (Subject + Setting + Style) deliver accurate AI results. +25 Points!';
    points += 25;
    renderApp();
  } else {
    button.classList.add('wrong');
    feedback.style.color = '#ef4444';
    feedback.innerText = '❌ Too vague! AI needs specific context to generate quality outputs.';
  }
}

// Interactive Storybook Engine
function makeStoryChoice(choiceNum) {
  const content = document.getElementById('storyContent');
  const choices = document.getElementById('storyChoices');

  if (choiceNum === 1) {
    content.innerText = "You carefully fix the power core. The robot glows bright blue! It thanks you and grants you 30 Star Points for logical problem-solving.";
    choices.innerHTML = `<p style="color: #10b981; font-weight:700;">🎉 Quest Completed! +30 Points earned.</p>`;
    points += 30;
    renderApp();
  } else if (choiceNum === 2) {
    content.innerText = "Your diagnostic scan reveals a corrupted code block. You write a clean patch script and safely reboot the robot!";
    choices.innerHTML = `<p style="color: #8b5cf6; font-weight:700;">🚀 Coding Quest Victory! +30 Points earned.</p>`;
    points += 30;
    renderApp();
  }
}

renderApp();
