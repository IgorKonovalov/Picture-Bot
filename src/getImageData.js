const axios = require('axios');
const WEB_LOOKUP_URL = 'api/v2!weburilookup?WebUri=';

const axiosInstance = axios.create({
  baseURL: 'https://www.smugmug.com/',
  headers: { Accept: 'application/json' }
});

module.exports = async function getImageData(imageUrl) {
  let albumName;
  let year;
  let LargeImageUrl;
  let tags;

  try {
    const lookupData = await axiosInstance.get(
      `${WEB_LOOKUP_URL}${imageUrl}&APIKey=${process.env.SMUGMUG_TOKEN}`
    );

    // lookup for album name
    const { data } = lookupData;
    const albumUri = data.Response.AlbumImage.Uris.Album.Uri;
    const albumData = await axiosInstance.get(
      `${albumUri}?APIKey=${process.env.SMUGMUG_TOKEN}`
    );

    const { UrlPath } = albumData.data.Response.Album;

    // base album is always year of image shot
    const yearData = /^\/(.+)\//.exec(UrlPath);
    year = (yearData && yearData[1]) || '';

    albumName = albumData.data.Response.Album.Name;

    tags = albumName
      .split(' ')
      .pop()
      .split('-')
      .map(el => el.toLowerCase());

    // lookup for image sizes
    const imageSizesUrl = data.Response.AlbumImage.Uris.ImageSizes.Uri;
    const imageSizes = await axiosInstance.get(
      `${imageSizesUrl}?APIKey=${process.env.SMUGMUG_TOKEN}`
    );

    LargeImageUrl = imageSizes.data.Response.ImageSizes.LargeImageUrl;
  } catch (e) {
    console.log(e);
  }

  return { albumName, LargeImageUrl, year, original: imageUrl, tags };
};
