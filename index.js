const express = require('express');
require('./db/config');
const cors = require('cors');
const app = express();
const User = require('./db/User');
app.use(express.json());
app.use(cors());

// sign up
app.post("/signup", async (req, resp)=>{
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
});

// sign in
app.post("/signin", async (req, resp)=>{
    if(req.body.email){
        if(req.body.password){
            const user = await User.findOne(req.body).select('-password');
            if(user){
                resp.send(user);
            }else{
                resp.send({result: 1});
            }
        }else{
            resp.send({result: 2});
        }
    }else{
        resp.send({result: 3});
    }
    
});

app.listen(1200);
