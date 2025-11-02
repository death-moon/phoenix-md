

const { cmd } = require('../command');

cmd(
  {
    pattern: 'save',
    alias: ["send"],
    react: '📥',
    desc: 'Owner Only - Saves a quoted media (photo, video, audio, view-once) and sends it to your DM',
    category: 'utility',
    filename: __filename,
  },
  async (conn, m, args, { from: sender, isOwner }) => {
    try {
      // Vérifie si l'utilisateur est le propriétaire du bot
      if (!isOwner) {
        return await conn.sendMessage(
          m.chat,
          { text: '*📛 This is an owner-only command.*' },
          { quoted: m }
        );
      }

      // Vérifie si un message est cité via args.quoted
      if (!args.quoted) {
        return await conn.sendMessage(
          m.chat,
          { text: '*👀 Please reply to a media message to save it!*' },
          { quoted: m }
        );
      }

      // Télécharge le contenu du message cité
      let mediaData;
      try {
        mediaData = await args.quoted.download();
      } catch (err) {
        console.error("Error in save command:", err);
        return await conn.sendMessage(
          m.chat,
          { text: '❌ Error downloading the media:\n' + err.message },
          { quoted: m }
        );
      }

      const messageType = args.quoted.mtype;
      const options = { quoted: m };
      let forwardData = {};

      // Prépare l'objet forwardData selon le type de média
      switch (messageType) {
        case 'imageMessage':
          forwardData = {
            image: mediaData,
            caption: `📥 Saved media from @${sender.split('@')[0]}`,
            mimetype: args.quoted.mimetype || 'image/jpeg',
          };
          break;
        case 'videoMessage':
          forwardData = {
            video: mediaData,
            caption: `📥 Saved media from @${sender.split('@')[0]}`,
            mimetype: args.quoted.mimetype || 'video/mp4',
          };
          break;
        case 'audioMessage':
          forwardData = {
            audio: mediaData,
            mimetype: 'audio/mp4',
            ptt: args.quoted.ptt || false,
          };
          break;
        case 'viewOnceMessage':
          // Pour un message "view once", on détermine le type de média sous-jacent
          if (args.quoted.message && args.quoted.message.imageMessage) {
            forwardData = {
              image: mediaData,
              caption: `📥 Saved view-once image from @${sender.split('@')[0]}`,
              mimetype: 'image/jpeg',
              viewOnce: true,
            };
          } else if (args.quoted.message && args.quoted.message.videoMessage) {
            forwardData = {
              video: mediaData,
              caption: `📥 Saved view-once video from @${sender.split('@')[0]}`,
              mimetype: 'video/mp4',
              viewOnce: true,
            };
          } else {
            return await conn.sendMessage(
              m.chat,
              { text: '❌ Unsupported view-once media type for saving.' },
              { quoted: m }
            );
          }
          break;
        default:
          return await conn.sendMessage(
            m.chat,
            { text: '❌ Unsupported media type for saving.' },
            { quoted: m }
          );
      }

      // Envoie le média directement en DM à l'utilisateur (sender)
      await conn.sendMessage(m.sender, forwardData, options);
    } catch (error) {
      console.error("Error in save command:", error);
      await conn.sendMessage(m.chat, { text: '❌ An error occurred while saving the media:\n' + error.message }, { quoted: m });
    }
  }
);