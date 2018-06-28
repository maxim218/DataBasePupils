"use strict";

import initDatabase from "./initDatabase";
import addSubject from "./addSubject";
import getSubject from "./getSubject";
import getAllSubjects from "./getAllSubjects";
import addPupil from "./addPupil";
import getAllPupils from "./getAllPupils";
import getPupilsNumber from "./getPupilsNumber";

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

        if(url === "/subjects/get/all") {
            getAllSubjects(response, dictionary);
            return null;
        }

        if(url === "/pupils/get/all") {
            getAllPupils(response, dictionary);
            return null;
        }

        if(url === "/pupils/get/count") {
            getPupilsNumber(response);
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

            let bodyObj = undefined;

            try {
                bodyObj = JSON.parse(body);
            } catch (err) {
                response.end(JSON.stringify({
                    message: "JSON_ERROR",
                }));
                // stop function
                return null;
            }

            if(request.url === "/database/clear") {
                initDatabase(pg, fs, response);
                return null;
            }

            if(request.url === "/subjects/add") {
                addSubject(response, bodyObj);
                return null;
            }

            if(request.url === "/pupils/add") {
                addPupil(response, bodyObj);
                return null;
            }
        });
    });
}
