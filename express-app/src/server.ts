import express from "express";

const port = 3000;

const app = express();

app.get("/", (request, response) => response.send("Hello World!") );

app.listen( port, () => console.log("Listening to port: " + port ) );