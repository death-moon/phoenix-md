/*
ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ ɪɴᴄ

ᴀɴʏᴡᴀʏ, ʏᴏᴜ ᴍᴜsᴛ ɢɪᴠᴇ ᴄʀᴇᴅɪᴛ ᴛᴏ ᴍʏ ᴄᴏᴅᴇ ᴡʜᴇɴ ᴄᴏᴘʏ ɪᴛ
ᴄᴏɴᴛᴀᴄᴛ ᴍᴇ ʜᴇʀᴇ +529633982655
ɢɪᴛʜᴜʙ: ᴘʀɪɴᴄᴇxᴛʀᴇᴍᴇ
*/
var commands = [];

function cmd(info, func) {
    var data = info;
    data.function = func;
    if (!data.dontAddCommandList) data.dontAddCommandList = false;
    if (!info.desc) info.desc = '';
    if (!data.fromMe) data.fromMe = false;
    if (!info.category) data.category = 'misc';
    if(!info.filename) data.filename = "Not Provided";
    commands.push(data);
    return data;
}
module.exports = {
    cmd,
    AddCommand:cmd,
    Function:cmd,
    Module:cmd,
    commands,
};
