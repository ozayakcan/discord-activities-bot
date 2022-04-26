require('dotenv').config();
const langJs = require("./src/lang");
const commandsJs = require("./src/commands/commands");
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
const globalStrs = require("./src/lang/global.json");

client.on('ready', () => {
    console.log(globalStrs.readyMsg.replace(`{botTag}`, `${client.user.tag}`));
    client.user.setActivity("/" + globalStrs.helpCommand, { type: "WATCHING" });
});
client.on('guildCreate', async g => {
    let lang = langJs.getLanguage(g.id);
    commandsJs.setGuildCommands(g.id, lang);
})
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    //const guild = client.guilds.cache.get(interaction.guild_id)
    let user = await interaction.member.fetch();
    let channel = await user.voice.channel;
    let guild = await interaction.guild;
    let lang = langJs.getLanguage(guild.id);
    if (interaction.commandName === lang.eventCommand) {
        if (!channel) {
            await interaction.reply(lang.youMustBeInVoiceChannel);
        } else {
            const string = interaction.options.getString(lang.type);
            switch (string) {
                case globalStrs.watchTogetherValue:
                    client.discordActivity.createActivityCode(channel.id, 'youtube').then(async invite => {
                        return await interaction.reply(lang.youtubeMsg.replace(`{user}`, `${interaction.member}`).replace(`{inviteCode}`, `${invite.code}`));
                    });
                    break;
                default:
                    await interaction.reply(lang.typeNotSpecified);
                    break;
            }

        }
    } else if (interaction.commandName === globalStrs.langCommand) {
        const string = interaction.options.getString(globalStrs.langCommand);
        let languageStr = "en";
        if (string == "en" || string == "tr") {
            languageStr = string;
        }
        lang = langJs.setLanguage(guild.id, languageStr);
        //commandsJs.resetGuildCommands(guild.id);
        commandsJs.setGuildCommands(guild.id, lang);
        await interaction.reply(lang.langSuccess);
    } else if (interaction.commandName === globalStrs.helpCommand) {
        await interaction.reply(lang.helpResp);
    } else if (interaction.commandName === lang.refreshCommand) {
        commandsJs.guildCommandsRest(guild.id, lang).then(async () => {
            await interaction.reply(lang.refreshSuccess);
        })
            .catch(async () => {
                {
                    await interaction.reply(lang.refreshSuccess);
                }
            });

    }
});
require('./src/server')();
client.login(process.env.discordBotToken);