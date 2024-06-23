const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const TOKEN = '';
const TARGET_USER_ID = '852612335415459921'; // Efepltt'in Discord ID'si
const WEBHOOK_URL = 'http://localhost:3000/activity'; // Sunucu URL'nizi buraya ekleyin

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences] });

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('presenceUpdate', async (oldPresence, newPresence) => {
    if (newPresence.userId === TARGET_USER_ID) {
        const spotifyActivity = newPresence.activities.find(activity => activity.name === 'Spotify');
        
        if (spotifyActivity) {
            const activityData = {
                userId: TARGET_USER_ID,
                activities: [{
                    name: spotifyActivity.name,
                    details: spotifyActivity.details,
                    state: spotifyActivity.state,
                    timestamps: spotifyActivity.timestamps,
                    assets: spotifyActivity.assets
                }]
            };
        }
    }
});

client.login(TOKEN);
