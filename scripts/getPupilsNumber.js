"use strict";

import makeQuery from "./makeQuery";

export default function getPupilsNumber(response) {
    makeQuery(" SELECT COUNT(*) AS value FROM pupils; ", (arr) => {
        const result = parseInt(arr[0].value);
        response.end(JSON.stringify({
            count: result,
        }));
    });
}
