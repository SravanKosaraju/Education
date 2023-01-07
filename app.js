// const burger=document.querySelector('.burger')
// const navbar=document.querySelector('.navbar') 
// const navlist=document.querySelector('.nav-list') 
// const rightnav=document.querySelector('.rightnav') 


// burger.addEventListener('click',()=>{
//      rightnav.classList.toggle('vclass-resp')
//      navlist.classList.toggle('vclass-resp')
//      navbar.classList.toggle('navheight-resp')
// })

var con=require('./connection')
var express=require('express')
var app=express()
var bodyparser=require('body-parser')
const encoder=bodyparser.urlencoded({extended:true})

app.use(express.urlencoded({extended:true}))
app.use('/css',express.static('css'))
app.engine('html', require('ejs').renderFile);//both render and sendfile will work if we use template engine
// app.use(bodyparser.json())
// app.use(bodyparser.urlencoded({extended:true}))

// When we use engine we use render else we use send File

// app.get('/',(req,res)=>{
//   res.sendFile('index.html',{root:'views'})
// })

app.get("/",(req,res)=>{
  res.sendFile('/index1.html',{root:'views'})
})

app.post("/",encoder,(req,res)=>{
  var username=req.body.username
  var password=req.body.password
  var sql="select * from logindetails where username = '"+username+"' and password = '"+password+"'"
  con.query(sql,(err,results,fields)=>{
      if (results.length > 0){
          res.redirect("/welcome")
      }
      else{
          res.redirect("/")
      }

  })
})

// when login success
app.get("/welcome",(req,res)=>{
  res.sendFile('index.html',{root:'views'})
})

app.get('/contact',(req,res)=>{
  res.status(200).render('contact.html')
})

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!")
})

app.post('/submit',(req,res)=>{
  console.log(req.body)
  var name=req.body.name
  var phonenumber=req.body.phonenumber
  var email=req.body.email
  var concerns=req.body.text

  var sql = "insert into students values ('"+name+"','"+phonenumber+"','"+email+"','"+concerns+"')";
  // var values=[
  //   [name,phonenumber,email,concerns]
  // ]
  con.query(sql,function(err, result){
  if (err) throw err;
  res.send("Your concern has been recorded")
  })
})

app.listen(5500,()=>{
  console.log("Running successfully on port 5500")
})


  

  // con.connect()
  // var sql="sql commands"
  // sql.query(sql);


