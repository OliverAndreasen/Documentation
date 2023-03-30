/* app.js */
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mime = require('mime');
const session = require('express-session');
const bodyParser = require('body-parser');
const templateEngine = require('./util/templateEngine.js');
/* ------------------ */

const user = {
    username: 'admin',
    password: 'admin'
}

let posts = [];
let postsId = 0;

/* ------------------ */

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'))

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

/* ------------------ */

//set the mime type for html files
mime.define({
    'text/html': ['html']
}, {force: true

});

// set the MIME type for CSS files
mime.define({
    'text/css': ['css']
}, {force: true});

// set the MIME type for JS files
mime.define({
    'text/javascript': ['js']
}, {force: true});

/* ------------------ */



//Constructed pages
//const frontpagePage = templateEngine.renderPage(frontpagePath, "UPPER | Welcome");
//const indexPage = await templateEngine.renderIndexPage();


app.get('/', async function(req, res){
    const indexPage = await templateEngine.renderIndexPage();
    res.send(indexPage);
    //res.sendFile(__dirname + '/public/index/index.html');
});

app.get('/login', function(req, res){
    res.sendFile(__dirname + '/public/pages/login/login.html');
});


app.post('/login', function(req, res){
    const usernameInput = req.body.username;
    const passwordInput = req.body.password;

    if(usernameInput === user.username && passwordInput === user.password) {
        req.session.username = usernameInput;
        res.redirect('/');
    }else {
        res.redirect('/login');
    }
});

app.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/login');
});

app.get('/intro/', async function(req, res){
    const introPage = await templateEngine.renderIntroPage();
    res.send(introPage);
    //res.sendFile(__dirname + '/public/pages/intro/intro.html');
});

app.get('/start/', async function(req, res){
    const startPage = await templateEngine.renderStartPage();
    res.send(startPage);
    //res.sendFile(__dirname + '/public/pages/getting-started/getting-started.html');
});


app.get('/endpoints',async function(req, res){
    const endpointsPage = await templateEngine.renderEndpointsPage();
    console.log(endpointsPage)
    //res.sendFile(__dirname + '/public/pages/endpoints/endpoints.html');
    res.send(endpointsPage);
});

app.get('/serving-files', async function(req, res){
    const servingFilesPage = await templateEngine.renderServingFilesPage();
    res.send(servingFilesPage);
});

app.get('/view-dynamic-post', async (req, res) => {
    const viewDynamicPostPage = await templateEngine.renderViewDynamicPostPage();
    res.send(viewDynamicPostPage);
});

app.get('/dynamic-content', async (req, res) => {
    const dynamicContentPage = await templateEngine.renderDynamicContentPage();
    res.send(dynamicContentPage)
});



app.get('/dashboard', function(req, res) {
    // Check if the username is set in session storage
    if (!req.session.username) {
        res.redirect('/login');
    } else {
        res.send(`Welcome, ${req.session.username}!`);
    }
});


app.get('/createpost', function(req, res){
    // Check if the username is set in session storage
    if (!req.session.username) {
        res.redirect('/login');
    } else {
        res.sendFile(__dirname + '/public/pages/createpost/createpost.html');
    }
});


app.post('/createpost', function(req, res){
    id++;
    const title = req.body.title;
    const content = req.body.content;

    const post = {
        id: id,
        title: title,
        content: content
    }

    posts.push(post);
    res.send(posts);
});

app.get('/dynamic-post', (req, res) => {
    res.sendFile(__dirname + '/public/pages/dynamic-post/dynamic-post.html');
});

// POST for dynamic post
app.post('/dynamic-post', (req, res) => {
    // Get the post data from the request body
    const post = req.body;
    const dynamicPageHtml = templateEngine.createDynamicPage(post);
    postsId++;

    posts.push({
        post_id: postsId,
        html: dynamicPageHtml
    })

    res.json({ message: 'Post received and processed' });
});



// GET for dynamic post
app.get('/view-dynamic-post/:post_id', async (req, res) => {
    const postId = req.params.post_id;

    const post = posts.find(post => post.post_id == postId);

    if (post) {
        const dynamicPage = templateEngine.renderDynamicPage(post);
        res.send(dynamicPage);
    } else {
        res.status(404).send("Post not found");
    }
});


app.listen(port, function(){
    console.log('Server running on port ' + port);
});

