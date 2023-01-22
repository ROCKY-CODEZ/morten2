const { Client, ActivityType } = require("discord.js");

const config = require("../../config.json");

module.exports = {
  name: "ready",
  once: true,
  /**
   *
   * @param {Client} client
   */
  async execute(client) {

    console.log(`${client.user.username} is now online. I am in ${client.guilds.cache.size} servers!`);
  },
};
