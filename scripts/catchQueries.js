"use strict";

import initDatabase from "./initDatabase";
import addSubject from "./addSubject";
import getSubject from "./getSubject";

export default function catchQueries(app, pg, fs) {
    app.get('/*', (request, response) => {
        console.log("-------------------------------");
        console.log("GET");
        console.log("Url: " + request.url);

        const url = request.url.split("?")[0].toString();

        const dictionary = request.query;

        if(url === "/subjects/get") {
            getSubject(response, dictionary);
            return null;
        }
    });

    app.post('/*', (request, response) => {
        console.log("-------------------------------");
        console.log("POST");
        console.log("Url: " + request.url);

        let body = "";
        request.on('data', (data) => {
            body += data.toString();
        }).on('end', () => {
            console.log("Body: " + body);

            const bodyObj = JSON.parse(body);

            if(request.url === "/database/clear") {
                initDatabase(pg, fs, response);
                return null;
            }

            if(request.url = "/subjects/add") {
                addSubject(response, bodyObj);
                return null;
            }
        });
    });
}