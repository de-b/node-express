const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
    const cityname = (req.body.cityName);

    const url ="https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&APPID=3784091e5787d5c48e81a286264f5ee9&units=metric";
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            //console.log(temp);
            res.write("<p></p>multiple write can be done but send can be done once</p>")
            res.write("<h1>server is running " + temp + " degree celcius</h1>");
            res.send();
        })
    })
    
})



app.listen(3000, function(){
    console.log("server is running on console");
});