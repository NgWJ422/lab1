const bcrypt = require('bcrypt');
const express = require('express')
const app = express()
const port = 3000

let dbuser =[
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

  const user = dbuser.find(user => user.username === username);

  if(!user){
    res.send({error:"user not found"});
    return
  }
  const isvalid = await bcrypt.compare(password,user.password)
  if(!isvalid){
    res.send("wrong password")
    return
  }
  console.log(user)
  res.send('login success')
})

app.post('/register',async(req,res)=>{
  const{newusername,newpassword,newname,newemail}=req.body
  const hash = await bcrypt.hash(newpassword,10)
  let matched = dbuser.find(Element=>
    Element.username == newusername
)
if(matched){
    res.send("username was used")
}else{
dbuser.push({
    username: newusername,
    password: hash,
    name: newname,
    email: newemail
})
console.log(dbuser)
  res.send("registered")
}
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


