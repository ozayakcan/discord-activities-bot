require('dotenv').config();

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const strings = require("../strings.json");

const guildCommands = [

].map(command => command.toJSON());
const activityCommand = new SlashCommandBuilder()
	.setName(strings.eventCommand)
	.setDescription(strings.eventCommandDesc)
	.addStringOption(option =>
		option.setName(strings.type)
			.setDescription(strings.typeDesc)
			.setRequired(true).addChoices({
				name: strings.watchTogetherName,
				value: strings.watchTogetherValue
			}));
const helpCommand = new SlashCommandBuilder()
	.setName(strings.helpCommand)
	.setDescription(strings.helpCommandDesc);
const refreshCommand = new SlashCommandBuilder()
	.setName(strings.refreshCommand)
	.setDescription(strings.refreshCommandDesc);
const applicationCommands = [
	activityCommand,
	helpCommand,
	refreshCommand
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.discordBotToken);

async function setApplicationCommands() {
	await rest.put(Routes.applicationCommands(process.env.discordBotClientID), { body: applicationCommands })
		.then(() => console.log(strings.appCommandsUpdatedSuccess))
		.catch(console.error);
}
async function guildCommandsRest(guild_id) {
	return await rest.put(Routes.applicationGuildCommands(process.env.discordBotClientID, guild_id), { body: guildCommands });
}
async function setGuildCommands(guild_id) {
	await guildCommandsRest(guild_id)
		.then(() => console.log(strings.guildCommandsUpdatedSuccess))
		.catch(console.error);
}

module.exports = {
	setApplicationCommands: setApplicationCommands,
	guildCommandsRest: guildCommandsRest,
	setGuildCommands: setGuildCommands,
};