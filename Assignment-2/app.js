const express = require('express');
const axios = require('axios');

// express app
const app = express();

// listen for requests
app.listen(5000, () => {
  console.log("listening on port 5000");
});

app.use(express.json());
// register view engine
//we need to define a view engine,  we will use EJS
//using app.set()
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

app.get('/', (req, res) => {
  axios.get("https://jsonplaceholder.typicode.com/posts")
    .then(function(response) {
      const blogs = response.data;
      res.render('index', { title: 'Home', blogs }); 
    }).catch(function(error) {
      res.json("Error occured!")
    })
  
});

app.get('/about', (req, res) => {
  axios.get("https://jsonplaceholder.typicode.com/users/1")
    .then(function(response) {
      const user = response.data;
      res.render('about', { title: 'About', user }); 
    }).catch(function(error) {
      res.json("Error occured!")
    })
});

app.post('/post', (req, res) => {
  axios.post("https://jsonplaceholder.typicode.com/posts",{
    title: req.body.title,
    body: req.body.body,
    userId: 1,
  })
    .then(function(response) {
      const blogs = [];
      blogs.push(response.data);
      res.redirect('/'); 
    }).catch(function(error) {
      res.json("Error occured!")
    })
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
