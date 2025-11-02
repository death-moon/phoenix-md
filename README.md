
<h1 align="center">PHOENIX MD</h1>

<p align="center">
  <img src="https://files.catbox.moe/x537l4.jpg" width="300"/><br>
  <b>ғᴀsᴛ, ᴘᴏᴡᴇʀғᴜʟ, ᴀɴᴅ sᴛʏʟɪsʜ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ ʙᴜɪʟᴛ ғᴏʀ ғᴜɴ ᴀɴᴅ ᴘᴇʀғᴏʀᴍᴀɴᴄᴇ.</b>
</p>

<p align="center">
  <a href="https://github.com/Princetechx/phoenix-md"><img src="https://img.shields.io/github/stars/Princetechx/phoenix-md?style=flat-square&color=yellow"></a>
  <a href="https://github.com/Princetechx/phoenix-md/fork"><img src="https://img.shields.io/github/forks/Princetechx/phoenix-md?style=flat-square&color=lightblue"></a>
  <a href="https://whatsapp.com/channel/0029Vb6D2xV8kyyHNyDALh0i"><img src="https://img.shields.io/badge/WhatsApp-Channel-25D366?style=flat-square&logo=whatsapp"></a>
  <a href="https://github.com/Princetechx"><img src="https://img.shields.io/badge/Dev-Prince sid-blueviolet?style=flat-square"></a>
</p>

**sᴇssɪᴏɴ ɪᴅ💫**

[![PHOENIX MD SESSION](https://img.shields.io/badge/PHOENIX%20-MD%20SESSION-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://phoenix-md-session-m3r0.onrender.com)
---

🧠 **ғᴇᴀᴛᴜʀᴇs**

- 🔁 ᴀᴜᴛᴏ ʀᴇsᴛᴀʀᴛ & ʙᴀɪʟᴇʏs ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ sᴜᴘᴘᴏʀᴛ  
- 🔌 ᴅʏɴᴀᴍɪᴄ ᴘʟᴜɢɪɴ ʟᴏᴀᴅᴇʀ  
- 🔐 ᴘʀɪᴠᴀᴛᴇ/ɢʀᴏᴜᴘ ᴄᴏᴍᴍᴀɴᴅs  
- 🖥️ ᴄᴏɴsᴏʟᴇ ɪɴᴛᴇʀғᴀᴄᴇ & ʟɪᴠᴇ ʟᴏɢs  
- ☁️ ᴅᴇᴘʟᴏʏᴀʙʟᴇ ᴏɴ ᴍᴜʟᴛɪᴘʟᴇ ᴘʟᴀᴛғᴏʀᴍs  

---

🚀 **ᴏɴᴇ-ᴄʟɪᴄᴋ ᴅᴇᴘʟᴏʏ ᴏᴘᴛɪᴏɴs**

⚡ ᴏᴘᴛɪʟɪɴᴋ
[![Deploy with Optilink](https://img.shields.io/badge/Deploy%20Now-OptiLink-2ecc71?style=for-the-badge)]([https://optiklink.com/home])

🌐 ʀᴇɴᴅᴇʀ

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Princetechx/phoenix-md.git)

☁️ ᴋᴏʏᴇʙ

[![Koyeb](https://img.shields.io/badge/Deploy-Koyeb-00C2FF?style=for-the-badge&logo=koyeb)](https://www.koyeb.com)

🛰️ ᴛᴀʟᴋᴅʀᴏᴠᴇ

[![Talkdrove](https://img.shields.io/badge/Deploy-Talkdrove-orange?style=for-the-badge)](#)

🔄 ɢɪᴛʜᴜʙ ᴀᴄᴛɪᴏɴs
ᴅᴇᴘʟᴏʏ ᴀᴜᴛᴏᴍᴀᴛɪᴄᴀʟʟʏ ᴜsɪɴɢ `.yml` ᴡᴏʀᴋғʟᴏᴡ ɪɴsɪᴅᴇ ɢɪᴛʜᴜʙ ᴀᴄᴛɪᴏɴs.


**ɢɪᴛʜᴜʙ ᴅᴇᴘʟᴏʏᴍᴇɴᴛ** 

```
name: Node.js Auto-Restart CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install

    - name: Install FFmpeg
      run: sudo apt-get update && sudo apt-get install -y ffmpeg

    - name: Start application with timeout
      run: |
        echo "🚀 Starting bot (will run max 6 hours)..."
        timeout 21600s npm start || echo "⏹ Bot stopped or timed out"

    - name: Auto-commit to trigger restart
      run: |
        git config --global user.email "autorestart@bot.com"
        git config --global user.name "Auto Restart Bot"
        git commit --allow-empty -m "⏱️ Automatic bot restart"
        git push
```

---

🧰 ᴍᴀɴᴜᴀʟ ɪɴsᴛᴀʟʟᴀᴛɪᴏɴ

```ʙᴀsʜ
git https://github.com/Princetechx/phoenix-md
cd phoenix-md
npm install
node .
```

---

🔗 ᴜsᴇғᴜʟ ʟɪɴᴋs

[![Join Our WhatsApp Channel](https://img.shields.io/badge/Join%20Channel-WhatsApp-25D366?style=for-the-badge&logo=whatsapp)](https://whatsapp.com/channel/0029Vb6D2xV8kyyHNyDALh0i)
---

👑 Credits

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ sɪᴅ*  
> ᴄᴏɴᴛᴀᴄᴛ: `529633982655`

---

*©️ 2025 – ᴘʜᴏᴇɴɪx ᴍᴅ | ᴀʟʟ ʀɪɢʜᴛs ʀᴇsᴇʀᴠᴇᴅ*

