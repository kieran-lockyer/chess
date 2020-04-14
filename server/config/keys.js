require("dotenv");

module.exports = {
  mongoURI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-im0dw.mongodb.net/test?retryWrites=true&w=majority`,
};
