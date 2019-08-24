require('dotenv').config();

const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(ctx => ctx.reply('Welcome'));
bot.launch().then(() => console.log('bot is started'));
