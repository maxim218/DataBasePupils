"use strict";

import makeQuery from "./makeQuery";

export default function addMark(response, bodyObj) {
    const nickname = bodyObj.nickname.toString();
    const subject = bodyObj.subject.toString();
    const mark = parseInt(bodyObj.mark);

    makeQuery("SELECT nickname FROM pupils WHERE nickname = '" + nickname + "' LIMIT 1; ", (first) => {
        makeQuery("SELECT subject FROM subjects WHERE subject = '" + subject + "' LIMIT 1; ", (second) => {
            if(first.length === 0 || second.length === 0) {
                response.end(JSON.stringify({
                    result: "BAD_NICKNAME_OR_SUBJECT",
                }));
            } else {
                makeQuery(" INSERT INTO marks (nickname, subject, mark) VALUES ('" + nickname + "', '" + subject + "', " + mark + "); ", () => {
                   response.end(JSON.stringify({
                       result: "OK",
                   }));
                });
            }
        });
    });
}
