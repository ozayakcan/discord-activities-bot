require('dotenv').config();
const commandsJs = require("./src/commands/commands");
const strings = require("./src/strings.json");
const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_VOICE_STATES]
});
const DiscordActivity = require('./src/discord-activity.js');
client.discordActivity = new DiscordActivity(client);

client.on('ready', () => {
    console.log(strings.readyMsg.replace(`{botTag}`, `${client.user.tag}`));
    client.user.setActivity("/" + strings.helpCommand, { type: "WATCHING" });
});
client.on('guildCreate', async g => {
    commandsJs.setGuildCommands(g.id);
})
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    //const guild = client.guilds.cache.get(interaction.guild_id)
    let user = await interaction.member.fetch();
    let channel = await user.voice.channel;
    let guild = await interaction.guild;
    if (interaction.commandName === strings.eventCommand) {
        if (!channel) {
            await interaction.reply(strings.youMustBeInVoiceChannel);
        } else {
            const string = interaction.options.getString(strings.type);
            switch (string) {
                case strings.watchTogetherValue:
                    client.discordActivity.createActivityCode(channel.id, 'youtube').then(async invite => {
                        return await interaction.reply(strings.youtubeMsg.replace(`{user}`, `${interaction.member}`).replace(`{inviteCode}`, `${invite.code}`));
                    });
                    break;
                case strings.sketchheadsValue:
                    client.discordActivity.createActivityCode(channel.id, 'sketchheads').then(async invite => {
                        return await interaction.reply(strings.sketchheadsMsg.replace(`{user}`, `${interaction.member}`).replace(`{inviteCode}`, `${invite.code}`));
                    });
                    break;
                case strings.chessValue:
                    client.discordActivity.createActivityCode(channel.id, 'chess').then(async invite => {
                        return await interaction.reply(strings.chessMsg.replace(`{user}`, `${interaction.member}`).replace(`{inviteCode}`, `${invite.code}`));
                    });
                    break;
                default:
                    await interaction.reply(strings.typeNotSpecified);
                    break;
            }

        }
    } else if (interaction.commandName === strings.helpCommand) {
        await interaction.reply(strings.helpResp);
    } else if (interaction.commandName === strings.refreshCommand) {
        await commandsJs.guildCommandsRest(guild.id).then(async () => {
            await interaction.reply(strings.refreshSuccess);
        })
            .catch(async () => {
                {
                    await interaction.reply(strings.refreshSuccess);
                }
            });

    }
});
require('./src/server')();
client.login(process.env.discordBotToken);