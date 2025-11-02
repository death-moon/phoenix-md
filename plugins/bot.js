const config = require('../config')
const { runtime } = require('../lib/functions');
const {cmd , commands} = require('../command')
cmd({
    pattern: "bot",
    alias: "phoenix",
    react: "🤖",
    desc: "get owner dec",
    category: "misc",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const uptime = runtime(process.uptime());
    const startTime = new Date(Date.now() - process.uptime() * 1000);
let about = `╭─ 「 *\`BOT ONLINE\`* 」
│꙳ *ʙᴏᴛ ɴᴀᴍᴇ* ↔ ᴘʜᴏᴇɴɪx ᴍᴅ
│꙳ *sᴛᴀᴛᴜs* ↔ ᴏɴʟɪɴᴇ
│꙳ *ᴀᴜᴛᴏ ʀᴇsᴛᴀʀᴛ* ↔ ᴏɴʟɪɴᴇ
│꙳ *ʙᴏᴛ ʀᴜɴ* ↔ ${uptime}
│꙳ *ᴅᴇᴠɪᴄᴇ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ*
╰────────────────❍
> *ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ sɪᴅ*`
await conn.sendMessage(from, {
    image: { url: 'https://files.catbox.moe/x537l4.jpg' },
    caption: about,
    contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363418161689316@newsletter', // ou ton JID actuel
            newsletterName: '𝗣𝗛𝗢𝗘𝗡𝗜𝗫-𝗠𝗗',
            serverMessageId: 143
        }
    }
}, { quoted: mek })

}catch(e){
console.log(e)
reply(`${e}`)
}
})
            
