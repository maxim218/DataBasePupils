"use strict";

import makeQuery from "./makeQuery";

export default function getMarks(response, dictionary) {
    const nickname = dictionary.nickname.toString();
    const subject = dictionary.subject.toString();
    const sort = parseInt(dictionary['sort']);

    let query = " SELECT mark FROM marks WHERE nickname = '" + nickname + "' AND subject = '" + subject + "' ORDER BY mark_id ";

    if(sort === 1) {
        query += " ASC ";
    }

    if(sort === 0) {
        query += " DESC ";
    }

    query += " ; ";

    makeQuery(query, (arr) => {
       response.end(JSON.stringify(arr));
    });
}
