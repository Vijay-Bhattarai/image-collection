"use client";

import { useEffect, useState } from 'react';
import ImageCard from '../components/ImageCard';
import fetchImages from '@/api/server';

const ImagesPage = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getImages = async () => {
    try {
      setLoading(true);
      const newImages = await fetchImages(page, 10); // Fetch 10 images per page
      setImages(prevImages => [...prevImages, ...newImages]);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch images');
      setLoading(false);
    }
  };

  useEffect(() => {
    getImages();
  }, [page]);

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-8">Welcome to image Collection</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="flex flex-wrap justify-center">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
      <div className="flex justify-center my-8">
        <button
          onClick={loadMoreImages}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
};

export default ImagesPage;
