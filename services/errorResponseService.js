const getErrorResponse = (errorMessage, code) => ({
        statusCode: code,
        body: JSON.stringify({ error: errorMessage })
})

export default getErrorResponse;
