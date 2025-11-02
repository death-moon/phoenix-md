

const axios = require('axios');
const { cmd, commands } = require('../command');

cmd({
    pattern: "cosplay",
    desc: "Fetch a random cosplay picture.",
    category: "fun",
    react: "🎭",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        // URL de l'API
        const apiUrl = `https://fantox-cosplay-api.onrender.com/`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        // Validation de la réponse
        if (data && data.url) {
            // Envoi de l'image
            await conn.sendMessage(from, {
                image: { url: data.url },
                caption: "Here is your random cosplay picture! 🎭",
            }, { quoted: mek });
        } else {
            reply("Error: The API response is invalid. Could not fetch a cosplay picture.");
        }
    } catch (e) {
        // Gestion détaillée des erreurs
        if (e.response) {
            // Erreur renvoyée par l'API (ex. : 404, 500)
            reply(`API Error: ${e.response.status} - ${e.response.data?.message || 'No message provided by the server'}`);
        } else if (e.request) {
            // Erreur réseau : pas de réponse du serveur
            reply(
                "Network Error: The API server is not responding. Possible reasons:\n" +
                "- The server may be down or temporarily unavailable.\n" +
                "- There may be an issue with your internet connection.\n\n" +
                "Please check your internet connection and try again later."
            );
        } else {
            // Autre erreur
            reply(`Unexpected Error: ${e.message}`);
        }
    }
});
cmd({
    pattern: "neko",
    desc: "Fetch a random neko picture.",
    category: "fun",
    react: "🐱",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        // URL de l'API
        const apiUrl = `https://api.waifu.pics/sfw/neko`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        // Validation de la réponse
        if (data && data.url) {
            // Envoi de l'image avec le caption
            await conn.sendMessage(from, {
                image: { url: data.url },
                caption: "Here is your random neko picture! 🐱",
            }, { quoted: mek });
        } else {
            reply("Error: The API response is invalid. Could not fetch a neko picture.");
        }
    } catch (e) {
        // Gestion détaillée des erreurs
        if (e.response) {
            // Erreur renvoyée par l'API (ex. : 404, 500)
            reply(`API Error: ${e.response.status} - ${e.response.data?.message || 'No message provided by the server'}`);
        } else if (e.request) {
            // Erreur réseau : pas de réponse du serveur
            reply(
                "Network Error: The API server is not responding. Possible reasons:\n" +
                "- The server may be down or temporarily unavailable.\n" +
                "- There may be an issue with your internet connection.\n\n" +
                "Please check your internet connection and try again later."
            );
        } else {
            // Autre erreur
            reply(`Unexpected Error: ${e.message}`);
        }
    }
});
cmd({
    pattern: "waifu",
    desc: "Fetch a random waifu picture.",
    category: "fun",
    react: "💖",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        // URL de l'API
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        // Validation de la réponse
        if (data && data.url) {
            // Envoi de l'image avec le caption
            await conn.sendMessage(from, {
                image: { url: data.url },
                caption: "Here is your random waifu picture! 💖",
            }, { quoted: mek });
        } else {
            reply("Error: The API response is invalid. Could not fetch a waifu picture.");
        }
    } catch (e) {
        // Gestion détaillée des erreurs
        if (e.response) {
            // Erreur renvoyée par l'API (ex. : 404, 500)
            reply(`API Error: ${e.response.status} - ${e.response.data?.message || 'No message provided by the server'}`);
        } else if (e.request) {
            // Erreur réseau : pas de réponse du serveur
            reply(
                "Network Error: The API server is not responding. Possible reasons:\n" +
                "- The server may be down or temporarily unavailable.\n" +
                "- There may be an issue with your internet connection.\n\n" +
                "Please check your internet connection and try again later."
            );
        } else {
            // Autre erreur
            reply(`Unexpected Error: ${e.message}`);
        }
    }
});