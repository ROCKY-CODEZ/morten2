const {
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
} = require("discord.js");
const math = require("mathjs");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("calculate")
    .setDescription("Calculate an arithmetic problem")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("Question to calculate")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const question = interaction.options.getString("question");
    try {
      await interaction.reply(`Your answer is **${math.evaluate(question)}**`);
    } catch (error) {
      interaction.reply("An error occured");
      console.log(error);
    }
  },
};
