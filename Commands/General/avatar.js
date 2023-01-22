const {
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Shows someone's avatar")
    .addUserOption((target) =>
      target
        .setName("target")
        .setDescription("User to get avatar from")
        .setRequired(false)
    ),
  /**
   * @param {CommandInteraction} interaction
   */
  execute(interaction) {
    const target = interaction.options.getUser("target") || interaction.user;
    const embed = new EmbedBuilder()
      .setTitle(`Avatar of ${target.username}`)
      .setColor("Yellow")
      .setImage(
        target.displayAvatarURL({
          forceStatic: false,
          size: 4096,
          extension: "png",
        })
      )
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  },
};
