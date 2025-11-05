const axios = require('axios');
const os = require('os');
const fs = require('fs');
const path = require('path');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');

cmd({
  pattern: 'version',
  alias: ["changelog", "cupdate", "checkupdate"],
  react: '🚀',
  desc: "Check bot's version, system stats, and update info.",
  category: 'info',
  filename: __filename
}, async (conn, mek, m, {
  from, sender, pushname, reply
}) => {
  try {
    const localVersionPath = path.join(__dirname, '../data/version.json');
    let localVersion = 'Unknown';
    let changelog = 'No changelog available.';
    
    if (fs.existsSync(localVersionPath)) {
      const localData = JSON.parse(fs.readFileSync(localVersionPath));
      localVersion = localData.version;
      changelog = localData.changelog;
    }

    const rawVersionUrl = 'https://raw.githubusercontent.com/Princetechx/phoenix-md/main/data/version.json';
    let latestVersion = 'Unknown';
    let latestChangelog = 'No changelog available.';
    try {
      const { data } = await axios.get(rawVersionUrl);
      latestVersion = data.version;
      latestChangelog = data.changelog;
    } catch (error) {
      console.error('Failed to fetch latest version:', error.message);
    }

    const pluginPath = path.join(__dirname, '../plugins');
    const pluginCount = fs.readdirSync(pluginPath).filter(file => file.endsWith('.js')).length;
    const totalCommands = commands.length;

    const uptime = runtime(process.uptime());
    const ramUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const totalRam = (os.totalmem() / 1024 / 1024).toFixed(2);
    const hostName = os.hostname();
    const lastUpdate = fs.statSync(localVersionPath).mtime.toLocaleString();

    const githubRepo = 'https://github.com/Princetechx/phoenix-md';

    // Dynamic update message
    let updateMessage = `✅ ᴘʜᴏᴇɴɪx ᴍᴅ ᴜᴘᴅᴀᴛᴇᴅ!`;
    if (localVersion !== latestVersion) {
      updateMessage = `🚀 *Your bot is outdated!*\n🔹 *Current Version:* ${localVersion}\n🔹 *Latest Version:* ${latestVersion}\n\nUse *.update* to update now.`;
    }

    const statusMessage = `> *ᴄʜᴇᴄᴋ ᴜᴘᴅᴀᴛᴇ ʙʏ ᴘʀɪɴᴄᴇ sɪᴅ*
╭──❍ *🚀᪳ᴄʜᴇᴄᴋ ᴜᴘᴅᴀᴛᴇ* ❍
│🌟 *ʜɪ : ${pushname}!*
│📌 *ʙᴏᴛ ɴᴀᴍᴇ : xᴛʀᴇᴍᴇ ᴍᴅx*
│🔖 *ᴄᴜʀʀᴇɴᴛ ᴠᴇʀsɪᴏɴ : ${localVersion}*
│📢 *ʟᴀᴛᴇsᴛ ᴠᴇʀsɪᴏɴ : ${latestVersion}*
│📂 *ᴛᴏᴛᴀʟ ᴘʟᴜɢɪɴs : ${pluginCount}*
│🔢 *ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs: ${totalCommands}*
│❍ *ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ*
╰────────────────❍
╭──❍ *💾᪳sʏsᴛᴇᴍᴇ ɪɴғᴏ* ❍
│👤 *ᴅᴇᴠ : ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*
│📟 *ʀᴀᴍ ᴜsᴀɢᴇ : ${ramUsage}ᴍʙ*
│📟 *ᴛᴏᴛᴀʟ ʀᴀᴍ ${totalRam}ᴍʙ*
│📅 *ᴜᴘᴅᴀᴛᴇ : ${lastUpdate}*
│⚙️ *ʜᴏsᴛ ɴᴀᴍᴇ : ${hostName}*
│⏳ *ᴜᴘᴛɪᴍᴇ : ${uptime}*
│🗯️ *ɪᴍɢ : ${updateMessage}*
│⭐ *ʀᴇᴘᴏ : ${githubRepo}*
│ *ᴅᴏɴ'ᴛ ғᴏʀɢᴇᴛ ᴛᴏ ғᴏʀᴋ,sᴛᴀʀ ᴛʜᴇ ʀᴇᴘᴏ!*
╰────────────────❍
> *ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ sɪᴅ*`;

    await conn.sendMessage(from, {
      image: { url: 'https://files.catbox.moe/x537l4.jpg' },
      caption: statusMessage,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363418161689316@newsletter',
          newsletterName: '𝗣𝗛𝗢𝗘𝗡𝗜𝗫-𝗠𝗗',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

  } catch (error) {
    console.error('Error fetching version info:', error.message);
    reply('❌ An error occurred while checking the bot version.');
  }
});
