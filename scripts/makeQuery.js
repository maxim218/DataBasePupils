"use strict";

let pg = null;
eval("    pg = require('pg');              ");

function createNewClient() {
    return new pg.Client({
        user: 'postgres',
        host: 'localhost',
        database: 'bbb',
        password: '12345',
        port: 5432
    });
}

export default function makeQuery(query, callback) {
    // create client
    const client = createNewClient();
    // connect with database
    client.connect();
    // send query to database
    client.query(query, (err, res) => {
        // save result
        const arr = res.rows;
        // close connection
        client.end();
        // call callback function
        callback(arr);
    });
}
