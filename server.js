const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');
const port=process.env.PORT || 5000;
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} , The request method is ${req.method} ${req.path}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to log data')
        }

    });
    next()
})

// app.use((req,res,next)=>{
// 	res.render('maintenance.hbs')
// })
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getFullYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('streamIt', (text) => {
    return text.toUpperCase()
})


app.get('/', (req, res) => {
    res.render('home.hbs', {
        pagetitle: 'Home Page',
        welocmemessage: 'Welcome to our website ladies and gentlemen'
    })
})



app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pagetitle: 'About Page',
        welocmemessage: 'Welcome to our the about page'
    })
})
app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pagetitle: 'About Page',
        welocmemessage: 'Welcome to the projects page'
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to get to that address'
    })
})


app.listen(port, () => {
    console.log(`Server is up on server ${port}`)
})