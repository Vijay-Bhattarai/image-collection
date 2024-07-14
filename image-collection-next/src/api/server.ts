import axios from 'axios';

const fetchImages = async (page = 1, perPage = 10) => {
  try {
    const response = await axios.get('https://api.unsplash.com/photos', {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      },
      params: {
        page: page,
        per_page: perPage
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images from Unsplash', error);
    return [];
  }
};

export default fetchImages;
