const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  CommandInteraction,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a user from the discord server.")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("User to be kicked.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason for the kick.")
    ),
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { channel, options } = interaction;

    const user = options.getUser("target");
    const reason = options.getString("reason") || "No reason provided";

    const member = await interaction.guild.members.fetch(user.id);

    const errEmbed = new EmbedBuilder()
      .setDescription(
        `You can't take action on ${user.username} since they have a higher role.`
      )
      .setColor(0xc72c3b);

    if (
      member.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.reply({ embeds: [errEmbed], ephemeral: true });
    member.send(`You have been kicked from ${interaction.guild.name}`);
    member.kick(reason);

    const embed = new EmbedBuilder().setDescription(
      `Succesfully kicked ${user} with reason: ${reason}`
    );

    await interaction.reply({
      embeds: [embed],
    });
  },
};
