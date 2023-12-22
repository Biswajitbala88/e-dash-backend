const express = require('express');
require('./db/config');
const cors = require('cors');
const app = express();
const User = require('./db/User');
const Product = require('./db/Product');
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

// add new product
app.post("/add-product", async (req, resp)=>{
    const product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

// add new product
app.get("/products", async (req, resp)=>{
    let result = await Product.find();
    if(result.length>0){
        resp.send(result);
    }else{
        resp.send({result: "No product found"});
    }
});

app.listen(1200);
