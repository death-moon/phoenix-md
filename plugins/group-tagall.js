const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')

cmd({
    pattern: "tagall",
    react: "🔊",
    alias: ["gc_tagall"],
    desc: "To Tag all Members",
    category: "group",
    use: '.tagall [message]',
    filename: __filename
},
async (conn, mek, m, { from, participants, reply, isGroup, isAdmins, isCreator, prefix, command, args, body }) => {
    try {
        // ✅ Group check
        if (!isGroup) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("❌ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ɪɴ ɢʀᴏᴜᴘs.");
        }

        // ✅ Permission check (Admin OR Bot Owner)
        if (!isAdmins && !isCreator) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("❌ ᴏɴʟʏ ɢʀᴏᴜᴘ ᴀᴅᴍɪɴs ᴏʀ ᴛʜᴇ ʙᴏᴛ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ.");
        }

        // ✅ Fetch group info
        let groupInfo = await conn.groupMetadata(from).catch(() => null);
        if (!groupInfo) return reply("❌ ғᴀɪʟᴇᴅ ᴛᴏ ғᴇᴛᴄʜ ɢʀᴏᴜᴘ ɪɴғᴏʀᴍᴀᴛɪᴏɴ.");

        let groupName = groupInfo.subject || "Unknown Group";
        let totalMembers = participants ? participants.length : 0;
        if (totalMembers === 0) return reply("❌ ɴᴏ ᴍᴇᴍʙᴇʀs ғᴏᴜɴᴅ ɪɴ ᴛʜɪs ɢʀᴏᴜᴘ.");

        let emojis = ['│❉', '│❖', '│❍', '│❂', '│✷', '│☉', '│❋'];
        let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        // ✅ Extract message
        let message = body.slice(body.indexOf(command) + command.length).trim();
        if (!message) message = "ʜɪ ᴇᴠᴇʀʏᴏɴᴇ";

        let teks = `╭─ 「 *\`BOT TAGALL\`* 」\n│☉ ɢʀᴏᴜᴘ : *${groupName}*\n│☉ ᴍᴇᴍʙᴇʀs : *${totalMembers}*\n│☉ ᴍᴇssᴀɢᴇ: *${message}*\n`;

        for (let mem of participants) {
            if (!mem.id) continue;
            teks += `${randomEmoji} @${mem.id.split('@')[0]}\n`;
        }

        teks += "╰────────────────❍";
        
         // Send the image along with the message
        const imageUrl = "https://files.catbox.moe/x537l4.jpg";  // Replace with your image URL or local image path
        const imageBuffer = await getBuffer(imageUrl);

        conn.sendMessage(from, { 
            image: imageBuffer, 
            caption: teks, 
            mentions: participants.map(a => a.id)
        }, { quoted: mek });

    } catch (e) {
        console.error("TagAll Error:", e);
        reply(`❌ *Error Occurred !!*\n\n${e.message || e}`);
    }
});
