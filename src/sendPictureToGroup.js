const getImageData = require('./getImageData');
const Telegraf = require('telegraf');
const imagesData = require('./imagesData.json');

const { toShow } = imagesData;

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.launch().then(() => console.log('bot is started'));

const sendImageAndYear = async ({
  LargeImageUrl,
  year,
  albumName,
  original
}) => {
  await bot.telegram.sendPhoto(process.env.CHANNEL_ID, LargeImageUrl, {
    parse_mode: 'HTML',
    caption: `${year} ${albumName} 
<a href="${original}">Original</a>`,
    disable_notification: true
  });
};

const sendPicture = async () => {
  let randomPicIndex = Math.floor(Math.random() * toShow.length);

  const { albumName, LargeImageUrl, year, original } = await getImageData(
    toShow[randomPicIndex]
  );

  await sendImageAndYear({ LargeImageUrl, year, albumName, original });
};

sendPicture()
  .then(() => {
    console.log('image is sent, stopping bot now');
    bot.stop();
  })
  .then(() => {
    console.log('bot stopped');
    process.exit();
  });
