const app = require("express")();
const config = require("./config.json");

app.get('/', (req, res) => res.send(config.readyMsgServer));

module.exports = () => {
    app.listen(3000);
}