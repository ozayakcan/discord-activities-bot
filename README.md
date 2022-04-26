# discord-activities-bot
Activities for discord.

.env Variables: `discordBotToken`, `discordBotClientID`

Bot requirements:
Enable your bot's PRESENCE INTENT, SERVER MEMBERS INTENT and MESSAGE CONTENT INTENT on Discord Developer Portal

Authorize URL (Replace BOT_CLIENT_ID with your bot's client id)
https://discord.com/oauth2/authorize?client_id=BOT_CLIENT_ID&permissions=1&scope=bot%20applications.commands


src/strings.json example
```
{
    "appCommandsUpdatedSuccess": "Application commands updated successfully.",
    "guildCommandsUpdatedSuccess": "Guild commands updated successfully.",
    "readyMsg": "Logged as {botTag}!",
    "readyMsgServer": "Bot is ready!",
    "helpCommand": "help",
    "helpCommandDesc": "Commands help.",
    "refreshCommand": "refresh",
    "refreshCommandDesc": "Refresh bot.",
    "eventCommand": "activity",
    "eventCommandDesc": "Start an activity.",
    "type": "type",
    "typeDesc": "Set activity type",
    "watchTogetherName": "Watch Together (Youtube)",
    "watchTogetherValue": "watch_together",
    "youMustBeInVoiceChannel": "You must be in voice channel to use this command",
    "youtubeMsg": "{user} started an watch together event. [Click to join]({inviteCode})",
    "typeNotSpecified": "You must specify a type!",
    "helpResp": "Usage Example: /activity type: Watch Together(Youtube) and click genareted link to join activity.",
    "refreshSuccess": "Bot refreshed.",
    "refreshFailed": "Bot could not refreshed. Error: {error}",
    "chessName": "Chess (Need Boost Level 1)",
    "chessValue": "chess",
    "chessMsg": "{user} started a chess event. [Click to join]({inviteCode})",
    "sketchheadsName": "Sketch Heads (Game)",
    "sketchheadsValue": "sketchheads",
    "sketchheadsMsg": "{user} started a sketch heads event. [Click to join]({inviteCode})"
}
```

run this only once
```
npm run deploy-commands
```
then to start bot
```
npm run main
```