import { registerUser } from '@/api/auth';
import { revalidatePath } from 'next/cache';
import { useState } from 'react';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e:any) => {
    e.preventDefault();
    setError('');

    try {
      const userData = { username,email, password };
      const response = await registerUser(userData);
      console.log('Registration successful:', response);
      alert('Sucessfully Registered !!');

      // Redirect to login
      window.location.replace("/login");
    } catch (error) {
      setError( 'Failed to register');
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-sm mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
    <h2 className="text-2xl font-bold mb-6">Register</h2>
    {error && <p className="text-red-500 mb-4">{error}</p>}
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Register
    </button>
  </form>
  );
};

export default RegisterForm;
