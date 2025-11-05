

const {
  cmd
} = require("../command");
let userRequests = {};
cmd({
  'pattern': "request",
  'alias': ["report"],
  'desc': "Send a message to the bot developers. (Max 5 requests per day)",
  'category': "owner",
  'react': '📩',
  'filename': __filename
}, async (_0x2b706d, _0x1ac97f, _0x25ded4, {
  sender: _0x494fc4,
  pushName: _0x2658d4,
  args: _0x266ac9,
  reply: _0x5bf0b1,
  react: _0x3b628c
}) => {
  try {
    if (!_0x266ac9 || _0x266ac9.length === 0x0) {
      return _0x5bf0b1("❌ *Invalid format!*\n\n➤ Usage: `.request <your message>`\n➤ Example: `.request The Play command has a problem.`");
    }
    const _0x4c0d56 = Date.now();
    if (userRequests[_0x494fc4]) {
      const {
        count: _0x2ac7d0,
        lastTime: _0x5938ef
      } = userRequests[_0x494fc4];
      if (_0x4c0d56 - _0x5938ef < 86400000) {
        if (_0x2ac7d0 >= 0x5) {
          const _0x561cda = 86400000 - (_0x4c0d56 - _0x5938ef);
          const _0x2bb186 = Math.ceil(_0x561cda / 3600000);
          return _0x5bf0b1("❌ You have reached your request limit for today. Please wait " + _0x2bb186 + " hour(s) before sending another request.");
        } else {
          userRequests[_0x494fc4].count++;
        }
      } else {
        userRequests[_0x494fc4] = {
          'count': 0x1,
          'lastTime': _0x4c0d56
        };
      }
    } else {
      userRequests[_0x494fc4] = {
        'count': 0x1,
        'lastTime': _0x4c0d56
      };
    }
    const _0x2e797a = new Date();
    const _0x38f075 = {
      'timeZone': "Africa/Douala",
      'hour12': false,
      'hour': "2-digit",
      'minute': '2-digit',
      'second': "2-digit"
    };
    const _0x394af3 = new Intl.DateTimeFormat('fr-FR', _0x38f075).format(_0x2e797a);
    const _0x24e276 = ["528145550855@s.whatsapp.net", "528145550855@s.whatsapp.net"];
    const _0x50b5d5 = _0x266ac9.join(" ");
    const _0x2c6be2 = "*📩 NEW REQUEST RECEIVED*\n\n" + ("👤 *User:* " + (_0x2658d4 || 'Unknown') + "\n") + ("📞 *Number:* wa.me/" + _0x494fc4.split('@')[0x0] + "\n") + ("⏰ *Time:* " + _0x394af3 + "\n") + ("📝 *Message:*\n➜ _" + _0x50b5d5 + "_\n\n") + "━━━━━━━━━━━━━━━";
    for (const _0x45fdc8 of _0x24e276) {
      await _0x2b706d.sendMessage(_0x45fdc8, {
        'text': _0x2c6be2
      })["catch"](() => {});
    }
    _0x5bf0b1("*✅ Your request has been sent to the developers. They will check it as soon as possible.*");
  } catch (_0x1195c8) {
    _0x5bf0b1("❌ *An error occurred:*\n" + _0x1195c8);
    console.error(_0x1195c8);
  }
});