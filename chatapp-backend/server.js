const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cokieParser = require('cookie-parser');
const dbCOnfig = require('./config/secret');
const auth = require('./routes/authRoutes');
const app = express();
mongoose.Promise = global.Promise;
mongoose.connect(dbCOnfig.url, {useNewUrlParser:true, useUnifiedTopology:true});
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended: true, limit:'50mb'}));
app.use(cokieParser());
app.use(morgan('tiny'));


app.use('/api/chatapp', auth);

app.listen(3000, ()=> {
    console.log('Running on port 3000')
});
