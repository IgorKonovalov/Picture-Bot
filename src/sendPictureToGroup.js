const getImageData = require('./getImageData');
const imagesData = require('./data/imagesData.json');
const bot = require('./initializeBot.js');

const { toShow } = imagesData;

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

sendPicture();
