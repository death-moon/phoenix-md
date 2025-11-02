const config = require('../config');

const { cmd } = require('../command');

const stylizedChars = {

    a: '🅐', b: '🅑', c: '🅒', d: '🅓', e: '🅔', f: '🅕', g: '🅖',

    h: '🅗', i: '🅘', j: '🅙', k: '🅚', l: '🅛', m: '🅜', n: '🅝',

    o: '🅞', p: '🅟', q: '🅠', r: '🅡', s: '🅢', t: '🅣', u: '🅤',

    v: '🅥', w: '🅦', x: '🅧', y: '🅨', z: '🅩',

    '0': '⓿', '1': '➊', '2': '➋', '3': '➌', '4': '➍',

    '5': '➎', '6': '➏', '7': '➐', '8': '➑', '9': '➒'

};

cmd({

    pattern: "chr",
    alias: ["creact"],
    react: "🔤",
    desc: "React to channel messages with stylized text",
    category: "owner",
    use: '.chr <channel-link> <text>',
    filename: __filename

},

async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {

    try {

        if (!isOwner) return reply("❌ ᴏᴡɴᴇʀ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ");

        if (!q) return reply(`Usage:\n${command} https://whatsapp.com/channel/1234567890 hello`);

        const [link, ...textParts] = q.split(' ');

        if (!link.includes("whatsapp.com/channel/")) return reply("Invalid channel link format");

        

        const inputText = textParts.join(' ').toLowerCase();

        if (!inputText) return reply("ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴛᴇxᴛ ᴛᴏ ᴄᴏɴᴠᴇʀᴛ");

        const emoji = inputText

            .split('')

            .map(char => {

                if (char === ' ') return '―';

                return stylizedChars[char] || char;

            })

            .join('');

        const channelId = link.split('/')[4];

        const messageId = link.split('/')[5];

        if (!channelId || !messageId) return reply("Invalid link - missing IDs");

        const channelMeta = await conn.newsletterMetadata("invite", channelId);

        await conn.newsletterReactMessage(channelMeta.id, messageId, emoji);

        return reply(`╭─ 「 *\`𝐏𝐇𝐎𝐄𝐍𝐈𝐗 𝐌𝐃\`* 」
┃▸ *sᴜᴄᴄᴇss!* ʀᴇᴀᴄᴛɪᴏɴ sᴇɴᴛ
┃▸ *ᴄʜᴀɴɴᴇʟ:* ${channelMeta.name}
┃▸ *ʀᴇᴀᴄᴛɪᴏɴ:* ${emoji}
╰────────────────┈⊷

> *ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ sɪᴅᴅʜᴀʀᴛʜs*`);

    } catch (e) {

        console.error(e);

        reply(`❎ Error: ${e.message || "Failed to send reaction"}`);

    }

});

// *ᴘᴏᴡᴇʀᴇᴅ ʙʏ DAVINCS* 
