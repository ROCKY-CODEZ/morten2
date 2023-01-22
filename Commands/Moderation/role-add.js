const {
  SlashCommandBuilder,
  CommandInteraction,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("role-add")
    .setDescription("Adds a role to a member")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("User to add role")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("Role which has to be added")
        .setRequired(true)
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @returns
   */
  async execute(interaction) {
    const user = interaction.options.getMember("user");
    const role = interaction.options.getRole("role");
    const roleid = role.id;
    if (!user.manageable)
      return interaction.reply(
        "I do not have the appropriate permissions to add roles to to that user."
      );

    try {
      await user.roles.add(role);
      await interaction.reply(
        `Added the role ${role.name} to ${user.user.tag}`
      );
    } catch (error) {
      console.log(error);
    }
  },
};
