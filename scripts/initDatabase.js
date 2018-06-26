"use strict";

import makeQuery from "./makeQuery";

export default function initDatabase(pg, fs, response) {
    fs.readFile('sqlCode.sql', 'utf8', (err, content) => {
        const sqlCode = content.toString();
        makeQuery(sqlCode, () => {
           response.end(JSON.stringify({
               result: "OK"
           }));
        });
    });
}
