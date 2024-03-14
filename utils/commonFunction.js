const createResponse = (statusCode, body) => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow requests from any origin
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(body),
  };
};

module.exports = {
  createResponse,
};
