import axios from 'axios';

const fetchSingleImages = async (imageIds) => {
  try {
    
    const images = await Promise.all(
      imageIds.map(async (imageId) => {
        const response = await axios.get(`https://api.unsplash.com/photos/${imageId}`, {
          headers: {
            Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
          },
        });
        return response.data;
      })
    );
    return images;
  } catch (error) {
    console.error('Error fetching images from Unsplash', error);
    return []; 
  }
};

export default fetchSingleImages;
