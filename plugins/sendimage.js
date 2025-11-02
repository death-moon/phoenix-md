const {
  cmd
} = require("../command");
cmd({
  'pattern': "getimage",
  'desc': "Send an image from a URL.",
  'category': "fun",
  'react': "🖼️",
  'filename': __filename,
  'use': ".sendimage <image_url>"
}, async (_0x2aa314, _0x151f3e, _0xb794d, {
  reply: _0x3aff39,
  args: _0x324603
}) => {
  try {
    if (!_0x324603[0x0]) {
      return _0x3aff39("*_❌ ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀɴ ɪᴍᴀɢᴇ ᴜʀʟ!_*");
    }
    const _0x267549 = _0x324603[0x0];
    await _0x2aa314.sendMessage(_0xb794d.chat, {
      'image': {
        'url': _0x267549
      },
      'caption': "*_ʜᴇʀᴇ ɪs ʏᴏᴜʀ ɪᴍᴀɢᴇ!_*",
      'mimetype': 'image/png'
    }, {
      'quoted': _0x151f3e
    });
  } catch (_0x2cd13a) {
    console.error("Error in sendimage command:", _0x2cd13a);
    _0x3aff39("❌ An error occurred: " + _0x2cd13a.message);
  }
});