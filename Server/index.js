const express = require('express')
const server = express();


const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config()



const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log('Connected to MongoDB');
}

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String

});

const User = mongoose.model('User', userSchema);


server.use(cors());
server.use(bodyParser.json());



server.post('/demo', async (req,res)=>{
    let user = new User();
     user.username=req.body.username;
     user.password=req.body.password;
     const doc = await user.save();
     res.json(doc)
})



server.get('/demo',async (req,res)=>{
    const docs = await User.find({})
    res.json(docs)
})


server.listen(8000,()=>{
    console.log('Server is running on port 8000')
})