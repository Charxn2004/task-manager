// Sample tasks for demo mode
const sampleTasks = [
  {
    _id: "demo1",
    name: "Complete project documentation",
    completed: false,
    priority: "High",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    description: "Write comprehensive documentation for the task manager project",
    order: 0
  },
  {
    _id: "demo2",
    name: "Fix CSS bugs in mobile view",
    completed: true,
    priority: "Medium",
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    description: "Resolve styling issues when viewing the app on mobile devices",
    order: 1
  },
  {
    _id: "demo3",
    name: "Add dark theme toggle",
    completed: true,
    priority: "Low",
    dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    description: "Implement functionality to switch between light and dark themes",
    order: 2
  },
  {
    _id: "demo4",
    name: "Deploy application to production",
    completed: false,
    priority: "High",
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    description: "Set up hosting and deploy the application to a live environment",
    order: 3
  },
  {
    _id: "demo5",
    name: "User testing",
    completed: false,
    priority: "Medium",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    description: "Conduct user testing sessions to gather feedback on the application",
    order: 4
  }
]; 