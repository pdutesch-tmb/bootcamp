const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    console.info("EVENT\n" + JSON.stringify(event, null, 2))
    let body;
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
    };
    try {
        let result;
        let queryParams = JSON.parse(JSON.stringify(event.queryStringParameters));
        if (queryParams.hasOwnProperty('first')) {
            if (queryParams.hasOwnProperty('second')) {
                result = +queryParams.first + +queryParams.second;
            } else {
                result = +queryParams.first + +10;
            }
        } else {
            result = -1;
        }
        body = "Sum: " + result;
    } catch (err) {
        statusCode = '400';
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};
