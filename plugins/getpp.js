const { cmd } = require("../command");

cmd({
  pattern: "getpp",
  alias: ["xpp"],
  use: "pp",
  desc: "Get profile picture of a user (replied user in group, or DM user)",
  category: "tools",
  react: "✅",
  filename: __filename
},
async (conn, mek, m, { from, sender, reply, isGroup }) => {
  try {
    const quotedMsg = mek.message?.extendedTextMessage?.contextInfo?.participant;
    const quotedKey = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    let targetJid;

    if (isGroup) {
      if (quotedMsg && quotedKey) {
        targetJid = quotedMsg;
      } else {
        return reply("❌ Please reply to someone's message to get their profile picture.");
      }
    } else {
      targetJid = from.endsWith("@s.whatsapp.net") ? from : sender;
    }

    let imageUrl;
    try {
      imageUrl = await conn.profilePictureUrl(targetJid, 'image');
    } catch {
      imageUrl = "https://files.catbox.moe/x537l4.jpg";
    }

    const fakeVCard = {
      key: {
        fromMe: false,
        participant: '0@s.whatsapp.net',
        remoteJid: "status@broadcast"
      },
      message: {
        contactMessage: {
          displayName: "𝐏𝐇𝐎𝐄𝐍𝐈𝐗 𝐌𝐃✅",
          vcard: "BEGIN:VCARD\nVERSION:3.0\nFN: 𝐏𝐇𝐎𝐄𝐍𝐈𝐗 𝐌𝐃✅\nORG: 𝐏𝐇𝐎𝐄𝐍𝐈𝐗 𝐌𝐃;\nTEL;type=CELL;type=VOICE;waid=529633982655:+52 81 4555 0855\nEND:VCARD",
          jpegThumbnail: Buffer.from([])
        }
      }
    };

    await conn.sendMessage(from, {
      image: { url: imageUrl },
      caption: `✅ ᴘʀᴏғɪʟᴇ ᴘɪᴄᴛᴜʀᴇ ᴏғ @${targetJid.split('@')[0]}`,
      contextInfo: {
        mentionedJid: [targetJid],
        forwardingScore: 5,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: "𝗣𝗛𝗢𝗘𝗡𝗜𝗫-𝗠𝗗",
          newsletterJid: "120363418161689316@newsletter"
        }
      }
    }, { quoted: fakeVCard });

  } catch (err) {
    console.error("Error in getpp:", err);
    reply("❌ Failed to fetch profile picture.");
  }
});
      
