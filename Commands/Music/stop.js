const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const client = require("../../index");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops the current player!"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    const { options, guild, member, channel } = interaction;
    const voiceChannel = member.voice.channel;
    if (!member.voice.channelId === guild.members.me.voice.channelId) {
      return interaction.reply({
        content:
          "You should be in the same voice channel as I am to stop the player.",
      });
    }
    const queue = client.distube.getQueue(voiceChannel);
    try {
      queue.stop(voiceChannel);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription("Stopped the player!")
            .setColor("DarkButNotBlack"),
        ],
      });
    } catch (err) {
      interaction.reply("An error has occured while stopping the player.");
    }
  },
};
