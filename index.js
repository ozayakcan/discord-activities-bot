require('dotenv').config();

const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_VOICE_STATES]
});
const { DiscordTogether } = require('discord-together');
client.discordTogether = new DiscordTogether(client);
const config = require("./config.json");

client.on('ready', () => {
    console.log(config.readyMsg.replace(`{botTag}`, `${client.user.tag}`));
});
client.on('guildCreate', async g => {

})
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    //const guild = client.guilds.cache.get(interaction.guild_id)
    let user = await interaction.member.fetch();
    let channel = await user.voice.channel;
    if (interaction.commandName === config.eventCommand) {
        if (!channel) {
            await interaction.reply(config.youMustBeInVoiceChannel);
        } else {
            const string = interaction.options.getString(config.type);
            switch (string) {
                case config.watchTogetherName:
                    client.discordTogether.createTogetherCode(channel.id, 'youtube').then(async invite => {
                        return await interaction.reply(config.youtubeMsg.replace(`{user}`, `${interaction.member}`).replace(`{inviteCode}`, `${invite.code}`));
                    });
                    break;
                default:
                    await interaction.reply(config.typeNotSpecified);
                    break;
            }

        }
    }
});
require('./server')();
client.login(process.env.discordBotToken);