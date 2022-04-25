require('dotenv').config();

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const config = require("./config.json");

const eventCommand = new SlashCommandBuilder()
	.setName(config.eventCommand)
	.setDescription(config.eventCommandDesc)
	.addStringOption(option =>
		option.setName(config.type)
			.setDescription(config.typeDesc)
			.setRequired(true).addChoices({
				name: config.watchTogetherDesc,
				value: config.watchTogetherName
			}));

const commands = [
	eventCommand
].map(command => command.toJSON());;

const rest = new REST({ version: '9' }).setToken(process.env.discordBotToken);


rest.put(Routes.applicationCommands(process.env.discordBotClientID), { body: commands })
	.then(() => console.log(config.commandsUpdatedSuccess))
	.catch(console.error);