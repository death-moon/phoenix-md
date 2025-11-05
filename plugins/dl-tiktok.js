const {
  cmd
} = require('../command');
const axios = require('axios');
cmd({
  'pattern': "tiktok",
  'alias': ["ttdl", 'tt', 'tiktokdl'],
  'desc': "Download TikTok video without watermark",
  'category': "downloader",
  'react': '🎵',
  'filename': __filename
}, async (_0x47ec38, _0x470973, _0xda03ec, {
  from: _0x3eeeea,
  args: _0x578775,
  q: _0x12a7a8,
  reply: _0x5a9e3d
}) => {
  try {
    if (!_0x12a7a8) {
      return _0x5a9e3d("*_ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴛɪᴋᴛᴏᴋ ᴠɪᴅᴇᴏ ʟɪɴᴋ_*");
    }
    if (!_0x12a7a8.includes("tiktok.com")) {
      return _0x5a9e3d("Invalid TikTok link.");
    }
    _0x5a9e3d("_*ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ᴠɪᴅᴇᴏ, ᴘʟᴇᴀsᴇ ᴡᴀɪᴛ...*_");
    const _0x10014c = "https://delirius-apiofc.vercel.app/download/tiktok?url=" + _0x12a7a8;
    const {
      data: _0x368094
    } = await axios.get(_0x10014c);
    if (!_0x368094.status || !_0x368094.data) {
      return _0x5a9e3d("Failed to fetch TikTok video.");
    }
    const {
      title: _0x404017,
      like: _0x4e643a,
      comment: _0x100792,
      share: _0x56f37c,
      author: _0x27c657,
      meta: _0x3a2c3b
    } = _0x368094.data;
    const _0x16c5b3 = _0x3a2c3b.media.find(_0x2844c8 => _0x2844c8.type === "video").org;
    const _0x3b50c8 = "🎵 *ᴛɪᴋᴛᴏᴋ ᴠɪᴅᴇᴏ* 🎵\n\n" + ("👤 *ᴜsᴇʀ:* " + _0x27c657.nickname + " (@" + _0x27c657.username + ")\n") + ("📖 *ᴛɪᴛʟᴇ:* " + _0x404017 + "\n") + ("👍 *ʟɪᴋᴇs:* " + _0x4e643a + "\n💬 *ᴄᴏᴍᴍᴇɴᴛs:* " + _0x100792 + "\n🔁 *sʜᴀʀᴇs:* " + _0x56f37c);
    await _0x47ec38.sendMessage(_0x3eeeea, {
      'video': {
        'url': _0x16c5b3
      },
      'caption': _0x3b50c8,
      'contextInfo': {
        'mentionedJid': [_0xda03ec.sender]
      }
    }, {
      'quoted': _0x470973
    });
  } catch (_0x212cd1) {
    console.error("Error in TikTok downloader command:", _0x212cd1);
    _0x5a9e3d("An error occurred: " + _0x212cd1.message);
  }
});