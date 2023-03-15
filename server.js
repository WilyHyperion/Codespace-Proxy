
const express = require('express');
const app = express()
const port = 8000
app.use(express.json())
const axios = require('axios')

let CUrl = "";
app.get("/" ,(req ,res) => {
    try {
        res.sendFile(__dirname + "/Main.html");    
    } catch (error) {
        
    }
    
});

app.get("*", (req, res) => {
    console.log("GET " + CUrl + req.url );
    try {
    let url = CUrl + req.url;
    axios.get(url).then((resp) => {
        res.send(resp.data);
    }).catch((error) => {
        console.log("error");
    }
    );

} catch (error) {
        
}
});

app.post("/changeURL" ,(req ,res) => {

    try {
    console.log("post");
    let body = req.body;
    let url ="https://" +  body.url;
    CUrl = url;
    axios.get(url).then((resp) => {
        res.send(resp.data);
    }).catch((error) => {
        console.log("error");
    });

} catch (error) {
}

});
app.post("*", (req, res) => {
    console.log(CUrl + req.url);
    axios.post(CUrl + req.url, req.body
        ).then((resp) => {
        res.send(resp.data);
    }).catch((error) => {
      console.log("error: " +  error.message);
    });
});
app.listen(port)
