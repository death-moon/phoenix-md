const axios = require("axios");
const {
  cmd,
  commands
} = require("../command");
cmd({
  'pattern': "twitter",
  'alias': ['tweet', 'twdl'],
  'desc': "Download Twitter videos",
  'category': "download",
  'filename': __filename
}, async (_0x5f5049, _0x1b68a1, _0x51f8, {
  from: _0x59c750,
  quoted: _0x320ff3,
  q: _0x50f1a6,
  reply: _0x2dfa98
}) => {
  try {
    if (!_0x50f1a6 || !_0x50f1a6.startsWith("https://")) {
      return _0x5f5049.sendMessage(_0x59c750, {
        'text': "❌ Please provide a valid Twitter URL."
      }, {
        'quoted': _0x1b68a1
      });
    }
    await _0x5f5049.sendMessage(_0x59c750, {
      'react': {
        'text': '⏳',
        'key': _0x1b68a1.key
      }
    });
    const _0x598c9a = await axios.get("https://www.dark-yasiya-api.site/download/twitter?url=" + _0x50f1a6);
    const _0x41bc3d = _0x598c9a.data;
    if (!_0x41bc3d || !_0x41bc3d.status || !_0x41bc3d.result) {
      return _0x2dfa98("⚠️ Failed to retrieve Twitter video. Please check the link and try again.");
    }
    const {
      desc: _0x5dbf5f,
      thumb: _0x383b81,
      video_sd: _0x3e8db7,
      video_hd: _0x30b8df
    } = _0x41bc3d.result;
    const _0x2f26fb = "╭━━━〔 *TWITTER DOWNLOADER* 〕━━━⊷\n" + ("┃▸ *Description:* " + (_0x5dbf5f || "No description") + "\n") + "╰━━━⪼\n\n" + "📹 *Download Options:*\n" + "1️⃣  *SD Quality*\n" + "2️⃣  *HD Quality*\n" + "🎵 *Audio Options:*\n" + "3️⃣  *Audio*\n" + "4️⃣  *Document*\n" + "5️⃣  *Voice*\n\n" + "📌 *Reply with the number to download your choice.*";
    const _0x5349ff = await _0x5f5049.sendMessage(_0x59c750, {
      'image': {
        'url': _0x383b81
      },
      'caption': _0x2f26fb
    }, {
      'quoted': _0x1b68a1
    });
    const _0x3af45e = _0x5349ff.key.id;
    _0x5f5049.ev.on("messages.upsert", async _0x248e8c => {
      const _0x1fd05a = _0x248e8c.messages[0x0];
      if (!_0x1fd05a.message) {
        return;
      }
      const _0x297b98 = _0x1fd05a.message.conversation || _0x1fd05a.message.extendedTextMessage?.['text'];
      const _0x3454a8 = _0x1fd05a.key.remoteJid;
      const _0x3366ef = _0x1fd05a.message.extendedTextMessage?.["contextInfo"]?.['stanzaId'] === _0x3af45e;
      if (_0x3366ef) {
        await _0x5f5049.sendMessage(_0x3454a8, {
          'react': {
            'text': '⬇️',
            'key': _0x1fd05a.key
          }
        });
        switch (_0x297b98) {
          case '1':
            await _0x5f5049.sendMessage(_0x3454a8, {
              'video': {
                'url': _0x3e8db7
              },
              'caption': "📥 *Downloaded in SD Quality*"
            }, {
              'quoted': _0x1fd05a
            });
            break;
          case '2':
            await _0x5f5049.sendMessage(_0x3454a8, {
              'video': {
                'url': _0x30b8df
              },
              'caption': "📥 *Downloaded in HD Quality*"
            }, {
              'quoted': _0x1fd05a
            });
            break;
          case '3':
            await _0x5f5049.sendMessage(_0x3454a8, {
              'audio': {
                'url': _0x3e8db7
              },
              'mimetype': 'audio/mpeg'
            }, {
              'quoted': _0x1fd05a
            });
            break;
          case '4':
            await _0x5f5049.sendMessage(_0x3454a8, {
              'document': {
                'url': _0x3e8db7
              },
              'mimetype': "audio/mpeg",
              'fileName': "Twitter_Audio.mp3",
              'caption': "📥 *Audio Downloaded as Document*"
            }, {
              'quoted': _0x1fd05a
            });
            break;
          case '5':
            await _0x5f5049.sendMessage(_0x3454a8, {
              'audio': {
                'url': _0x3e8db7
              },
              'mimetype': "audio/mp4",
              'ptt': true
            }, {
              'quoted': _0x1fd05a
            });
            break;
          default:
            _0x2dfa98("❌ Invalid option! Please reply with 1, 2, 3, 4, or 5.");
        }
      }
    });
  } catch (_0x24b1e7) {
    console.error("Error:", _0x24b1e7);
    _0x2dfa98("❌ An error occurred while processing your request. Please try again.");
  }
});
cmd({
  'pattern': "apk",
  'desc': "Download APK from Aptoide.",
  'category': "download",
  'filename': __filename
}, async (_0xcff8bc, _0x4bdb3b, _0x421678, {
  from: _0x4df21c,
  quoted: _0x4cd84a,
  q: _0x2f8108,
  reply: _0x5a9746
}) => {
  try {
    if (!_0x2f8108) {
      return _0x5a9746("❌ Please provide an app name to search.");
    }
    await _0xcff8bc.sendMessage(_0x4df21c, {
      'react': {
        'text': '⏳',
        'key': _0x4bdb3b.key
      }
    });
    const _0x28b7da = 'http://ws75.aptoide.com/api/7/apps/search/query=' + _0x2f8108 + "/limit=1";
    const _0x4fa33 = await axios.get(_0x28b7da);
    const _0x50c56e = _0x4fa33.data;
    if (!_0x50c56e || !_0x50c56e.datalist || !_0x50c56e.datalist.list.length) {
      return _0x5a9746("⚠️ No results found for the given app name.");
    }
    const _0x57d490 = _0x50c56e.datalist.list[0x0];
    const _0x28322a = (_0x57d490.size / 0x100000).toFixed(0x2);
    const _0xd03ae4 = "╭⭑━━➤ *ᴀᴘᴋ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*\n┃ 📦 *ɴᴀᴍᴇ:* " + _0x57d490.name + "\n┃ 🏋 *sɪᴢᴇ:* " + _0x28322a + " ᴍʙ\n┃ 📦 *ᴘᴀᴄᴋᴀɢᴇ:* " + _0x57d490["ᴘᴀᴄᴋᴀɢᴇ"] + "\n┃ 📅 *ᴜᴘᴅᴀᴛᴇᴅ ᴏɴ:* " + _0x57d490.updated + "\n┃ 👨‍💻 *ᴅᴇᴠᴇʟᴏᴘᴇʀ:* " + _0x57d490.developer.name + "\n╰━━━━━━━━━━━━━━━┈⊷\n🔗 *ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ sɪᴅ*";
    await _0xcff8bc.sendMessage(_0x4df21c, {
      'react': {
        'text': '⬆️',
        'key': _0x4bdb3b.key
      }
    });
    await _0xcff8bc.sendMessage(_0x4df21c, {
      'document': {
        'url': _0x57d490.file.path_alt
      },
      'fileName': _0x57d490.name + '.apk',
      'mimetype': "application/vnd.android.package-archive",
      'caption': _0xd03ae4
    }, {
      'quoted': _0x4bdb3b
    });
    await _0xcff8bc.sendMessage(_0x4df21c, {
      'react': {
        'text': '✅',
        'key': _0x4bdb3b.key
      }
    });
  } catch (_0x1b9215) {
    console.error("Error:", _0x1b9215);
    _0x5a9746("❌ An error occurred while fetching the APK. Please try again.");
  }
});
cmd({
  'pattern': 'gdrive',
  'desc': "Download Google Drive files.",
  'react': '🌐',
  'category': "download",
  'filename': __filename
}, async (_0x13c999, _0x1557f0, _0x475a5d, {
  from: _0x182189,
  quoted: _0x514f36,
  q: _0x3c25c4,
  reply: _0x54b308
}) => {
  try {
    if (!_0x3c25c4) {
      return _0x54b308("❌ Please provide a valid Google Drive link.");
    }
    await _0x13c999.sendMessage(_0x182189, {
      'react': {
        'text': '⬇️',
        'key': _0x1557f0.key
      }
    });
    const _0x17896d = "https://api.fgmods.xyz/api/downloader/gdrive?url=" + _0x3c25c4 + "&apikey=mnp3grlZ";
    const _0x10ba5 = await axios.get(_0x17896d);
    const _0x121ef2 = _0x10ba5.data.result.downloadUrl;
    if (_0x121ef2) {
      await _0x13c999.sendMessage(_0x182189, {
        'react': {
          'text': '⬆️',
          'key': _0x1557f0.key
        }
      });
      await _0x13c999.sendMessage(_0x182189, {
        'document': {
          'url': _0x121ef2
        },
        'mimetype': _0x10ba5.data.result.mimetype,
        'fileName': _0x10ba5.data.result.fileName,
        'caption': "> *ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ sɪᴅᴅʜᴀʀᴛʜs*"
      }, {
        'quoted': _0x1557f0
      });
      await _0x13c999.sendMessage(_0x182189, {
        'react': {
          'text': '✅',
          'key': _0x1557f0.key
        }
      });
    } else {
      return _0x54b308("⚠️ No download URL found. Please check the link and try again.");
    }
  } catch (_0x9119f2) {
    console.error('Error:', _0x9119f2);
    _0x54b308("❌ An error occurred while fetching the Google Drive file. Please try again.");
  }
});