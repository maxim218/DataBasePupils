"use strict";

import makeQuery from "./makeQuery";

export default function addPupil(response, bodyObj) {
    const nickname = bodyObj.nickname.toString();
    const age = parseInt(bodyObj.age);

    makeQuery("SELECT nickname, age FROM pupils WHERE nickname = '" + nickname + "' LIMIT 1;", (arr) => {
        if(arr.length > 0) {
            const answer = arr[0];
            response.end(JSON.stringify(answer));
        } else {
            makeQuery("INSERT INTO pupils (nickname, age) VALUES ('" + nickname + "', " + age + ");", () => {
                response.end(JSON.stringify({
                    result: "OK"
                }));
            });
        }
    });
}
