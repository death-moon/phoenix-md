const { cmd } = require('../command');

cmd({
    pattern: "ikeep",
    alias: ["I-keep"],
    desc: "Garde uniquement les membres avec les indicatifs donnés, supprime les autres",
    category: "group",
    react: "📲",
    filename: __filename
},
async (conn, mek, m, {
    from, q, isGroup, isBotAdmins, reply, groupMetadata, isCreator
}) => {
    if (!isGroup) return reply("*❌ This command only works in groups.*");
    if (!isCreator) return reply("*❌ Only the bot owner can use this command.*");
    if (!isBotAdmins) return reply("*❌ I must be an admin to do this.*");
    if (!q) return reply("*❌ Provide at least one callsign. Example: .ikeep 52,56,1*");

    // Traitement des indicatifs
    const codes = q.split(",").map(code => code.trim()).filter(code => /^\d+$/.test(code));

    if (codes.length === 0) {
        return reply("*❌ No valid callsign detected. Use only comma-separated numbers.*");
    }

    try {
        const participants = await groupMetadata.participants;

        const toRemove = participants.filter(participant => {
            const jid = participant.id;
            const isAdmin = participant.admin;
            const number = jid.split("@")[0]; // extraire le numéro

            // Garder si le numéro commence par un des indicatifs fournis
            const keep = codes.some(code => number.startsWith(code));
            return !keep && !isAdmin;
        });

        if (toRemove.length === 0) {
            return reply("*✅ All members have a matching callsign, no one to remove.*");
        }

        const jids = toRemove.map(p => p.id);
        await conn.groupParticipantsUpdate(from, jids, "remove");

        reply(`✅ Withdrawn ${toRemove.length} members who do not have the codes: ${codes.join(", ")}`);
    } catch (error) {
        console.error("Take command error:", error);
        reply("❌ Erreur lors du traitement : " + error.message);
    }
});
