const { PORT = 5000 } = process.env;
const app = require("./app");

const listener = () => console.log(`Now serving LOOKS on port ${PORT}`);
app.listen(PORT, listener);