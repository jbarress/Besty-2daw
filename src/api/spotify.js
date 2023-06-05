require('dotenv').config();
const axios = require('axios');
let ACCESS_TOKEN = null;

async function getTrackId(title, artist) {
  if (!ACCESS_TOKEN) {
    await actualizarTokenAcceso();
  }

  const response = await axios.get('https://api.spotify.com/v1/search', {
    params: {
      q: `${title} ${artist}`,
      type: 'track'
    },
    headers: {
      Authorization: 'Bearer ' + ACCESS_TOKEN
    }
  });

  if (response.data && response.data.tracks && response.data.tracks.items && response.data.tracks.items.length > 0) {
    return response.data.tracks.items[0].id;
  } else {
    return null;
  }
}

async function actualizarTokenAcceso() {
  const CLIENT_ID = process.env.ACCES_TOKEN_SPOTIFY_CLIENT;
  const CLIENT_SECRET = process.env.ACCES_TOKEN_SPOTIFY_SECRET;
  const response = await axios.post('https://accounts.spotify.com/api/token', null, {
    params: {
      grant_type: 'client_credentials'
    },
    headers: {
      'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
    }
  });
  ACCESS_TOKEN = response.data.access_token;
}

module.exports = getTrackId;
