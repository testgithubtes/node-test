const express = require('express');
const hbs = require('hbs');
const fs =require('fs');

const port = process.env.PORT || 3000;
var app = express();


// fix the partials
hbs.registerPartials(__dirname+'/views/partials')
// fix the template to hbs
app.set('view engine','hbs');
// fix the asset on public
app.use(express.static(__dirname +'/public'));
// create new Middleware log

app.use((req,res,next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url} ${req.ip} ${req.get('User-Agent')[0]}`
  console.log(log);
  fs.appendFile('server.log',log +'\n',(err) =>{
    if(err){
      console.log(err);
    }
  })
  next();
})
 // Middleware of Maintenace
 app.use((req,res,next) =>{
   res.render('maintenance')
 })


hbs.registerHelper('getCopyright',() => {
  return new Date().getFullYear()
});

// Route Home Page
app.get('/', (req,res) => {
  res.render('home.hbs',{
    title : 'Home Page',
    welcome_message : 'welcome every one'
  });
});

// Route About Page
app.get('/about',(req,res) => {
  res.render('about.hbs',{
    title : 'about me'
  });
});

// Route bad Page
app.get('/bad',(req,res) => {
  res.send({
  error:'error message'
  });
});
app.listen(port , () =>{
  console.log('server start on port ${port}');
});
