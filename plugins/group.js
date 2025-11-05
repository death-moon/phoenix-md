

const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "promote",
    react: "👨🏿‍💼",
    alias: ["addadmin"],
    desc: "Promote a user to admin.",
    category: "group",
    filename: __filename
}, async (conn, mek, m, {
    from,
    quoted,
    isGroup,
    isAdmins,
    isOwner,
    participants,
    isBotAdmins,
    reply
}) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        if (!isAdmins && !isOwner) return reply("❌ Only group admins or the owner can use this command.");
        if (!isBotAdmins) return reply("❌ I need admin privileges to promote members.");

        // ➡️ Détecter le participant à promouvoir (en réponse ou mention)
        let target;
        if (m.quoted) {
            target = m.quoted.sender;
        } else if (m.mentionedJid && m.mentionedJid.length > 0) {
            target = m.mentionedJid[0];
        } else if (m.msg && m.msg.contextInfo && m.msg.contextInfo.mentionedJid && m.msg.contextInfo.mentionedJid.length > 0) {
            target = m.msg.contextInfo.mentionedJid[0];
        }

        if (!target) return reply("❌ Please mention or reply to a user to promote.");

        // ➡️ Vérifier si l'utilisateur est déjà admin
        const isAlreadyAdmin = participants.some(p => p.id === target && p.admin !== null);
        if (isAlreadyAdmin) return reply("❗ User is already an admin.");

        // ➡️ Promouvoir le participant
        await conn.groupParticipantsUpdate(from, [target], "promote")
            .catch(err => {
                console.error(`⚠️ Failed to promote ${target}:`, err);
                return reply("❌ An error occurred while promoting the participant.");
            });

        // ➡️ Extraire le tag à partir du JID
        const tag = target.split('@')[0];
        reply(`*_@${tag} promoted successfully_*`, { mentions: [target] });

    } catch (error) {
        console.error('Error while executing promote:', error);
        reply('❌ An error occurred while executing the command.');
    }
});

cmd({
    pattern: "demote",
    react: "👨🏿‍💼",
    alias: ["removeadmin"],
    desc: "Demote a user from admin.",
    category: "group",
    filename: __filename
}, async (conn, mek, m, {
    from,
    quoted,
    isGroup,
    isAdmins,
    isOwner,
    participants,
    isBotAdmins,
    reply
}) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        if (!isAdmins && !isOwner) return reply("❌ Only group admins or the owner can use this command.");
        if (!isBotAdmins) return reply("❌ I need admin privileges to demote members.");

        // ➡️ Détecter le participant à rétrograder (en réponse ou mention)
        let target;
        if (m.quoted) {
            target = m.quoted.sender;
        } else if (m.mentionedJid && m.mentionedJid.length > 0) {
            target = m.mentionedJid[0];
        } else if (m.msg && m.msg.contextInfo && m.msg.contextInfo.mentionedJid && m.msg.contextInfo.mentionedJid.length > 0) {
            target = m.msg.contextInfo.mentionedJid[0];
        }

        if (!target) return reply("❌ Please mention or reply to a user to demote.");

        // ➡️ Vérifier si l'utilisateur est bien admin
        const isAdmin = participants.some(p => p.id === target && p.admin !== null);
        if (!isAdmin) return reply("❗ User is not an admin.");

        // ➡️ Rétrograder le participant
        await conn.groupParticipantsUpdate(from, [target], "demote")
            .catch(err => {
                console.error(`⚠️ Failed to demote ${target}:`, err);
                return reply("❌ An error occurred while demoting the participant.");
            });

        // ➡️ Extraire le tag à partir du JID
        const tag = target.split('@')[0];
        reply(`*_@${tag} demoted successfully_*`, { mentions: [target] });

    } catch (error) {
        console.error('Error while executing demote:', error);
        reply('❌ An error occurred while executing the command.');
    }
});

cmd({
    pattern: "ginfo",
    desc: "Get group information.",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, {
    from,
    isGroup,
    isAdmins,
    isOwner,
    isBotAdmins,
    reply
}) => {
    try {
        // Ensure the command is used in a group
        if (!isGroup) return reply("*`[❌]` This command can only be used in groups.*");

        // Only admins or the owner can use this command
        if (!isAdmins && !isOwner) return reply("*`[❌]` Only admins and the owner can use this command.*");

        // Ensure the bot has admin privileges
        if (!isBotAdmins) return reply("*`[❌]` I need admin privileges to execute this command.*");

        // Get group metadata
        const groupMetadata = await conn.groupMetadata(from);
        const groupName = groupMetadata.subject;
        const memberCount = groupMetadata.participants.length;

        // Get group creator
        let creator = groupMetadata.owner ? `@${groupMetadata.owner.split('@')[0]}` : 'Unknown';

        // Get list of admins
        const groupAdmins = groupMetadata.participants
            .filter(member => member.admin)
            .map((admin, index) => `${index + 1}. @${admin.id.split('@')[0]}`)
            .join("\n") || "No admins found";

        // Get creation date (convert from timestamp)
        const creationDate = groupMetadata.creation 
            ? new Date(groupMetadata.creation * 1000).toLocaleString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            }) 
            : 'Unknown';

        // Format the output message
        const message = `
╭───「 *GROUP INFORMATION* 」───◆  
│ 🏷️ *Group Name:* ${groupName}  
│ 🆔 *Group ID:* ${from}  
│ 👥 *Total Members:* ${memberCount}  
│ 👑 *Creator:* ${creator}  
│ 📅 *Created On:* ${creationDate}  
│ 🚻 *Admins:*  
│ ${groupAdmins}  
╰──────────────────◆`;

        // Send the group information with mentions
        await conn.sendMessage(from, {
            text: message,
            mentions: groupMetadata.participants
                .filter(member => member.admin)
                .map(admin => admin.id)
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in ginfo command:", error);
        reply("❌ An error occurred while retrieving the group information.");
    }
});

let stopKickall = false; // Flag to stop the kickall command

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

cmd({
    pattern: "kickall",
    desc: "Kicks all non-admin members from the group continuously until stopped.",
    react: "📣",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, {
    from,
    isGroup,
    sender,
    isAdmins,
    isOwner,
    groupMetadata,
    groupAdmins,
    isBotAdmins,
    reply
}) => {
    try {
        // Ensure the command is used in a group
        if (!isGroup) return reply(`❌ This command can only be used in groups.`);

        // Ensure the user is an admin
        if (!isAdmins) return reply(`❌ Only group admins can use this command.`);

        // Ensure the bot has admin privileges
        if (!isBotAdmins) return reply(`❌ I need admin privileges to remove group members.`);

        stopKickall = false; // Reset stop flag

        // Warning message
        reply(`⚠️ *Warning!* The bot will continuously remove all non-admin members until they are gone or the command is stopped using *.stop*.`);

        while (true) {
            // Get the latest list of participants
            const allParticipants = groupMetadata.participants;
            const nonAdminParticipants = allParticipants.filter(member => 
                !groupAdmins.includes(member.id) && member.id !== conn.user.jid
            );

            if (nonAdminParticipants.length === 0) {
                reply(`✅ No more non-admin members to remove.`);
                break; // Exit loop when no non-admins remain
            }

            for (let participant of nonAdminParticipants) {
                if (stopKickall) {
                    reply(`✅ *Operation stopped by the user.* Some members may not have been removed.`);
                    return;
                }

                await conn.groupParticipantsUpdate(from, [participant.id], "remove")
                    .catch(err => console.error(`⚠️ Failed to remove ${participant.id}:`, err));

                await delay(1000); // Wait 1 second before removing the next participant
            }
        }
    } catch (e) {
        console.error('Error while executing kickall:', e);
        reply('❌ An error occurred while executing the command.');
    }
});

// Command to stop the kickall execution
cmd({
    pattern: "stop",
    desc: "Stops the ongoing kickall process.",
    react: "⏹️",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { reply }) => {
    stopKickall = true; // Set the stop flag to true
    reply(`✅ *Kickall operation has been stopped by the user.*`);
});

cmd({
  pattern: "kick",
  desc: "Removes a participant by replying to or mentioning their message. (Admins can also be kicked)",
  react: "👨🏿‍💼",
  category: "group",
  filename: __filename,
}, async (conn, mek, m, {
    from,
    quoted,
    isGroup,
    isAdmins,
    isOwner,
    participants,
    isBotAdmins,
    reply
}) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        // Only admins or the owner can use this command
        if (!isAdmins && !isOwner) return reply("❌ Only group admins or the owner can use this command.");
        // Check if the bot has admin privileges
        if (!isBotAdmins) return reply("❌ I need admin privileges to remove group members.");
        
        // Determine the target user using reply or mention
        let target;
        if (m.quoted) {
            target = m.quoted.sender;
        } else if (m.mentionedJid && m.mentionedJid.length > 0) {
            target = m.mentionedJid[0];
        } else if (m.msg && m.msg.contextInfo && m.msg.contextInfo.mentionedJid && m.msg.contextInfo.mentionedJid.length > 0) {
            target = m.msg.contextInfo.mentionedJid[0];
        }
        
        if (!target) {
            return reply("❌ Please mention or reply to the message of the participant to remove.");
        }
        
        // Remove the participant from the group (admins can also be kicked)
        await conn.groupParticipantsUpdate(from, [target], "remove")
          .catch(err => {
              console.error(`⚠️ Failed to remove ${target}:`, err);
              return reply("❌ An error occurred while trying to remove the participant.");
          });
        
        // Extraire le tag à partir du JID (ex: "1234567890" sans "@s.whatsapp.net")
        const tag = target.split('@')[0];
        reply(`*_@${tag} kicked successfully_*`, { mentions: [target] });
    } catch (error) {
        console.error('Error while executing kick:', error);
        reply('❌ An error occurred while executing the command.');
    }
});