const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Function to generate page
function renderPage(bmiResult = "") {

return `
<html>
<head>
<title>BMI Calculator</title>

<style>

body{
    font-family: Arial;
    background-color:#f2f2f2;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
}

.container{
    background:white;
    padding:30px;
    border-radius:10px;
    box-shadow:0 0 10px rgba(0,0,0,0.2);
    text-align:center;
    width:300px;
}

input{
    width:200px;
    padding:8px;
    margin:8px;
}

button{
    padding:10px 20px;
    background-color:#007BFF;
    color:white;
    border:none;
    border-radius:5px;
}

button:hover{
    background-color:#0056b3;
}

.result{
    margin-top:20px;
    font-size:18px;
    color:#333;
}

</style>

</head>

<body>

<div class="container">

<h2>BMI Calculator</h2>

<form action="/bmicalculator" method="post">

<input type="text" name="name" placeholder="Enter your name"><br>

<input type="text" name="height" placeholder="Height in meters"><br>

<input type="text" name="weight" placeholder="Weight in kg"><br>

<button type="submit">Calculate BMI</button>

</form>

<div class="result">
${bmiResult}
</div>

</div>

</body>
</html>
`;
}

// Home page
app.get("/", function(req,res){
    res.send(renderPage());
});

// Calculate BMI
app.post("/bmicalculator", function(req,res){

let name = req.body.name;
let height = parseFloat(req.body.height);
let weight = parseFloat(req.body.weight);

let bmi = weight/(height*height);

let category = "";

if (bmi < 18.5){
    category = "Underweight";
}
else if (bmi >= 18.5 && bmi < 25){
    category = "Normal weight";
}
else if (bmi >= 25 && bmi < 30){
    category = "Overweight";
}
else{
    category = "Obese";
}

let result = `
Hello ${name}! <br>
Your BMI is <b>${bmi.toFixed(2)}</b><br>
Category: <b>${category}</b>
`;

res.send(renderPage(result));

});
app.listen(3000,function(){
console.log("Server running on port 3000");
});