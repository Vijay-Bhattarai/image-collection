import { bookmarkImage, removeBookmark } from '@/api/auth';
import { useState } from 'react';

const ImageCard = ({ image }) => {
  const [bookmarked, setBookmarked] = useState(false);
 // Check if the route is '/bookmarks'
 const isBookmarksRoute = window.location.pathname === '/bookmarks';

  const handleBookmark = async () => {
    try {
      const imageId = image.id;
      if (isBookmarksRoute) {
        const response = await removeBookmark(imageId);
        console.log('Bookmark removed:', response);
        alert('Bookmark removed!');
        window.location.reload();
      } else {
        const response = await bookmarkImage(imageId);
        console.log('Bookmark successful:', response);
        alert('Bookmark registered!');
      }
      setBookmarked(!bookmarked);
    } catch (error) {
      alert('Error bookmarking');
    }
  };

 

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4">
      <img 
        className="w-400" 
        src={image.urls.small} 
        alt={image.alt_description || "Untitled"} 
        style={{ width: '400px', height: '300px', objectFit: 'cover' }}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{image.alt_description || "Untitled"}</div>
      
        {!isBookmarksRoute && (
          <button
            onClick={handleBookmark}
            className={`px-4 py-2 rounded ${bookmarked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {bookmarked ? 'Remove Bookmark' : 'Bookmark'}
          </button>
        )}
         {isBookmarksRoute && (
          <button
            onClick={handleBookmark}
            className={`px-4 py-2 rounded ${bookmarked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {'Remove Bookmark'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
