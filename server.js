const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express(); 

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');



//to register a middleware .use
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    })
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response) => {
    //response.send('<h1>Hello Express</h1>');
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    })
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Unable to find a page'
    });
});


//app.disable('etag');

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});