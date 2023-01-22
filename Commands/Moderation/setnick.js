const {SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("setnick")
    .setDescription("Set a member's nick")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)
    .addUserOption(member => member.setName("member").setDescription("Person who's nickname is gonna change").setRequired(true))
    .addStringOption(nick => nick.setName("nick").setDescription("New nick for that person").setRequired(true)),
/**
*@param {ChatInputCommandInteraction} interaction
*/
    execute(interaction) {
        const member = interaction.options.getMember("member") || interaction.member
        const newnick = interaction.options.getString("nick")
        if(!member.manageable) return interaction.reply("I can't edit this member's nickname")
        else{
            member.setNickname(`${newnick}`)
            interaction.reply(`Set ${member.user.username}'s nickname to ${newnick}`)
        }


       
    },
};