const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const axios = require("axios").default;
module.exports = {
  data: new SlashCommandBuilder()
    .setName("kiss")
    .setDescription("Send your virtual kisses to someone!")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("Member to send your kisses")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction) {
    const member = interaction.options.getMember("member");
    axios
      .get("https://api.otakugifs.xyz/gif?reaction=kiss&format=gif")
      .then((res) => {
        const embed = new EmbedBuilder()
          .setTitle(
            `${interaction.user.username} kisses ${member.user.username} 😘😘`
          )
          .setColor("Yellow")
          .setImage(`${res.data.url}`)
          .setTimestamp();
        interaction.reply({embeds: [embed]});
      });
  },
};
