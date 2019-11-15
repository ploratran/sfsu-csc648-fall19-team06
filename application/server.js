const express = require('express'); //express framework 
const path = require('path');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const aboutRouter = require('./routers/about');
const homeRouter = require('./routers/home');
const sellRouter = require('./routers/sell');
const loginRouter = require('./routers/login');
const registerRouter = require('./routers/register');
const db = require('./model/database');
const port = 3001; //port #, can change if there is an issue persisting

const app = express();
app.use(bodyparser.json());

// connect to db
// db.connect((err) => {
//     if (err) {
//         //throw err;
//         console.log('Error connecting ...');
//     } 
//     console.log('Database connected ...');
// });

// query db
// db.query('SELECT * FROM products', (err, data) => {
//     if (err) {
//         console.log('err')
//         return;
//     } 
//     console.log(data);
// });
    
app.set('view engine', 'ejs'); //set view engine as ejs
app.set('views', path.join(__dirname, 'views')); //serve files in views folder

app.use(express.static('public')); //serve public static files

app.use('/', homeRouter);
app.use('/', aboutRouter);
app.use('/', sellRouter);
app.use('/', loginRouter);
app.use('/', registerRouter);

app.use(function(req,res) {
    res.status(400).render(path.join(__dirname, '/views/pages/404'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));