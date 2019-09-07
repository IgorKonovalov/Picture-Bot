const getImageData = require('./getImageData');
const imagesData = require('./data/imagesData.json');
const bot = require('./initializeBot.js');

const { toShow } = imagesData;

const sendImageAndYear = async ({
  LargeImageUrl,
  year,
  albumName,
  original,
  tags
}) => {
  const tagsString = tags.map(el => `#${el}`).join(' ');

  await bot.telegram.sendPhoto(process.env.CHANNEL_ID, LargeImageUrl, {
    parse_mode: 'HTML',
    caption: `${year} ${albumName} 
<a href="${original}">Original</a>
${tagsString}`,
    disable_notification: true
  });
};

const sendPicture = async counter => {
  let randomPicIndex = Math.floor(Math.random() * toShow.length);

  const { albumName, LargeImageUrl, year, original, tags } = await getImageData(
    toShow[randomPicIndex]
  );

  await sendImageAndYear({ LargeImageUrl, year, albumName, original, tags });

  return counter;
};

const sendPictureGenerator = async function*() {
  for (let i = 0; i <= process.env.IMAGES_COUNT; i++) {
    yield await sendPicture(i);
  }
};

const sendPictureIterator = sendPictureGenerator();

(async function() {
  for await (const pictureCount of sendPictureIterator) {
    console.log(`picture number ${pictureCount} sent`);
  }
})();
