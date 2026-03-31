const ResponseFormat = (isError = false, message = "", data = null) => {
    return {
        isError: isError,
        message: message,
        data: data
    };
}

module.exports.ResponseFormat = ResponseFormat