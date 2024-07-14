import axios from 'axios';
import { headers } from 'next/headers';

const API_BASE_URL = 'http://127.0.0.1:8000/api/'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (userData:any) => {
  try {
    const response = await api.post('/register/', userData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (userData:any) => {
  try {
    const response = await api.post('/login/', userData);
    console.log('login',response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const bookmarkImage = async (imageId:string) => {
    try {
        const userId=1;
        const token = localStorage.getItem('token');

        if (!token) {
          window.location.replace('/login');
        }
        const response = await api.post('/bookmark/', { image_id: imageId, user: userId }, {
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json',
            },
          });
      return response.data;
    } catch (error) {
      return error;
    }
  };

export const getBookmarks = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
          window.location.replace('/login');
        }
      // Set token in axios instance headers  
      const response = await api.get('/bookmark/', {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const removeBookmark = async (imageId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.delete(`/bookmarks/delete/${imageId}/`, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error removing bookmark');
  }
};