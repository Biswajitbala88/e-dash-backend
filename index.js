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

// product list
app.get("/products", async (req, resp)=>{
    let result = await Product.find();
    if(result.length>0){
        resp.send(result);
    }else{
        resp.send({result: "No product found"});
    }
});

// delete product
app.delete("/product/:id", async (req, resp)=>{
    const result = await Product.deleteOne({_id:req.params.id})
    resp.send(result);
});

// get product details
app.get("/productDetails/:id", async (req, resp)=>{
    try{
        let result = await Product.find({_id:req.params.id});
        if(result.length>0){
            resp.send(result);
        }else{
            resp.send({result: "No product found"});
        }
    } catch (error) {
        resp.status(500).send({ error: "Internal Server Error" });
    }
});

// Update existing product
app.put("/update-product/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedProduct = await Product.updateOne({_id: req.params.id}, {$set: req.body});
  
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      return res.status(200).json(updatedProduct);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  



app.listen(1200);
