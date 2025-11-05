const {
  cmd
} = require("../command");
const fs = require('fs');
const path = require("path");
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson
} = require('../lib/functions');
const antiTagSWPath = path.join(__dirname, "../lib/antitagsw.json");
if (!fs.existsSync(antiTagSWPath)) {
  fs.writeFileSync(antiTagSWPath, '{}', 'utf-8');
}
const loadAntiTagSW = () => {
  try {
    const _0x1d0b44 = fs.readFileSync(antiTagSWPath, "utf-8");
    return _0x1d0b44 ? JSON.parse(_0x1d0b44) : {};
  } catch (_0x882c96) {
    console.error("[AntiTagSW] Failed to load or parse antitagsw.json:", _0x882c96);
    fs.writeFileSync(antiTagSWPath, '{}', "utf-8");
    return {};
  }
};
const saveAntiTagSW = _0x1cb371 => {
  try {
    fs.writeFileSync(antiTagSWPath, JSON.stringify(_0x1cb371, null, 0x4), "utf-8");
  } catch (_0x463adc) {
    console.error("[AntiTagSW] Failed to save antitagsw.json:", _0x463adc);
  }
};
cmd({
  'pattern': "anti-tag",
  'alias': ["antistatustag", "antitagsw", 'antitagstatus', "antitag"],
  'desc': "Enable/Disable Anti Status Tagging for this group",
  'category': 'group',
  'use': ".anti-tag on/off"
}, async (_0xe44c7e, _0x149a79, _0x44bd7c, {
  from: _0x4df49c,
  isGroup: _0x5d8a38,
  senderNumber: _0x26a871,
  isAdmins: _0xf6d89f,
  isBotAdmins: _0x422e2c,
  reply: _0x11de29,
  args: _0x96d55e
}) => {
  if (!_0x5d8a38) {
    return _0x11de29("❌ This command can only be used in groups.");
  }
  if (!_0xf6d89f) {
    return _0x11de29("❌ Only group admins can use this command.");
  }
  if (!_0x422e2c) {
    return _0x11de29("❌ I need to be an admin to perform this action.");
  }
  if (!_0x96d55e[0x0]) {
    return _0x11de29("⚠️ Usage: .anti-tag on / off");
  }
  const _0x4b3358 = _0x96d55e[0x0].toLowerCase();
  let _0x26ec81 = loadAntiTagSW();
  if (_0x4b3358 === 'on') {
    if (_0x26ec81[_0x4df49c] === true) {
      return _0x11de29("✅ AntiTag is already enabled in this group.");
    }
    _0x26ec81[_0x4df49c] = true;
    saveAntiTagSW(_0x26ec81);
    return _0x11de29("✅ AntiTag has been `enable` in this group!");
  } else {
    if (_0x4b3358 === "off") {
      if (!_0x26ec81[_0x4df49c]) {
        return _0x11de29("❌ AntiTag is already disabled in this group.");
      }
      _0x26ec81[_0x4df49c] = false;
      saveAntiTagSW(_0x26ec81);
      return _0x11de29("❌ AntiTag has been `disabled` in this group!");
    } else {
      return _0x11de29("⚠️ Please choose either 'on' or 'off'");
    }
  }
});
module.exports = {
  'loadAntiTagSW': loadAntiTagSW,
  'saveAntiTagSW': saveAntiTagSW
};
