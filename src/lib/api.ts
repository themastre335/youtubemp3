import axios from 'axios';

const API_KEY = 'd1c53133acmsh2e7c470c0bfbb2ep1a074cjsne9dd522da151';
const API_HOST = 'youtube-mp3-downloader2.p.rapidapi.com';

export async function convertVideo(url: string) {
  try {
    const response = await axios.get('https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/', {
      params: { url },
      headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error converting video:', error);
    throw error;
  }
}