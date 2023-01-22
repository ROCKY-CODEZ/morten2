const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unlock")
    .setDescription("Unlocks a locked channel")
    .addChannelOption(option=> option
         .setName("channel")
         .setDescription("channel to unlock")
         .setRequired(true)
         ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
  async  execute(interaction) { 
        const channel = interaction.options.getChannel("channel");
        try {
            await channel.permissionOverwrites.edit(interaction.user.id, {
                SendMessages: true,
              });
              await interaction.reply("Unlocked channel")
        } catch (error) {
            console.log(error)
            interaction.reply("The channel is not locked.");
        }
    },
};
