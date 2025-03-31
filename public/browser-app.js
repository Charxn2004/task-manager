const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const prioritySelectDOM = document.querySelector('.priority-select')
const reminderInputDOM = document.querySelector('.reminder-input')
const formAlertDOM = document.querySelector('.form-alert')
const notificationContainer = document.getElementById('notification-container')
const priorityFilterDOM = document.getElementById('priority-filter')
const statusFilterDOM = document.getElementById('status-filter')
const totalTasksDOM = document.getElementById('total-tasks')
const completedTasksDOM = document.getElementById('completed-tasks')
const inProgressTasksDOM = document.getElementById('in-progress-tasks')
const tasksContainer = document.querySelector('.tasks')

// Initialize Sortable
const sortable = new Sortable(tasksDOM, {
  animation: 150,
  onEnd: async function(evt) {
    const tasks = Array.from(tasksDOM.children)
    const updates = tasks.map((task, index) => ({
      id: task.dataset.id,
      order: index
    }))
    
    try {
      await Promise.all(updates.map(update => 
        axios.patch(`/api/v1/tasks/${update.id}`, { order: update.order })
      ))
    } catch (error) {
      showNotification('Failed to update task order', 'warning')
    }
  }
})

// Show notification
function showNotification(message, type = 'success') {
  const notification = document.createElement('div')
  notification.className = `notification ${type}`
  notification.textContent = message
  notificationContainer.appendChild(notification)
  
  setTimeout(() => {
    notification.remove()
  }, 3000)
}

// Check for due reminders
function checkReminders(tasks) {
  tasks.forEach(task => {
    if (task.reminder && task.reminder.enabled && !task.completed) {
      const reminderDate = new Date(task.reminder.date)
      const now = new Date()
      
      if (reminderDate <= now) {
        showNotification(`Reminder: ${task.name} is due!`, 'warning')
      }
    }
  })
}

// Load tasks from /api/v1/tasks
let tasks = []

const loadTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const { data: { tasks: tasksData } } = await axios.get('/api/v1/tasks')
    tasks = tasksData
    updateStatistics()
    displayFilteredTasks()
    checkReminders(tasks)
  } catch (error) {
    console.error('Error loading tasks:', error)
    tasksDOM.innerHTML = '<h5 class="empty-list">There was an error loading tasks. Please try again later.</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

// Update Statistics
const updateStatistics = () => {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const inProgressTasks = totalTasks - completedTasks

  totalTasksDOM.textContent = totalTasks
  completedTasksDOM.textContent = completedTasks
  inProgressTasksDOM.textContent = inProgressTasks
}

// Filter Tasks
const filterTasks = () => {
  const priorityFilter = priorityFilterDOM.value
  const statusFilter = statusFilterDOM.value

  return tasks.filter(task => {
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter
    const matchesStatus = statusFilter === 'All' || 
      (statusFilter === 'Completed' && task.completed) ||
      (statusFilter === 'In Progress' && !task.completed)
    
    return matchesPriority && matchesStatus
  })
}

// Add this function after the showNotification function
function getTimeRemaining(dueDate) {
  if (!dueDate) return null;
  
  const now = new Date();
  const due = new Date(dueDate);
  const diff = due - now;
  
  if (diff < 0) return 'Overdue';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) return `${days} days left`;
  if (hours > 0) return `${hours} hours left`;
  if (minutes > 0) return `${minutes} minutes left`;
  return 'Due soon';
}

// Calculate progress based on due date
function calculateProgress(dueDate) {
  const now = new Date();
  const creationDate = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000)); // Assume task was created a week ago
  const due = new Date(dueDate);
  
  // Calculate total duration and time elapsed
  const totalDuration = due.getTime() - creationDate.getTime();
  const timeElapsed = now.getTime() - creationDate.getTime();
  
  // Calculate progress percentage
  let progress = Math.round((timeElapsed / totalDuration) * 100);
  
  // Clamp progress between 0 and 100
  progress = Math.max(0, Math.min(100, progress));
  
  return progress;
}

// Get progress bar class based on percentage
function getProgressBarClass(progress) {
  if (progress >= 90) return 'progress-danger';
  if (progress >= 70) return 'progress-warning';
  return 'progress-success';
}

// Display filtered tasks
const displayFilteredTasks = () => {
  const filteredTasks = filterTasks()
  
  if (filteredTasks.length < 1) {
    tasksDOM.innerHTML = '<h5 class="empty-list">No tasks to show...</h5>'
    return
  }

  tasksDOM.innerHTML = filteredTasks
    .map((task) => {
      const { _id: taskID, completed, name, priority, dueDate, description } = task
      const progress = calculateProgress(dueDate);
      const progressBarClass = getProgressBarClass(progress);
      
      return `<div class="single-task ${completed && 'task-completed'}" data-id="${taskID}">
        <p class="due-date">Due: ${new Date(dueDate).toLocaleDateString()}</p>
        <div class="task-header">
          <div class="task-title-group">
            <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
          </div>
          <div class="task-links">
            <button type="button" class="delete-btn" data-id="${taskID}">
              <i class="fas fa-trash"></i>
            </button>
            <button type="button" class="complete-btn" data-id="${taskID}">
              <i class="fas ${completed ? 'fa-times-circle' : 'fa-check-circle'}"></i>
            </button>
          </div>
        </div>
        <div class="task-info">
          <div class="task-description-section">
            <h6 class="description-title">Description:</h6>
            <p class="task-description" title="${description || 'No description provided'}">${description || 'No description provided'}</p>
          </div>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-fill ${progressBarClass}" style="width: ${progress}%"></div>
        </div>
        <div class="progress-text">${progress}% time elapsed</div>
      </div>`
    })
    .join('')
}

// Event Listeners
priorityFilterDOM.addEventListener('change', displayFilteredTasks)
statusFilterDOM.addEventListener('change', displayFilteredTasks)

// Delete task and Complete task
tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  const parent = el.parentElement
  
  if (parent.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = parent.dataset.id
    try {
      await axios.delete(`/api/v1/tasks/${id}`)
      await loadTasks()
      showNotification('Task deleted successfully')
    } catch (error) {
      showNotification('Error deleting task', 'warning')
      console.log(error)
    }
    loadingDOM.style.visibility = 'hidden'
  }
  
  if (parent.classList.contains('complete-btn')) {
    const id = parent.dataset.id
    try {
      const taskToUpdate = tasks.find(task => task._id === id)
      const newCompletedStatus = !taskToUpdate.completed
      
      await axios.patch(`/api/v1/tasks/${id}`, {
        completed: newCompletedStatus
      })
      
      showNotification(
        newCompletedStatus ? 'Task completed!' : 'Task marked as incomplete'
      )
      
      await loadTasks()
    } catch (error) {
      showNotification('Error updating task status', 'warning')
      console.log(error)
    }
  }
})

// Load tasks on page load
loadTasks()

// form
formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = taskInputDOM.value
  const priority = prioritySelectDOM.value
  const reminderDate = reminderInputDOM.value

  try {
    await axios.post('/api/v1/tasks', { 
      name,
      priority,
      reminder: {
        date: reminderDate,
        enabled: !!reminderDate
      }
    })
    await loadTasks()
    taskInputDOM.value = ''
    prioritySelectDOM.value = 'Medium'
    reminderInputDOM.value = ''
    showNotification('Task added successfully')
  } catch (error) {
    showNotification('Error, please try again', 'warning')
  }
})

// Check for reminders every minute
setInterval(() => {
  if (document.visibilityState === 'visible') {
    displayFilteredTasks()
  }
}, 60000)
