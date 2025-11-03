const fetch = require('node-fetch');
const config = require('../config');
const { cmd } = require('../command');

cmd({
    pattern: "repo",
    alias: ["sc", "script", "info"],
    desc: "Fetch GitHub repository information",
    react: "❇️",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/death-moon/phoenix-md';

    try {
        const match = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!match) return reply("❌ Erreur : L'URL du repo est invalide.");

        const [, username, repoName] = match;

        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`, {
            headers: {
                'User-Agent': 'phoenix-md'
            }
        });

        if (response.status === 503) {
            return reply("❌ GitHub est temporairement indisponible (503). Réessaie plus tard.");
        }

        if (!response.ok) {
            return reply(`❌ Échec de récupération des infos du repo. Code: ${response.status}`);
        }

        const repoData = await response.json();

        const message = `╭─ 「 *\`𝐏𝐇𝐎𝐄𝐍𝐈𝐗 𝐌𝐃\`* 」
│• *ʀᴇᴘᴏsɪᴛᴏʀʏ*: ${repoData.name}
│• *ᴏᴡɴᴇʀ*: ${repoData.owner.login}
│• *sᴛᴀʀs*: ${repoData.stargazers_count}
│• *ғᴏʀᴋs*: ${repoData.forks_count}
│• *ᴜʀʟ*: ${repoData.html_url}
╰───────────────⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/x537l4.jpg` },
            caption: message,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363418161689316@newsletter',
                    newsletterName:'𝗣𝗛𝗢𝗘𝗡𝗜𝗫-𝗠𝗗',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Repo command error:", error);
        reply("❌ Une erreur est survenue lors de la récupération du dépôt.");
    }
});

