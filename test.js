"use strict";

const request = require('request');

const NULL = null;

// header for prohibiting cache
const headersObj = {};
headersObj["Cache-Control"] = "no-cache, no-store, must-revalidate";

// send post query
function sendPost(url, body, callback) {
    console.log("--------------------");
    console.log("POST");
    console.log("Url: " + url);
    console.log("Body: " + body);

    request.post({
        url: url,
        body: body,
        headers: headersObj,
    }, function (error, response, body) {
        const result = body.toString();
        console.log("Result: " + result);
        callback(result.toString());
    });
}

// send get query
function sendGet(url, callback) {
    console.log("--------------------");
    console.log("GET");
    console.log("Url: " + url);

    request.get({
        url: url,
        body: NULL,
        headers: headersObj,
    }, function (error, response, body) {
        const result = body.toString();
        console.log("Result: " + result);
        callback(result.toString());
    });
}

let express = require('express');
let app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    next();
});

let port = 5006;

app.listen(port);
console.log("Testing server works on port " + port);
console.log("-------------------------------------");
console.log("\n\n");

/////////////////////////////////////////////////////////////////

function equalObjects(normal, testing) {
    for(let key in normal) {
        if(normal[key + ""] !== testing[key + ""]) {
            console.log("Error:");
            console.log("Normal: " + normal[key + ""]);
            console.log("Your answer: " + testing[key + ""]);
            console.log(" ");
            throw new Error("Result Error !!!");
        }
    }
}

function equalArrays(normalArr, testingArr) {
    if(normalArr.length !== testingArr.length) {
        console.log("Error:");
        console.log("Bad length of array");
        console.log(" ");
        throw new Error("Result Error !!!");
    }

    for(let i = 0; i < normalArr.length; i++) {
        if(equalObjects(normalArr[i], testingArr[i]) === false) {
            throw new Error("Result Error !!!");
        }
    }
}

/////////////////////////////////////////////////////////////////

let mainArr = [
    {
        type: "POST",
        url: "/database/clear",
        body: {},
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/subjects/add",
        body: {
            subject: "mathematics",
            description: "mathematics mathematics mathematics"
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/subjects/add",
        body: {
            subject: "russian_language",
            description: "russian_language russian_language russian_language"
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/subjects/add",
        body: {
            subject: "english_language",
            description: "english_language english_language english_language"
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/subjects/add",
        body: {
            subject: "mathematics",
            description: "mathematics subject"
        },
        answer: {
            subject: "mathematics",
            description: "mathematics mathematics mathematics"
        }
    },

    {
        type: "POST",
        url: "/subjects/add",
        body: {
            subject: "russian_language",
            description: "russian_language subject"
        },
        answer: {
            subject: "russian_language",
            description: "russian_language russian_language russian_language"
        }
    },

    {
        type: "POST",
        url: "/subjects/add",
        body: {
            subject: "english_language",
            description: "english_language subject"
        },
        answer: {
            subject: "english_language",
            description: "english_language english_language english_language"
        }
    },

    {
        type: "GET",
        url: "/subjects/get?subject=mathematics",
        answer: {
            subject: "mathematics",
            description: "mathematics mathematics mathematics"
        }
    },

    {
        type: "GET",
        url: "/subjects/get?subject=russian_language",
        answer: {
            subject: "russian_language",
            description: "russian_language russian_language russian_language"
        }
    },

    {
        type: "GET",
        url: "/subjects/get?subject=english_language",
        answer: {
            subject: "english_language",
            description: "english_language english_language english_language"
        }
    },

    {
        type: "GET",
        url: "/subjects/get?subject=history",
        answer: {
            result: "NOT_FOUND",
        }
    },

    {
        type: "GET",
        url: "/subjects/get?subject=biology",
        answer: {
            result: "NOT_FOUND",
        }
    },

    {
        type: "GET",
        url: "/subjects/get/all?sort=1",
        answer: [
            {
                subject: "mathematics",
                description: "mathematics mathematics mathematics"
            },
            {
                subject: "russian_language",
                description: "russian_language russian_language russian_language"
            },
            {
                subject: "english_language",
                description: "english_language english_language english_language"
            },
        ]
    },

    {
        type: "GET",
        url: "/subjects/get/all?sort=0",
        answer: [
            {
                subject: "english_language",
                description: "english_language english_language english_language"
            },
            {
                subject: "russian_language",
                description: "russian_language russian_language russian_language"
            },
            {
                subject: "mathematics",
                description: "mathematics mathematics mathematics"
            },
        ]
    },

    {
        type: "GET",
        url: "/pupils/get/count",
        answer: {
            count: 0,
        }
    },

    {
        type: "POST",
        url: "/pupils/add",
        body: {
            nickname: "Maxim",
            age: 21,
        },
        answer: {
            result: "OK"
        }
    },

    {
        type: "GET",
        url: "/pupils/get/count",
        answer: {
            count: 1,
        }
    },

    {
        type: "POST",
        url: "/pupils/add",
        body: {
            nickname: "Nina",
            age: 18,
        },
        answer: {
            result: "OK"
        }
    },

    {
        type: "GET",
        url: "/pupils/get/count",
        answer: {
            count: 2,
        }
    },

    {
        type: "POST",
        url: "/pupils/add",
        body: {
            nickname: "Nina",
            age: 25,
        },
        answer: {
            nickname: "Nina",
            age: 18,
        }
    },

    {
        type: "POST",
        url: "/pupils/add",
        body: {
            nickname: "Maxim",
            age: 14,
        },
        answer: {
            nickname: "Maxim",
            age: 21,
        }
    },

    {
        type: "GET",
        url: "/pupils/get/count",
        answer: {
            count: 2,
        }
    },

    {
        type: "POST",
        url: "/pupils/add",
        body: {
            nickname: "Alex",
            age: 17,
        },
        answer: {
            result: "OK"
        }
    },

    {
        type: "POST",
        url: "/pupils/add",
        body: {
            nickname: "Peter",
            age: 14,
        },
        answer: {
            result: "OK"
        }
    },

    {
        type: "POST",
        url: "/pupils/add",
        body: {
            nickname: "Ann",
            age: 24,
        },
        answer: {
            result: "OK"
        }
    },

    {
        type: "GET",
        url: "/pupils/get/count",
        answer: {
            count: 5,
        }
    },

    {
        type: "GET",
        url: "/pupils/get/all?sort=1",
        answer: [
            {
                nickname: "Maxim",
                age: 21,
            },
            {
                nickname: "Nina",
                age: 18,
            },
            {
                nickname: "Alex",
                age: 17,
            },
            {
                nickname: "Peter",
                age: 14,
            },
            {
                nickname: "Ann",
                age: 24,
            }
        ]
    },

    {
        type: "GET",
        url: "/pupils/get/all?sort=0",
        answer: [
            {
                nickname: "Ann",
                age: 24,
            },
            {
                nickname: "Peter",
                age: 14,
            },
            {
                nickname: "Alex",
                age: 17,
            },
            {
                nickname: "Nina",
                age: 18,
            },
            {
                nickname: "Maxim",
                age: 21,
            },
        ]
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Maxim",
            subject: "mathematics",
            mark: 5,
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Maxim",
            subject: "mathematics",
            mark: 5,
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Maxim",
            subject: "mathematics",
            mark: 3,
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Maxim",
            subject: "mathematics",
            mark: 3,
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Maxim",
            subject: "mathematics",
            mark: 4,
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Maxim",
            subject: "mathematics",
            mark: 4,
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Maxim",
            subject: "english_language",
            mark: 4,
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Maxim",
            subject: "english_language",
            mark: 5,
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Maxim",
            subject: "english_language",
            mark: 5,
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Maxim",
            subject: "english_language",
            mark: 4,
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Ann",
            subject: "russian_language",
            mark: 4,
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Ann",
            subject: "russian_language",
            mark: 4,
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Ann",
            subject: "russian_language",
            mark: 4,
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Ann",
            subject: "mathematics",
            mark: 2,
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Ann",
            subject: "mathematics",
            mark: 3,
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Ann",
            subject: "mathematics",
            mark: 2,
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Ann",
            subject: "mathematics",
            mark: 3,
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Ann",
            subject: "mathematics",
            mark: 2,
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "George",
            subject: "mathematics",
            mark: 4,
        },
        answer: {
            result: "BAD_NICKNAME_OR_SUBJECT",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Bill",
            subject: "mathematics",
            mark: 4,
        },
        answer: {
            result: "BAD_NICKNAME_OR_SUBJECT",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Nina",
            subject: "history",
            mark: 4,
        },
        answer: {
            result: "BAD_NICKNAME_OR_SUBJECT",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Peter",
            subject: "history",
            mark: 4,
        },
        answer: {
            result: "BAD_NICKNAME_OR_SUBJECT",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "George",
            subject: "history",
            mark: 4,
        },
        answer: {
            result: "BAD_NICKNAME_OR_SUBJECT",
        }
    },

    {
        type: "GET",
        url: "/marks/get?nickname=Maxim&subject=mathematics&sort=1",
        answer: [
            {
                mark: 5,
            },
            {
                mark: 5,
            },
            {
                mark: 3,
            },
            {
                mark: 3,
            },
            {
                mark: 4,
            },
            {
                mark: 4,
            },
        ]
    },

    {
        type: "GET",
        url: "/marks/get?nickname=Maxim&subject=mathematics&sort=0",
        answer: [
            {
                mark: 4,
            },
            {
                mark: 4,
            },
            {
                mark: 3,
            },
            {
                mark: 3,
            },
            {
                mark: 5,
            },
            {
                mark: 5,
            },
        ]
    },

    {
        type: "GET",
        url: "/marks/get?nickname=Maxim&subject=english_language&sort=1",
        answer: [
            {
                mark: 4,
            },
            {
                mark: 5,
            },
            {
                mark: 5,
            },
            {
                mark: 4,
            },
        ]
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Maxim",
            subject: "english_language",
            mark: 4,
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "GET",
        url: "/marks/get?nickname=Maxim&subject=english_language&sort=1",
        answer: [
            {
                mark: 4,
            },
            {
                mark: 5,
            },
            {
                mark: 5,
            },
            {
                mark: 4,
            },
            {
                mark: 4,
            },
        ]
    },

    {
        type: "GET",
        url: "/marks/get?nickname=Maxim&subject=english_language&sort=0",
        answer: [
            {
                mark: 4,
            },
            {
                mark: 4,
            },
            {
                mark: 5,
            },
            {
                mark: 5,
            },
            {
                mark: 4,
            },
        ]
    },

    {
        type: "GET",
        url: "/marks/get?nickname=Maxim&subject=russian_language&sort=1",
        answer: [],
    },

    {
        type: "GET",
        url: "/marks/get?nickname=Maxim&subject=russian_language&sort=0",
        answer: [],
    },

    {
        type: "GET",
        url: "/marks/get?nickname=Ann&subject=russian_language&sort=1",
        answer: [
            {
                mark: 4,
            },
            {
                mark: 4,
            },
            {
                mark: 4,
            },
        ],
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Ann",
            subject: "russian_language",
            mark: 2,
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "GET",
        url: "/marks/get?nickname=Ann&subject=russian_language&sort=1",
        answer: [
            {
                mark: 4,
            },
            {
                mark: 4,
            },
            {
                mark: 4,
            },
            {
                mark: 2,
            },
        ],
    },

    {
        type: "GET",
        url: "/marks/get?nickname=Ann&subject=russian_language&sort=0",
        answer: [
            {
                mark: 2,
            },
            {
                mark: 4,
            },
            {
                mark: 4,
            },
            {
                mark: 4,
            },
        ],
    },

    {
        type: "GET",
        url: "/marks/get?nickname=Ann&subject=mathematics&sort=1",
        answer: [
            {
                mark: 2,
            },
            {
                mark: 3,
            },
            {
                mark: 2,
            },
            {
                mark: 3,
            },
            {
                mark: 2,
            },
        ],
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Ann",
            subject: "mathematics",
            mark: 5,
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Ann",
            subject: "mathematics",
            mark: 5,
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/marks/add",
        body: {
            nickname: "Ann",
            subject: "mathematics",
            mark: 5,
        },
        answer: {
            result: "OK",
        }
    },

    {
        type: "GET",
        url: "/marks/get?nickname=Ann&subject=mathematics&sort=1",
        answer: [
            {
                mark: 2,
            },
            {
                mark: 3,
            },
            {
                mark: 2,
            },
            {
                mark: 3,
            },
            {
                mark: 2,
            },
            {
                mark: 5,
            },
            {
                mark: 5,
            },
            {
                mark: 5,
            },
        ],
    },

    {
        type: "GET",
        url: "/marks/get?nickname=Ann&subject=mathematics&sort=0",
        answer: [
            {
                mark: 5,
            },
            {
                mark: 5,
            },
            {
                mark: 5,
            },
            {
                mark: 2,
            },
            {
                mark: 3,
            },
            {
                mark: 2,
            },
            {
                mark: 3,
            },
            {
                mark: 2,
            },
        ],
    },

    {
        type: "POST",
        url: "/database/clear",
        body: {},
        answer: {
            result: "OK",
        }
    },

    {
        type: "POST",
        url: "/pupils/add",
        body: {
            nickname: "George",
            age: 12,
        },
        answer: {
            result: "OK"
        }
    },

    {
        type: "GET",
        url: "/pupils/get/count",
        answer: {
            count: 1,
        }
    },

    {
        type: "POST",
        url: "/database/clear",
        body: {},
        answer: {
            result: "OK",
        }
    },

    {
        type: "GET",
        url: "/pupils/get/count",
        answer: {
            count: 0,
        }
    },
];

/////////////////////////////////////////////////////////////////

let wait = false;
let i = 0;

function main() {
    if(wait === false) {
        wait = true;
        const query = mainArr[i];

        if(query.type === "GET") {
            const url = "http://localhost:5007" + query.url;

            sendGet(url, (result) => {
                if(Array.isArray(query.answer) === true) {
                    equalArrays(query.answer, JSON.parse(result));
                    console.log("Test OK");
                    wait = false;
                } else {
                    equalObjects(query.answer, JSON.parse(result));
                    console.log("Test OK");
                    wait = false;
                }

                i += 1;

                if(i === mainArr.length) {
                    console.log("----------------------------");
                    console.log("All tests OK");
                    clearInterval(testInterval);
                }
            });
        }

        if(query.type === "POST") {
            const url = "http://localhost:5007" + query.url;
            const bodyString = JSON.stringify(query.body);

            sendPost(url, bodyString, (result) => {
               if(Array.isArray(query.answer) === true) {
                   equalArrays(query.answer, JSON.parse(result));
                   console.log("Test OK");
                   wait = false;
               } else {
                   equalObjects(query.answer, JSON.parse(result));
                   console.log("Test OK");
                   wait = false;
               }

               i += 1;

               if(i === mainArr.length) {
                   console.log("----------------------------");
                   console.log("All tests OK");
                   clearInterval(testInterval);
               }
            });
        }
    }
}

let testInterval = setInterval(() => {
    main();
}, 10);

