const axios = require('axios');
const { cmd, commands } = require('../command');

// Required modules
const fetch = require('node-fetch');  // For fetching external resources (if needed)
const yts = require('yt-search');     // For searching YouTube videos

// Command setup
cmd({
  pattern: "langcode",  // Trigger for the command
  desc: "Display all ISO 639-1 language codes.",  // Description of the command
  react: "🌍",  // Reaction emoji
  category: "info",  // Category of the command
  filename: __filename  // Current filename
}, async (bot, message, chat, { from, reply }) => {
  try {
    // Language codes list with ISO 639-1 codes and their country flags
    const languageList = `╭──「 \`☻𝗟𝗔𝗡𝗚𝗖𝗢𝗗𝗘☻\` 」
│◉🇦🇫 *ᴘᴀsʜᴛᴏ* ➝ ᴘs  
│◉🇦🇱 *ᴀʟʙᴀɴɪᴀɴ* ➝ sǫ  
│◉🇩🇿 *ᴀʀᴀʙɪᴄ* ➝ ᴀʀ  
│◉🇦🇲 *ᴀʀᴍᴇɴɪᴀɴ* ➝ ʜʏ  
│◉🇦🇺 *ᴇɴɢʟɪsʜ* ➝ ᴇɴ  
│◉🇦🇿 *ᴀᴢᴇʀʙᴀɪᴊᴀɴɪ* ➝ ᴀᴢ  
│◉🇧🇩 *ʙᴇɴɢᴀʟɪ* ➝ ʙɴ  
│◉🇧🇬 *ʙᴜʟɢᴀʀɪᴀɴ* ➝ ʙɢ  
│◉🇧🇷 *ᴘᴏʀᴛᴜɢᴜᴇsᴇ* ➝ ᴘᴛ  
│◉🇨🇳 *ᴄʜɪɴᴇsᴇ* ➝ ᴢʜ  
│◉🇨🇿 *ᴄᴢᴇᴄʜ* ➝ ᴄs  
│◉🇩🇪 *ɢᴇʀᴍᴀɴ* ➝ ᴅᴇ  
│◉🇩🇰 *ᴅᴀɴɪsʜ* ➝ ᴅᴀ  
│◉🇪🇸 *sᴘᴀɴɪsʜ* ➝ ᴇs  
│◉🇪🇪 *ᴇsᴛᴏɴɪᴀɴ* ➝ ᴇᴛ  
│◉🇪🇺 *ʙᴀsǫᴜᴇ* ➝ ᴇᴜ  
│◉🇫🇷 *ғʀᴇɴᴄʜ* ➝ ғʀ  
│◉🇬🇷 *ɢʀᴇᴇᴋ* ➝ ᴇʟ  
│◉🇮🇩 *ɪɴᴅᴏɴᴇsɪᴀɴ* ➝ ɪᴅ  
│◉🇮🇪 *ɪʀɪsʜ* ➝ ɢᴀ  
│◉🇮🇹 *ɪᴛᴀʟɪᴀɴ* ➝ ɪᴛ  
│◉🇯🇵 *ᴊᴀᴘᴀɴᴇsᴇ* ➝ ᴊᴀ  
│◉🇮🇳 *ʜɪɴᴅɪ* ➝ ʜɪ  
│◉🇰🇷 *ᴋᴏʀᴇᴀɴ* ➝ ᴋᴏ  
│◉🇱🇻 *ʟᴀᴛᴠɪᴀɴ* ➝ ʟᴠ  
│◉🇱🇹 *ʟɪᴛʜᴜᴀɴɪᴀɴ* ➝ ʟᴛ  
│◉🇲🇦 *ʙᴇʀʙᴇʀ* ➝ ʙᴇʀ  
│◉🇲🇽 *sᴘᴀɴɪsʜ* ➝ ᴇs  
│◉🇳🇱 *ᴅᴜᴛᴄʜ* ➝ ɴʟ  
│◉🇳🇴 *ɴᴏʀᴡᴇɢɪᴀɴ* ➝ ɴᴏ  
│◉🇵🇱 *ᴘᴏʟɪsʜ* ➝ ᴘʟ  
│◉🇷🇴 *ʀᴏᴍᴀɴɪᴀɴ* ➝ ʀᴏ  
│◉🇷🇺 *ʀᴜssɪᴀɴ* ➝ ʀᴜ  
│◉🇸🇦 *ᴀʀᴀʙɪᴄ* ➝ ᴀʀ  
│◉🇸🇮 *sʟᴏᴠᴇɴɪᴀɴ* ➝ sʟ  
│◉🇸🇰 *sʟᴏᴠᴀᴋ* ➝ sᴋ  
│◉🇸🇪 *sᴡᴇᴅɪsʜ* ➝ sᴠ  
│◉🇹🇭 *ᴛʜᴀɪ* ➝ ᴛʜ  
│◉🇹🇷 *ᴛᴜʀᴋɪsʜ* ➝ ᴛʀ  
│◉🇺🇦 *ᴜᴋʀᴀɪɴɪᴀɴ* ➝ ᴜᴋ  
│◉🇺🇿 *ᴜᴢʙᴇᴋ* ➝ ᴜᴢ  
│◉🇿🇦 *ᴀғʀɪᴋᴀᴀɴs* ➝ ᴀғ  
│◉🇻🇳 *ᴠɪᴇᴛɴᴀᴍᴇsᴇ* ➝ ᴠɪ  
╰─────────────────☻
✅ *ᴜsᴇ ᴛʜᴇsᴇ ᴄᴏᴅᴇs ғᴏʀ ᴛʀᴀɴsʟᴀᴛɪᴏɴ ᴀɴᴅ ᴏᴛʜᴇʀ ʟᴀɴɢᴜᴀɢᴇ ғᴜɴᴄᴛɪᴏɴs!*`;

    // Image URL: Use your own custom image URL here
    const imageUrl = "https://files.catbox.moe/x537l4.jpg"; // Replace this URL with the link to your image

    // Sending the message with language list and image
    await bot.sendMessage(from, {
      image: { url: imageUrl },  // Sending your own image
      caption: languageList  // Sending the language list
    }, { quoted: message });

  } catch (error) {
    // Error handling
    console.log(error);  // Log the error for debugging
    reply("❌ An error occurred.");
  }
});
