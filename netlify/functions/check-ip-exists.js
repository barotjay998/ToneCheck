const axios = require('axios');

exports.handler = async function(event, context) {
  try {
    const ipAddress = event.queryStringParameters.ipAddress;
    const response = await axios.get(`https://script.google.com/macros/s/AKfycbwMHZFn8gPLl5_RwsKi1f54FZRssyuqV-L_KuwyuFW8NJ0p4nhjkL4Z3w7fdlS6Sbox4A/exec?ipAddress=${ipAddress}`);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
      body: error.response ? error.response.data : error.toString()
    };
  }
};
