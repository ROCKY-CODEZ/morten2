const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const client = require("../../index");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays a song")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Name of the song")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    const { options, guild, member, channel } = interaction;
    const voiceChannel = member.voice.channel;
    if (!member.voice.channelId === guild.members.me.voice.channelId) {
      return interaction.reply({
        content: "The player is active in another channel",
      });
    }
    if (!voiceChannel) {
      return interaction.reply("You need to join a voice channel first!");
    }
    const name = interaction.options.getString("name");
    client.distube.play(voiceChannel, name, {
      textChannel: channel,
      member: member,
    });
    interaction.reply("Recieved your request!")
    client.distube.on("playSong", (queue, song) => {
      const playembed = new EmbedBuilder()
        .setTitle("Playing")
        .setDescription(`${song.name}`)
        .setColor("Random");
      interaction.followUp({ embeds: [playembed] });
    });
  },
};
