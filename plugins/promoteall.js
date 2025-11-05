const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "promoteall",
    desc: "Promotes all group members to admin",
    category: "group",
    filename: __filename
},
async (conn, mek, m, {
    from, isGroup, sender
}) => {
    try {
        if (!isGroup) return m.reply("🚫 THIS COMMAND CAN ONLY BE USED IN GROUPS");

        const groupMetadata = await conn.groupMetadata(from);
        const participants = groupMetadata.participants;
        const botNumber = await conn.decodeJid(conn.user.id);
        const botAdmin = participants.find(p => p.id === botNumber)?.admin;
        const senderAdmin = participants.find(p => p.id === sender)?.admin;

        const senderIsSudo = process.env.SUDO?.split(',').includes(sender);
        const senderIsOwner = sender.includes(config.OWNER_NUMBER);

        if (!botAdmin) return m.reply("🚫 BOT MUST BE ADMIN TO EXECUTE THIS");
        if (!senderAdmin && !senderIsSudo && !senderIsOwner)
            return m.reply("🚫 ONLY ADMINS OR SUDO/OWNER CAN USE THIS");

        const toPromote = participants
            .filter(p => !p.admin)
            .map(p => p.id)
            .filter(id => id !== botNumber);

        if (toPromote.length === 0) return m.reply("✅ No users to promote");

        await conn.groupParticipantsUpdate(from, toPromote, 'promote');
        const mentions = toPromote.map(user => `@${user.split('@')[0]}`).join(' ');
        m.reply(`*THE FOLLOWING MEMBERS HAVE BEEN PROMOTED TO ADMIN:*\n${mentions}`, undefined, { mentions: toPromote });

    } catch (err) {
        console.error(err);
        m.reply("❌ Error while processing promoteall.");
    }
});
