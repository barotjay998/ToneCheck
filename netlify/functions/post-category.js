const axios = require('axios');

exports.handler = async function(event) {
  try {
    const { categoryId } = JSON.parse(event.body);
    const scriptId = 'AKfycbwdQtLISbUFVmQdOjzZJoyjvLVBecpRHDf3x9paTzViLPzAXJLTB21r0poDNRoFV0yC';
    const response = await axios.post('https://script.google.com/macros/s/' + scriptId + '/exec', { categoryId });
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
      body: error.response ? JSON.stringify(error.response.data) : error.toString()
    };
  }
};
