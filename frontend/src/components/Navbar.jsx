import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';
import toast from "react-hot-toast";
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    const { message } = await logout();
    toast.success(message);
  };

  return (
    <nav className='bg-[#2C2A27] flex justify-between items-center text-[#FFFCF2] px-6 py-4 md:px-12 md:py-6 shadow-lg'>
      <Link to={'/'} className='flex items-center space-x-3'>
        <img src={logoImg} alt='BookNest Logo' className='h-10 w-10 md:h-12 md:w-12 object-contain' />
        <span className='font-semibold tracking-wider md:text-2xl lg:text-3xl cursor-pointer hover:text-[#FFFCF2] transition-colors duration-300'>
          BookNest
        </span>
      </Link>
      {user ? (
        <div className='flex items-center space-x-6 md:text-lg'>
          <Link to={'/add-book'}>
            <p className='bg-[#FFFCF2] text-[#403D39] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#d1cfc6] transition-all duration-200'>
              Add Book
            </p>
          </Link>
          <p onClick={handleLogout} className='cursor-pointer hover:text-[#d1cfc6]'>
            Logout ({user.username})
          </p>
        </div>
      ) : (
        <div className='flex items-center space-x-6 md:text-lg'>
          <Link to={'/login'}>
            <p className='cursor-pointer hover:text-[#d1cfc6]'>Add Book</p>
          </Link>
          <Link to={'/login'}>
            <p className='cursor-pointer hover:text-[#d1cfc6]'>Login</p>
          </Link>
          <Link to={'/signup'}>
            <p className='bg-[#FFFCF2] text-[#403D39] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#d1cfc6] transition-all duration-200'>
              Sign Up
            </p>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;