const app = require("express")();
const globalStrs = require("./lang/global.json");

app.get('/', (req, res) => res.send(globalStrs.readyMsgServer));

module.exports = () => {
    app.listen(3000);
}