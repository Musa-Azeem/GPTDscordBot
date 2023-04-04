const { Client, Events, GatewayIntentBits } = require('discord.js');
const sendPromptToGPT = require('./utils/sendPromptToGPT')
require('dotenv').config();


// Create a new client instance
const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMembers,
] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('messageCreate', async (msg) => {
	const content = msg.content
	if (content.startsWith('/gpt')) {
		prompt = content.substring(5)
		console.log(`\n\nPrompt ${prompt}`)

		gptRes = await sendPromptToGPT(prompt)
		msg.reply(gptRes)
		console.log(`Response: ${gptRes}`)
	}
});


// Log in to Discord with token
client.login(process.env.BOT_TOKEN);