require('dotenv').config();

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const globalStrs = require("./lang/global.json");

function activityCommand(lang) {
	return new SlashCommandBuilder()
		.setName(lang.eventCommand)
		.setDescription(lang.eventCommandDesc)
		.addStringOption(option =>
			option.setName(lang.type)
				.setDescription(lang.typeDesc)
				.setRequired(true).addChoices({
					name: lang.watchTogetherDesc,
					value: lang.watchTogetherName
				}));
}
function helpCommand(lang) {
	return new SlashCommandBuilder()
		.setName(globalStrs.helpCommand)
		.setDescription(lang.helpDesc);
}
function guildCommands(lang) {
	return [
		activityCommand(lang),
		helpCommand(lang)
	].map(command => command.toJSON());
}
const langCommand = new SlashCommandBuilder()
	.setName(globalStrs.langCommand)
	.setDescription(globalStrs.langCommandDesc)
	.addStringOption(option =>
		option.setName(globalStrs.langCommand)
			.setDescription(globalStrs.langCommandDesc)
			.setRequired(true).addChoices({
				name: "English",
				value: "en"
			}, {
				name: "Türkçe",
				value: "tr"
			}));
const applicationCommands = [
	langCommand
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.discordBotToken);

function setApplicationCommands() {
	rest.put(Routes.applicationCommands(process.env.discordBotClientID), { body: applicationCommands })
		.then(() => console.log(globalStrs.appCommandsUpdatedSuccess))
		.catch(console.error);
}
function setGuildCommands(guild_id, lang) {
	rest.put(Routes.applicationGuildCommands(process.env.discordBotClientID, guild_id), { body: guildCommands(lang) })
		.then(() => console.log(globalStrs.guildCommandsUpdatedSuccess))
		.catch(console.error);
}
function resetGuildCommands(guild_id) {
	rest.get(Routes.applicationGuildCommands(process.env.discordBotClientID, guild_id))
		.then(data => {
			const promises = [];
			for (const command of data) {
				const deleteUrl = `${Routes.applicationGuildCommands(process.env.discordBotClientID, guild_id)}/${command.id}`;
				promises.push(rest.delete(deleteUrl));
			}
			return Promise.all(promises);
		}).catch(console.error);
}

module.exports = {
	setApplicationCommands: setApplicationCommands,
	setGuildCommands: setGuildCommands,
	resetGuildCommands: resetGuildCommands,
};