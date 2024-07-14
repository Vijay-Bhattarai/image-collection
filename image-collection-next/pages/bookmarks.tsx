import { getBookmarks } from '@/api/auth';
import fetchSingleImages from '@/api/image';

import ImageCard from '@/components/ImageCard';
import Layout from '@/components/Layout';
import { useState, useEffect } from 'react';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);


  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const data = await getBookmarks(); // Fetch bookmarks
        setBookmarks(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch bookmarks');
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  useEffect(() => {
    const fetchBookmarkImages = async () => {
      try {
        const imageIds = bookmarks.map(bookmark => bookmark.image_id); // Extract image IDs from bookmarks
        const images = await fetchSingleImages(imageIds); // Fetch images from Unsplash based on image IDs
        console.log('Fetched images:', images);
        setImages(images);
      } catch (error) {
        console.error('Failed to fetch images from Unsplash', error);
      }
    };

    if (bookmarks.length > 0) {
      console.log(bookmarks)
      fetchBookmarkImages();
    }
  }, [bookmarks]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Layout>
      
      {bookmarks.length === 0 ? (
        <p>No bookmarks found.</p>
      ) : (
        <div>
            <h1 className="text-3xl font-bold text-center my-8">BookMarked Images</h1>
            <div className="flex flex-wrap justify-center">
                {images.map((image) => (
                <ImageCard key={image.id} image={image} />
                ))}
            </div>
        </div>
        
      )}
      </Layout>
    </>
  );
};

export default Bookmarks;
