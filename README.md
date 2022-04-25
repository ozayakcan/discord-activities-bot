# discord-activities-bot
Activities for discord.

.env Variables: `discordBotToken`, `discordBotClientID`

[Discord Together](https://github.com/RemyK888/discord-together)

Bot requirements:
Enable your bot's PRESENCE INTENT, SERVER MEMBERS INTENT and MESSAGE CONTENT INTENT on Discord Developer Portal

Authorize URL (Replace BOT_CLIENT_ID with your bot's client id)
https://discord.com/oauth2/authorize?client_id=BOT_CLIENT_ID&permissions=1&scope=bot%20applications.commands

run this only once
```
npm run deploy-commands
```
then to start bot
```
npm run main
```