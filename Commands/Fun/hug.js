const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const axios = require("axios").default;
module.exports = {
  data: new SlashCommandBuilder()
    .setName("hug")
    .setDescription("Send your virtual hugs to someone!")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("Member to send your hugs to")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction) {
    const member = interaction.options.getMember("member");
    axios
      .get("https://api.otakugifs.xyz/gif?reaction=hug&format=gif")
      .then((res) => {
        const embed = new EmbedBuilder()
          .setTitle(
            `${interaction.user.username} hugs ${member.user.username} 🤗🤗`
          )
          .setImage(`${res.data.url}`)
          .setColor("Yellow")
          .setTimestamp();
        interaction.reply({ embeds: [embed] });
      });
  },
};
