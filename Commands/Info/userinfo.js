const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const moment = require("moment");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Displays info of a user!")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Member to show info")
        .setRequired(false)
    ),
  /**
   *@param {ChatInputCommandInteraction} interaction
   *@returns
   */
  execute(interaction) {
    const target = interaction.options.getUser("target") || interaction.user;
    const member = interaction.guild.members.cache.get(target.id);
    const embed = new EmbedBuilder()
      .setAuthor({ name:`${target.username}`, url: `${target.displayAvatarURL({ forceStatic:true })}` })
      .setThumbnail(target.displayAvatarURL({ forceStatic: false }))
      .setColor("NotQuiteBlack")
      .addFields(
        { name: "User ID", value: `${target.id}`, inline: false },
        {
          name: "Roles",
          value: `${member.roles.cache
            .map((r) => r)
            .join(" ")
            .replace("@everyone", " ")}`,
        },
        {
          name: "Joined server on",
          value: `${moment(member.joinedAt).format("MMM Do YY")}`,
        },
        {
          name: "Joined Discord on",
          value: `${moment(target.createdAt).format("MMM Do YY")}`,
        }
      );
    interaction.reply({ embeds: [embed] });
  },
};
