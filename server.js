var express = require("express");

var app = express();

var PORT = process.env.port || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./apiRoutes.js")(map);
require("./htmlRoutes.js")(map);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});