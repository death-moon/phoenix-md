
const {
  cmd
} = require("../command");
const yts = require("yt-search");
const axios = require("axios");
cmd({
  'pattern': "music",
  'alias': ['audio', "song"],
  'desc': "Search and download audio from YouTube",
  'category': "media",
  'react': '🎧',
  'filename': __filename
}, async (_0xa18e2c, _0x49d86c, _0x1e4e46, {
  from: _0x4d491b,
  args: _0x2d3bb8,
  q: _0x352364,
  reply: _0x4312c3
}) => {
  try {
    if (!_0x352364) {
      return _0x4312c3("*𝐏ℓєα𝐬֟፝є 𝐏ʀ๏νιɖє 𝐀 𝐒๏ƞ͛g 𝐍αмє..*");
    }
    let _0xa206d8 = _0x352364;
    if (!_0x352364.includes("youtube.com") && !_0x352364.includes("youtu.be")) {
      _0x4312c3("*_☃️ Your song is downloading..._*");
      const _0x81ecdd = await yts(_0x352364);
      if (!_0x81ecdd.videos.length) {
        return _0x4312c3("No results found for your query.");
      }
      _0xa206d8 = _0x81ecdd.videos[0x0].url;
    }
    const _0x46596a = 'https://apis.davidcyriltech.my.id/youtube/mp3?url=' + _0xa206d8;
    const _0x47a77e = await axios.get(_0x46596a);
    if (!_0x47a77e.data || !_0x47a77e.data.success || !_0x47a77e.data.result.downloadUrl) {
      return _0x4312c3("Failed to fetch the audio. Try again later.");
    }
    await _0xa18e2c.sendMessage(_0x4d491b, {
      'audio': {
        'url': _0x47a77e.data.result.downloadUrl
      },
      'mimetype': 'audio/mpeg',
      'ptt': false,
      'caption': "🎵 *Title:* " + _0x47a77e.data.result.title + "\n🔗 *Link:* " + _0xa206d8
    }, {
      'quoted': _0x49d86c
    });
  } catch (_0x4fe12f) {
    console.error("Error in play command:", _0x4fe12f);
    _0x4312c3("An error occurred while processing your request.");
  }
});