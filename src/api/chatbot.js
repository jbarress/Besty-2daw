require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const OPENAI_API_KEY = process.env.ACCES_TOKEN_OPENAI;
const configuration = new Configuration({ apiKey: OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

async function chatbot(question) {
  var respuesta = "";
  var conversation = "";

  conversation += "\nHumano:" + question + "\nBesty:";

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: conversation,
    temperature: 0.9,
    max_tokens: 500,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
  });

  respuesta = response.data.choices[0].text;
  conversation += respuesta;

  console.log(respuesta)
  return respuesta;
}


module.exports = chatbot;