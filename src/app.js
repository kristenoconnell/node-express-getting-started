//import Express as a framework
const express = require("express");
const morgan = require("morgan");
//Express exports a function
//Assign this function to a variable for use throughout the project
const app = express();

//Create a middleware function that simply logs when a request is made and then moves on to the next function (no response from server)
/*const logging = (req, res, next) => {
    console.log("A request is being made!");
    next();
};*/

//Create a middleware function that responds to the hello route request by saying "Hello"!, and responds with the query paramater "name" when there is a name in query
const sayHello = (req, res) => {
    console.log(req.query);
    const name = req.query.name;
    const content = name ? `Hello, ${name}!` : "Hello!";
    res.send(content);
};

//Create a middleware function that responds to the Greeting route parameter
const saySomething = (req, res) => {
    const greeting = req.params.greeting;
    const content = `${greeting}!`;
    res.send(content);
}
//Use the sayHello middleware function
//app.use(sayHello);

//Use the saySomething function at route with params
app.get("/say/:greeting", saySomething);

//Switch the sayHello function to be invoked at a specific route
app.get("/hello", sayHello);

//Use the logging middleware function, which will not be used unless the sayHello has a next();
//app.use(logging);

app.use(morgan("dev"));
module.exports = app;