const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const ping = require('./commands/ping.js')
require('dotenv').config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.commands = new Collection();
client.commands.set(ping.data.name, ping);

// Handle interaction event
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
	console.log(interaction);

  if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});


// Log in to Discord with your client's token
client.login(process.env.BOT_TOKEN);