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

//Create a middleware function that responds to the hello route request and a query parameter
const sayHello = (req, res) => {
    console.log(req.query);
    const name = req.query.name;
    const content = name ? `Hello, ${name}!` : "Hello!";
    res.send(content);
};

//Create a middleware function that responds to the :greeting route parameter
const saySomething = (req, res) => {
    const greeting = req.params.greeting;
    const name = req.query.name;

    const content = greeting && name ? `${greeting},  ${name}!` : `${greeting}`;
    res.send(content);
}

//Create a middleware function to say goodbye, no params
const sayGoodbye = (req, res) => {
    res.send("Sorry to see you go!");
}

//Router-level middleware check
const checkAbbreviationLength = (req, res, next) => {
    const abbreviation = req.params.abbreviation;
    if (abbreviation.length !== 2) {
        next(`State abbreviation ${abbreviation} is invalid.` );
    } else {
        next();
    }
}

//Switch the sayHello function to be invoked at a specific route
app.get("/hello", sayHello);

//Place the goodbye invocation before the parameter invocation to avoid matching the route parameter
app.get("/say/goodbye", sayGoodbye);

//Use the saySomething function at route with params
app.get("/say/:greeting", saySomething);


//ABBREVIATIONS
//Abbreviation handler
app.get(
    "/states/:abbreviation", 
    checkAbbreviationLength,
    (req, res, next) => {
    const abbreviation = req.params.abbreviation;
    
    res.send(`${abbreviation} is a nice state. I would love to visit!`);
    });

//Travel abbreviation
app.get(
    "/travel/:abbreviation", 
    checkAbbreviationLength,
    (req, res, next) => {
    const abbreviation = req.params.abbreviation;
    
        res.send(`Enjoy your trip to ${abbreviation}!`)
    });

//Not-found middleware handler
app.use((req, res, next) => {
    res.send(`Sorry! The route ${req.path} does not exist!`);
});

//Error handler
app.use((error, req, res, next) => {
    console.error(error);
    res.send(error);
})


//ORIGINAL USE CALLS

//Use the sayHello middleware function
//app.use(sayHello);

//Use the logging middleware function, which will not be used unless the sayHello has a next();
//app.use(logging);

app.use(morgan("dev"));
module.exports = app;