const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lock")
    .setDescription("Locks a channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Channel to lock")
        .setRequired(true)
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");
    if (!channel.manageable) {
      return interaction.reply({ content: "This channel can't be locked by me", ephemeral: true });
    } else {
      try {
        await channel.permissionOverwrites.edit(interaction.guild.id, {
            SendMessages: false,
          });
        await interaction.reply({ content: "Channel locked", ephemeral: false });
      } catch (err) {
        interaction.reply("An error occurred")
        console.log(err)

      }
    }
  },
};
