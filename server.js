const bcrypt = require('bcrypt');
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


app.post('/', (req, res) => {
  let data= req.body
  let loginresult = login(
    data.username,
    data.password
  )
  res.send({
    status: loginresult,
    originaldata: data,
    date: Date.now
  });
});

app.post('/login',async(req,res) =>{
  const{username, password}=req.body;

  const user = dbuser.find(user => user.username === username && user.password === password);

  if(!user){
    res.send({error:"user not found"});
  }
  const isvalid = await bcrypt.compare(password,dbuser.password)
  if(!isvalid){
    res.send("wrong password")
  }

  res.send('ok')
})

app.post('/register',async(req,res)=>{
  const{newusername,newpassword,newname,newemail}=req.body
  const hash = await bcrypt.hash(newpassword,10)
  let matched = dbuser.find(Element=>
    Element.username == newusername
)
if(matched){
    return "username was used"
}else{
dbuser.push({
    username: newusername,
    password: hash,
    name: newname,
    email: newemail
})
console.log(dbuser)
  res.send("ok")
}
});

app.post('/bye', (req, res) => {
  res.send('Bye Bye World!')
})
// post is one of the method to request to the server


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


