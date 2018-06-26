"use strict";

import catchQueries from "./catchQueries";

const PORT = 5007;

function startApplication() {
    let express = null;
    let app = null;
    let pg = null;
    let fs = null;
    eval("    express = require('express');    ");
    eval("    app = express();                 ");
    eval("    pg = require('pg');              ");
    eval("    fs = require('fs');              ");

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        next();
    });

    let port = PORT;
    app.listen(port);
    console.log("Server works on port " + port);
    console.log("-------------------------------------");
    console.log("\n\n");

    catchQueries(app, pg, fs);
}

startApplication();
