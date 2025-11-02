const { cmd } = require('../command');
const fetch = require('node-fetch');

cmd({
    pattern: "phlogo",
    alias: ["pornhub", "ph"],
    desc: "*ɢéɴéʀᴇ ᴜɴ ʟᴏɢᴏ ᴘᴏʀɴʜᴜʙ ᴀᴠᴇᴄ ᴅᴇᴜx ᴛᴇxᴛᴇs*",
    react: "👨🏻‍🎨",
    category: "info",
    filename: __filename,
}, 
async (conn, mek, m, {
    args, reply
}) => {
    try {
        const text = args.join(" ");
        if (!text || !text.includes('|')) {
            return reply(`*❌ Format invalide !*\n➤ Exemple : \`.phlogo phoenix|md\``);
        }

        const [text1, text2] = text.split('|').map(t => t.trim());
        if (!text1 || !text2) return reply("*❌ Texte manquant. Donne deux textes séparés par `|`*");

        const apiUrl = `https://apikey.sazxofficial.web.id/api/imagecreator/pornhub?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}`;
        const res = await fetch(apiUrl);
        const json = await res.json();

        if (!json.status || !json.result) {
            return reply("*⚠️ L'API semble être hors ligne ou ne répond pas.*");
        }

        await conn.sendMessage(m.chat, {
            image: { url: json.result },
            caption: `╭━━〔𝐏𝐇𝐎𝐄𝐍𝐈𝐗 𝐌𝐃〕━⬣\n┃❍ *✅ʟᴏɢᴏ ᴄʀᴇ́ᴇ́ ᴀᴠᴇᴄ sᴜᴄᴄᴇ̀s !*\n┃❍ *ᴛᴇxᴛᴇ 1:* ${text1}\n┃❍ *ᴛᴇxᴛᴇ 2:* ${text2}\n╰━━━━━━━━━━━━━━━⬣\n> *ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ sɪᴅᴅʜᴀʀᴛʜs*`,
            contextInfo: {
                externalAdReply: {
                    title: "ᴘʀɪɴᴄᴇ sɪᴅ ʟᴏɢᴏ ɢᴇɴᴇʀᴀᴛᴏʀ",
                    body: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ sɪᴅ",
                    thumbnailUrl: json.result,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    sourceUrl: json.result
                }
            }
        }, { quoted: m });

    } catch (e) {
        console.error("Erreur phlogo :", e);
        reply("*⚠️ Une erreur est survenue lors de la génération du logo.*");
    }
});
