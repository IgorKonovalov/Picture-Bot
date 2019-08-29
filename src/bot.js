const getImageData = require('./getImageData');
const Telegraf = require('telegraf');
const imagesData = require('./imagesData.json');

const { toShow } = imagesData;

const bot = new Telegraf(process.env.BOT_TOKEN);

const sendImageAndYear = async ({
  LargeImageUrl,
  year,
  albumName,
  original
}) => {
  await bot.telegram.sendPhoto(process.env.CHANNEL_ID, LargeImageUrl, {
    parse_mode: 'HTML',
    caption: `${year} ${albumName} 
${original}`,
    disable_notification: true
  });
};

const replyWithImageAndYear = ({
  LargeImageUrl,
  year,
  albumName,
  ctx,
  original
}) => {
  ctx.replyWithPhoto(LargeImageUrl, {
    parse_mode: 'HTML',
    caption: `${year} ${albumName} 
${original}`
  });
};

(async () => {
  let randomPicIndex = Math.floor(Math.random() * toShow.length);

  const { albumName, LargeImageUrl, year, original } = await getImageData(
    toShow[randomPicIndex]
  );

  await sendImageAndYear({ LargeImageUrl, year, albumName, original });

  setInterval(async () => {
    randomPicIndex = Math.floor(Math.random() * toShow.length);
    const { albumName, LargeImageUrl, year } = await getImageData(
      toShow[randomPicIndex]
    );

    await sendImageAndYear({ LargeImageUrl, year, albumName });
  }, process.env.DELAY * 60 * 1000);
})();

bot.hears('end', () => {
  clearInterval(interval);
});

let interval;

bot.hears('Picture', async ctx => {
  let imageData;
  let individualRandomPicIndex = Math.floor(Math.random() * toShow.length);

  const { albumName, LargeImageUrl, year, original } = await getImageData(
    toShow[individualRandomPicIndex]
  );

  replyWithImageAndYear({
    albumName,
    LargeImageUrl,
    year,
    original,
    ctx
  });
});

bot.launch().then(() => console.log('bot is started'));
