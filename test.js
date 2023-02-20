const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
var fs = require('fs');


async function helloWorld() {
  const configuration = new Configuration({
    apiKey: process.env.KEY,
  });
  const openai = new OpenAIApi(configuration);
  try {
    const completion = await openai.createCompletion({
      model: "text-curie-001",
      prompt: "how tall is the eiffel tower",
    });
    console.log(completion.data.choices[0]);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

helloWorld()