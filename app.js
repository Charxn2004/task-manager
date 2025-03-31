require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/connect');
const tasksRouter = require('./routes/tasks');
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1/tasks', tasksRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 10000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, '0.0.0.0', () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
