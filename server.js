const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const dns = require('node:dns/promises');
dns.setServers(['1.1.1.1', '8.8.8.8']);
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

connectDB();

const app = express();

//static folder
app.use(express.static(path.join(__dirname, 'public')));
//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//cors middleware
app.use(
  cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    credentials: true,
  }),
);

app.get('/', (req, res) => {
  //   console.log('Method:', req.method);
  //   console.log('Url:', req.url);
  //   console.log('Query:', req.query);
  //   console.log('Parms:', req.params);
  //   console.log('Body:', req.body);
  //   console.log('Headers:', req.headers);
  res.send({message: 'Testing random ideas app'});
});

//idea router
const ideasRouter = require('./routes/ideas');
const {connect} = require('mongoose');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`Server listen on port ${port}`));
