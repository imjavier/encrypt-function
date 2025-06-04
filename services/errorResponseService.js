export default getErrorResponse = (errorMessage, code) => ({
        statusCode: code,
        body: JSON.stringify({ error: errorMessage })
})

