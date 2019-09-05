const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.launch().then(() => console.log('bot is started'));

module.exports = bot;
