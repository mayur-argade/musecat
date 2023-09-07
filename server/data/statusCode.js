module.exports = {
    BAD_REQUEST: { code: 400, message: 'Bad Request' },
    UNAUTHORIZED: { code: 401,message: 'Unauthorized' },
    FORBIDDEN: { code: 403, message: 'Forbidden' },
    NOT_FOUND: { code: 404, message: 'Not Found' },
    INTERNAL_SERVER_ERROR: { code: 500, message: 'Internal Server Error' },
    SUCCESS: {code: 200, message: 'Success'},
    CONFLICT: {code: 409, message: "Already Exist"},
    NO_CONTENT: {code: 204, message: "No content"}
    // ...add more custom status codes here
};