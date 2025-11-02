const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "fb",
  alias: ["facebook"],
  desc: "Download Facebook videos",
  category: "download",
  filename: __filename
}, async (conn, m, store, {
  from,
  quoted,
  args,
  q,
  reply
}) => {
  try {
    if (!q || !q.startsWith("https://")) {
      return conn.sendMessage(from, { text: "*`Need URL`*" }, { quoted: m });
    }

    await conn.sendMessage(from, {
      react: { text: '⏳', key: m.key }
    });

    const apiUrl = `https://lance-frank-asta.onrender.com/api/downloader?url=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);
    
    const caption = `╭━━「 *FB DL* 」\n`
      + `┃▸ *ᴅᴜʀᴀᴛɪᴏɴ*: ${fbData.result.duration}\n`
      + `╰━━━⪼\n\n`
      + `🌐 *ᴅᴏᴡɴʟᴏᴀᴅ ᴏᴘᴛɪᴏɴs:*\n`
      + `❶  *sᴅ ǫᴜᴀʟɪᴛʏ*\n`
      + `❷  *ʜᴅ ǫᴜᴀʟɪᴛʏ*\n`
      + `🎵 *ᴀᴜᴅɪᴏ ᴏᴘᴛɪᴏɴs:*\n`
      + `❸  *ᴀᴜᴅɪᴏ*\n`
      + `❹  *ᴅᴏᴄᴜᴍᴇɴᴛ*\n`
      + `❺  *ᴠᴏɪᴄᴇ*\n\n`
      + `↪️ *ʀᴇᴘʟʏ ᴡɪᴛʜ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ ʏᴏᴜʀ ᴄʜᴏɪᴄᴇ*`;

    const sentMsg = await conn.sendMessage(from, {
      image: { url: fbData.result.thumbnail },
      caption: caption
    }, { quoted: m });

    const messageID = sentMsg.key.id;

    conn.ev.on("messages.upsert", async (msgData) => {
      const receivedMsg = msgData.messages[0];
      if (!receivedMsg.message) return;

      const receivedText = receivedMsg.message.conversation || receivedMsg.message.extendedTextMessage?.text;
      const senderID = receivedMsg.key.remoteJid;
      const isReplyToBot = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;

      if (isReplyToBot) {
        await conn.sendMessage(senderID, {
          react: { text: '⬇️', key: receivedMsg.key }
        });

        let videoLinks = fbData.result.links;

        switch (receivedText) {
          case "1":
            await conn.sendMessage(senderID, {
              video: { url: videoLinks.SD },
              caption: "📥 *ᴅᴏᴡɴʟᴏᴀᴅᴇᴅ ɪɴ sᴅ ǫᴜᴀʟɪᴛʏ*"
            }, { quoted: receivedMsg });
            break;

          case "2":
            await conn.sendMessage(senderID, {
              video: { url: videoLinks.HD },
              caption: "📥 *ᴅᴏᴡɴʟᴏᴀᴅᴇᴅ ɪɴ ʜᴅ ǫᴜᴀʟɪᴛʏ*"
            }, { quoted: receivedMsg });
            break;

          case "3":
            await conn.sendMessage(senderID, {
              audio: { url: videoLinks.SD },
              mimetype: "audio/mpeg"
            }, { quoted: receivedMsg });
            break;

          case "4":
            await conn.sendMessage(senderID, {
              document: { url: videoLinks.SD },
              mimetype: "audio/mpeg",
              fileName: "Facebook_Audio.mp3",
              caption: "📥 *ᴀᴜᴅɪᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇᴅ ᴀs ᴅᴏᴄᴜᴍᴇɴᴛ*"
            }, { quoted: receivedMsg });
            break;

          case "5":
            await conn.sendMessage(senderID, {
              audio: { url: videoLinks.SD },
              mimetype: "audio/mp4",
              ptt: true
            }, { quoted: receivedMsg });
            break;

          default:
            reply("*❌ ɪɴᴠᴀʟɪᴅ ᴏᴘᴛɪᴏɴ! ᴘʟᴇᴀsᴇ ʀᴇᴘʟʏ ᴡɪᴛʜ 1, 2, 3, 4, or 5.*");
        }
      }
    });

  } catch (error) {
    console.error("Error:", error);
    reply("❌ Error fetching the video. Please try again.");
  }
});
