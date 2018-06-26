"use strict";

import makeQuery from "./makeQuery";

export default function addSubject(response, bodyObj) {
    const subject = bodyObj.subject;
    const description = bodyObj.description;

    makeQuery("SELECT subject, description FROM subjects WHERE subject = '" + subject + "';", (arr) => {
       if(arr.length > 0) {
           const ans = arr[0];
           response.end(JSON.stringify(ans));
       } else {
           makeQuery("INSERT INTO subjects (subject, description) VALUES ('" + subject + "', '" + description + "');", () => {
               response.end(JSON.stringify({
                   result: "OK"
               }));
           });
       }
    });
}