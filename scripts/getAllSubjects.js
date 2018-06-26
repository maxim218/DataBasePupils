"use strict";

import makeQuery from "./makeQuery";

export default function getAllSubjects(response, dictionary) {
    const sort = parseInt(dictionary["sort"]);
    let query = "SELECT subject, description FROM subjects ORDER BY subject_id ";

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
