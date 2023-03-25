
const express = require('express');
const app = express()
const port = 8000
app.use(express.json())
const axios = require('axios')
console.log("Server is running");
let CUrl = "";
app.get("/" ,(req ,res) => {
    try {
        res.sendFile(__dirname + "/Main.html");    
    } catch (error) {
        
    }
});

app.get("*", (req, res) => {
    let url = CUrl + req.url;
    console.log(url);
    try{
        axios({
        method: 'GET',
        url: url,
        Headers: req.headers,
    }).then((resp) => {
            res.send(resp.data);
        
    }).catch((error) => {
        console.log("error" + error.message);
    }
    );

} catch (error) {
        
}
});

app.post("/changeURL" ,(req ,res) => {
    try {
    let body = req.body;
    let url ="https://" +  body.url;
    CUrl = url.trim("/");
    console.log("post, changing to:  " + CUrl);
    axios.get(url).then((resp) => {
        res.send(resp.data);
    }).catch((error) => {
        console.log(error.message);
    });

} catch (error) {
}

});
app.post("*", (req, res) => {
    let u  =(CUrl + req.url)
    console.log(u);
    axios({
        method: 'post',
        url: u,
        data: req.body,
        Headers: req.headers,
    }).then((resp) => {
        for(let i in resp.headers){
            res.setHeader(i, resp.headers[i]);
        }
        res.send(resp.data);
    }).catch((error) => {
      console.log("error: " +  error.message);
    });
});
app.listen(port)
