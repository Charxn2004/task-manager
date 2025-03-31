const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [50, "name can not be more than 50 characters"],
  },
  description: {
    type: String,
    required: [true, "must provide description"],
    trim: true,
    maxlength: [500, "description can not be more than 500 characters"],
  },
  dueDate: {
    type: Date,
    required: [true, "must provide due date"]
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  order: {
    type: Number,
    default: 0
  },
  reminder: {
    date: Date,
    enabled: {
      type: Boolean,
      default: false
    }
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  subtasks: [{
    name: String,
    completed: {
      type: Boolean,
      default: false
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model("Task", TaskSchema);
