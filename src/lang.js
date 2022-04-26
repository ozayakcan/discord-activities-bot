const fs = require("fs");

function setLanguage(guild_id, lang) {
    let languages = JSON.parse(fs.readFileSync("./src/languages.json", "utf8"));
    languages[guild_id] = {
        language: lang,
    };
    fs.writeFile("./src/languages.json", JSON.stringify(languages), (err) => {
        if (err) console.error(err)
    });
    let guildData = languages[guild_id];
    let langOpt = require("./lang/" + guildData.language + ".json");
    return langOpt;
}
function getLanguage(guild_id) {
    let languages = JSON.parse(fs.readFileSync("./src/languages.json", "utf8"));
    if (!languages[guild_id]) languages[guild_id] = {
        language: "en",
    };
    let guildData = languages[guild_id];
    let langOpt = require("./lang/" + guildData.language + ".json");
    return langOpt;
}

module.exports = {
    setLanguage: setLanguage,
    getLanguage: getLanguage
};