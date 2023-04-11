const express = require('express')
const app = express()
const port = 3000

let dbuser =[
  {
      username : "soo",
      password: "password",
      name: "Soo",
      email: "soo@utem.edu.my "
  },

  {
      username: "ali",
      password: "123456",
      name: "ali",
      email: "ali@utem.edu.my "
  },

  {
      username: "wee",
      password: "1234567",
      name: "wee",
      email: "wee@utem.edu.my "
  },

  {
      username: "hee",
      password: "hee123",
      name: "hee",
      email: "hee@utem.edu.my "
  },

  {
      username: "utah",
      password: "gdyyrgg",
      name: "utah",
      email: "uuuu@utem.edu.my "
  },
]
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/login',(req,res) =>{
    const{username, password}=req.body;
  
    const user = dbuser.find(user => user.username === username);
  
    if(!user){
      res.send({error:"user not found"});
      return
    }
    const userp = dbuser.find(userp => userp.password === password)
    if(!userp){
      res.send("wrong password")
      return
    }
    //console.log(user)
    res.send(user)
  })

app.post('/register',(req,res)=>{
  let data=req.body
  res.send(
    register(
      data.username,
      data.password,
      data.name,
      data.email
    )
  );
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function login(username,password){
  console.log("someone try to login with",username,password)
  let matched = dbuser.find(Element=>
      Element.username == username
  )
  if(matched){
      if(matched.password == password ) {
          return matched
      } else {
          return "Password not matched"
      }
  } else {
      return "username not found"
  }
}

function register(newusername,newpassword,newname,newemail){
  let matched = dbuser.find(Element=>
      Element.username == newusername
  )
  if(matched){
      return "username was used"
  }else{


  dbuser.push({
      username: newusername,
      password: newpassword,
      name: newname,
      email: newemail
  })
  console.log("account has been created")



}
}