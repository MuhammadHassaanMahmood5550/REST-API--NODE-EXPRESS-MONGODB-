//first npm init -y
//then npm install express nodemon = multipe package can be installed in this way
//then npm install mongoose
//then go to mongodb website and create every thing see in mobile whatsapp group
//then npm install dotenv to hide db create file .env then inside it  DB = ...;(that generated db link)
//then const mongoose = require('mongoose')
//then functionality to add db in our project
//then go to mongodb website and goto network access and click anywhere in the world and click ok

//import package
const express = require('express');
//execute package 
const app = express();
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
const cors = require('cors');
//get npm install dotevn pakage
require('dotenv/config');

//middlewares
app.use(cors());

//creating middleware any time we do any request bodyParser.json() works to convert post into json after doing post from post man
app.use(bodyParser.json());

//import routes
const postsRoute = require('./routes/posts');
//used it as a middleware, every time you go to ./posts route run this
app.use('/posts', postsRoute);


//connect to database, altus
// mongoose.connect(process.env.DB_CONNECTION,
// { useNewUrlParser: true }, 
// ()=> console.log('connected to db')
// )

//another way
//mongoose.connect() return promise = means promise kiya h ya to kam hoga ya to ni. using  .then .catch is for promis
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=> 
    console.log('successful')
).catch((err)=> console.log('no connection'));




app.listen(3000);