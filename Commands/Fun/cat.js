const {
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
} = require("discord.js");
const axios = require("axios").default;
module.exports = {
  data: new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Get a random, cute cat image"),
  execute(interaction) {
    axios.get("https://api.thecatapi.com/v1/images/search").then((res) => {
      interaction.reply(res.data[0].url);
    });
  },
};
