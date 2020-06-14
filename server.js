const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

dotenv.config({ path: './config/config.env' });

const connectDB = require('./config/db');
connectDB();

const app = express();
const transactions = require('./routes/transactions');

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use('/api/v1/transactions', transactions);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	//SINCE, we are into the production mode, then we just have to route our client react app as home page through
	// build folder containing index.html.
	//NOTE we don't have to run react dev in terminal. Just npm start will do as we are into the production mode using build.
	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
