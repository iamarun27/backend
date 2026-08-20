const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");

async function connectToDatabase() {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("Connected to database")
}


module.exports = connectToDatabase
