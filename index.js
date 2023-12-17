const express = require('express');
const app = express();



app.post("/signup", (req, resp)=>{
    resp.send("working fine");
});

app.listen(1200);
