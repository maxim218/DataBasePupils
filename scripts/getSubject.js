"use strict";

import makeQuery from "./makeQuery";

export default function getSubject(response, dictionary) {
    const subject = dictionary.subject.toString();
    makeQuery("SELECT subject, description FROM subjects WHERE subject = '" + subject + "' LIMIT 1;", (arr) => {
        if(arr.length === 0) {
            response.end(JSON.stringify({
                result: "NOT_FOUND"
            }));
        } else {
            const ans = arr[0];
            response.end(JSON.stringify(ans));
        }
    });
}
