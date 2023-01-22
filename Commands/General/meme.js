const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args)); // since require is not supported, we

module.exports = {
  data: new SlashCommandBuilder().setName("meme").setDescription("Get a meme!"),

  async execute(interaction) {
    const embed = new EmbedBuilder();

    await fetch("https://www.reddit.com/r/memes/random/.json").then(
      async (res) => {
        let meme = await res.json();

        console.log(meme);

        let title = meme[0].data.children[0].data.title;
        let url = meme[0].data.children[0].data.url;
        let author = meme[0].data.children[0].data.author;

        return interaction.reply({
          embeds: [
            embed
              .setTitle(title)
              .setImage(url)
              .setURL(url)
              .setColor("Random")
              .setFooter({ text: author }),
          ],
        });
      }
    );
  },
};
