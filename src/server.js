const app = require("express")();
const strings = require("./strings.json");

app.get('/', (req, res) => res.send(strings.readyMsgServer));

module.exports = () => {
    app.listen(3000);
}