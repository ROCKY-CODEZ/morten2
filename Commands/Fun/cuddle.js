const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const axios = require("axios").default;
module.exports = {
  data: new SlashCommandBuilder()
    .setName("cuddle")
    .setDescription("Cuddle someone")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("Member to cuddle")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction) {
    const member = interaction.options.getMember("member");
    axios.get("https://api.otakugifs.xyz/gif?reaction=cuddle").then((res) => {
      const embed = new EmbedBuilder()
        .setTitle(
          interaction.user.username + " cuddles " + member.user.username
        )
        .setImage(res.data.url)
        .setColor("Yellow")
        .setTimestamp();
      interaction.reply({ embeds: [embed] });
    });
  },
};
