const express = require("express");
const logger = require("./logger");
const app = express();
const router = require("./routers/router");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(require("cors")());
app.use(logger);
app.use("/products",router);

app.listen(4000,()=>{
    console.log("Server started listening on port 4000");
});
