# Task Manager Application

A full-stack task management application with theme switching functionality.

## Deployment Options

### Option 1: Frontend-Only Deployment (Netlify)

1. Sign up for a free [Netlify](https://www.netlify.com/) account
2. From the Netlify dashboard, click "Add new site" > "Import an existing project"
3. Connect to your GitHub/GitLab/Bitbucket account and select this repository
4. In the deployment settings:
   - Build command: (leave blank)
   - Publish directory: `public`
5. Click "Deploy site"

Note: With frontend-only deployment, the backend functionality (saving tasks to MongoDB) won't work. The UI will load but task data won't be saved.

### Option 2: Full-Stack Deployment (Render)

For a complete deployment with backend functionality:

1. Sign up for a free [Render](https://render.com/) account
2. Create a new Web Service
3. Connect your GitHub/GitLab repository
4. Configure the following settings:
   - Name: task-manager
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `node app.js`
5. Add the following environment variables:
   - MONGO_URI: [Your MongoDB connection string]
   - PORT: 10000 (or any port Render assigns)
6. Click "Create Web Service"

For the database:
1. Create a MongoDB Atlas account (free tier available)
2. Create a new cluster
3. Set up network access to allow connections from anywhere
4. Create a database user
5. Get your connection string and add it to your environment variables

## Project Structure

```
task-manager/
├── assets/
│   ├── css/
│   │   ├── main.css        # Main stylesheet
│   │   └── normalize.css    # CSS reset and normalization
│   ├── js/
│   │   ├── browser-app.js  # Main application logic
│   │   ├── tasks-app.js    # Tasks page logic
│   │   ├── assigned-app.js # Assigned tasks logic
│   │   ├── planned-app.js  # Planned tasks logic
│   │   ├── important-app.js # Important tasks logic
│   │   ├── create-task.js  # Task creation logic
│   │   └── edit-task.js    # Task editing logic
│   └── images/
│       └── Logo.png        # Application logo
├── pages/
│   ├── tasks.html         # All tasks page
│   ├── assigned.html      # Assigned tasks page
│   ├── planned.html       # Planned tasks page
│   ├── important.html     # Important tasks page
│   └── create-task.html   # Create new task page
└── index.html            # Main application page
```

## Features

1. Task Management
   - Create, edit, and delete tasks
   - Set task priorities (Low, Medium, High)
   - Add due dates
   - Mark tasks as complete
   - Task descriptions and details

2. Task Organization
   - View all tasks
   - Filter by priority and status
   - View important tasks
   - View planned tasks
   - View assigned tasks

3. User Interface
   - Modern, clean design
   - Responsive layout
   - Dark/Light theme toggle
   - Task statistics
   - Loading states
   - Notifications

4. Additional Features
   - Drag and drop task reordering
   - Task progress tracking
   - Task filtering and search
   - Real-time updates

## How to Run

1. Make sure you have a web server installed (e.g., Live Server for VS Code)
2. Open the project folder in your code editor
3. Start the web server
4. Open `index.html` in your browser

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Axios for HTTP requests
- Font Awesome for icons
- SortableJS for drag-and-drop functionality

## Theme Support

The application supports both light and dark themes:

- Light Theme: Clean, bright interface for daytime use
- Dark Theme: Eye-friendly dark mode for night time use
- Theme preference is saved in localStorage
- Smooth transitions between themes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- Make sure all JavaScript files are properly loaded
- The application requires an active internet connection for CDN resources
- Theme preference is stored locally in the browser 