const express = require('express');
const hbs = require('hbs');





const fs = require('fs');


const port = process.env.PORT||3001;
var app = express();

hbs.registerPartials(__dirname+'/views/partials')

app.set('view engine', 'hbs')


//app.use(express.static(__dirname + '/public'));

hbs.registerHelper('currentyear' ,()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamit',(text)=>{
    return text.toUpperCase();

})

app.use((req , res , next)=>{
    var now = new Date().toString();
    var log = `now : ${now} , method : ${req.method} ,url is : ${req.url}`

    console.log(log);
    fs.appendFile('server.log',log +'\n' ,(error)=>{
        if (error){
            console.log(error);
        }
    })
    next();
})
//
// app.use((req , res , next)=>{
//     res.render('maintenace.hbs');
// })
app.use(express.static(__dirname + '/public'));

app.get('/home', (req, res) => {
   res.render('home.hbs',{
       pagetitle:"  this is my home page",
       body:"welcome to  the body",

   })
})

app.get('/project',(req , res)=>{
    res.render('project.hbs' ,{
        pagetitle:"projects"
    })
})


app.get('/about', (req, res) => {


    res.render('about.hbs' ,{
        pagetitle:"konark ",
        body:" the pride of oriss",

    })
})

app.get('/error', (req, res) => {

    res.send({
        errormessage: " the i ain te world"
    })

})


app.listen(port, () => {
    console.log(`server port is :   ${port}`);
});