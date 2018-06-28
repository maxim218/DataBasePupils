"use strict";

import makeQuery from "./makeQuery";

export default function getAllPupils(response, dictionary) {
    const sort = parseInt(dictionary['sort']);

    let query = " SELECT nickname, age FROM pupils ORDER BY pupil_id ";

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
