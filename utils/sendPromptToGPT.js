const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

module.exports = async function sendPromptToGPT(prompt) {
  const configuration = new Configuration({
    apiKey: process.env.AI_KEY,
  });

  const openai = new OpenAIApi(configuration);
  try {
    const completion = await openai.createCompletion({
      model: "text-curie-001",
      prompt: prompt,
      max_tokens: 1800
    });
    return completion.data.choices[0].text;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    return "Error"
  }
}
