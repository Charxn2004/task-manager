const form = document.querySelector('.create-task-form');
const subtasksContainer = document.getElementById('subtasks-container');
const addSubtaskBtn = document.getElementById('add-subtask');
const notificationContainer = document.getElementById('notification-container');

// Set minimum date to today for the due date input
const dueDateInput = document.getElementById('dueDate');
const today = new Date().toISOString().split('T')[0];
dueDateInput.min = today;

// Add debug output when date changes
dueDateInput.addEventListener('change', (e) => {
  console.log('Create task - Date input changed to:', e.target.value);
});

let subtaskCount = 0;

// Show notification
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notificationContainer.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Add subtask field
function addSubtaskField() {
  const subtaskDiv = document.createElement('div');
  subtaskDiv.className = 'subtask-item';
  subtaskDiv.innerHTML = `
    <div class="form-row subtask-row">
      <input type="text" class="form-input subtask-input" placeholder="Enter subtask" required>
      <button type="button" class="btn btn-icon remove-subtask" title="Remove subtask">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `;
  
  subtasksContainer.appendChild(subtaskDiv);
  
  // Focus the new input
  const newInput = subtaskDiv.querySelector('.subtask-input');
  newInput.focus();
  
  // Add remove event listener
  subtaskDiv.querySelector('.remove-subtask').addEventListener('click', () => {
    subtaskDiv.remove();
  });
}

// Add subtask button click handler
addSubtaskBtn.addEventListener('click', addSubtaskField);

// Form submit handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  try {
    // Get all form values
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const dueDate = document.getElementById('dueDate').value; // This is already in YYYY-MM-DD format
    
    // Debug output for date
    console.log('Task creation - Due date value:', dueDate);
    
    // Get subtasks
    const subtaskInputs = document.querySelectorAll('.subtask-input');
    const subtasks = Array.from(subtaskInputs)
      .filter(input => input.value.trim() !== '')
      .map(input => ({
        name: input.value.trim(),
        completed: false
      }));
    
    // Create task object - send the date directly without conversion
    const task = {
      name,
      description,
      priority,
      dueDate: dueDate || null, // Use the date string directly or null if empty
      subtasks,
      progress: 0
    };
    
    // Send to server
    console.log('Sending task to server:', task);
    const response = await axios.post('/api/v1/tasks', task);
    console.log('Server response:', response.data);
    
    showNotification('Task created successfully');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
    
  } catch (error) {
    console.error('Error creating task:', error);
    showNotification(error.response?.data?.msg || 'Error creating task', 'warning');
  }
}); 