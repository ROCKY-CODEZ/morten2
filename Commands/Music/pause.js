const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const { intersect } = require("mathjs");
const client = require("../../index");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pauses the current song"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const { options, guild, member, channel } = interaction;
    const voiceChannel = member.voice.channel;
    const queue = client.distube.getQueue(voiceChannel);
    try {
      await queue.pause(voiceChannel);
      await interaction.reply("Paused the current song");
    } catch (err) {
      console.log(err);
      interaction.reply("An error occurred.");
    }
  },
};
