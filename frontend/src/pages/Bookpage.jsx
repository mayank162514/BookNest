import React, { useEffect, useState, useRef } from 'react'
import { useBookStore } from '../store/bookStore.js'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuthStore } from '../store/authStore.js'
import toast from 'react-hot-toast'
import optionsImg from '../assets/options_img.png'

const Bookpage = () => {
  const { user } = useAuthStore()
  const { fetchBook, deleteBook, book, isLoading } = useBookStore()
  const params = useParams()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const optionsRef = useRef(null) 

  useEffect(() => {
    fetchBook(params.id)
  }, [fetchBook, params])


  if (isLoading) {
    return <p className="text-center text-xl font-semibold">Loading...</p>
  }

  const handleDelete = async () => {
    const { message } = await deleteBook(params.id)
    toast.success(message)
    navigate('/')
  }

  return (
    <div className='min-h-screen text-[#252422] bg-[#f5f5f5] px-4 md:px-12 pb-10'>
      <p
        className='cursor-pointer py-3 flex items-center text-[#403D39] font-medium text-xl hover:text-[#EB5E28] transition-colors duration-300'
        onClick={() => navigate('/')}
      >
        <span className="mr-2">←</span> Back
      </p>

      <div className='flex flex-col md:flex-row'>
        {/* Book Image Section */}
        <div className='md:basis-[30%] md:mr-6 mx-auto w-full'>
          <img src={book?.image} alt={book?.title} className='max-h-[50vh] mx-auto rounded-lg shadow-md' />
          <Link to={book?.link} target='_blank'>
            <div className='w-full flex justify-center items-center'>
              <button className='bg-[#403D39] text-white px-6 py-3 w-full md:max-w-52 mt-3 font-semibold rounded-md hover:bg-[#EB5E28] transition-all'>
                BUY
              </button>
            </div>
          </Link>
        </div>

        {/* Book Details Section */}
        <div className='basis-[65%] mt-6 md:mt-0 md:max-w-4xl'>
          <div className='flex justify-between items-center mb-4'>
            <p className='text-xl text-[#403D39]'>Uploaded by: <span className='text-[#944424]'>@{book?.user.username}</span></p>
            {user?._id === book?.user?._id && (
              <div className='relative'>
                <span onClick={() => setOpen(!open)} className='cursor-pointer text-3xl font-bold hover:text-[#EB5E28]'>
                  <img src={optionsImg} alt="options" className='w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12' />
                </span>
                {open && (
                  <div ref={optionsRef} className='absolute bg-white shadow-lg rounded-md right-0 top-10 z-10'>
                    <Link to={`/book/${book._id}/update`}>
                      <p className='text-lg p-2 hover:bg-[#EB5E28] cursor-pointer rounded-t-md'>Update</p>
                    </Link>
                    <p onClick={handleDelete} className='text-red-500 text-lg p-2 cursor-pointer hover:bg-[#ffcccc] rounded-b-md'>
                      Delete
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <h1 className='text-3xl md:text-4xl lg:text-5xl font-semibold mb-4'>{book?.title}</h1>
          {book?.subtitle && <h3 className='text-xl font-medium text-[#403D39] mb-2'>{book?.subtitle}</h3>}
          <p className='text-2xl md:text-xl font-semibold'>Written by: <span className='font-semibold'>{book?.author}</span></p>
          <p className='mt-4 font-semibold text-lg md:text-2xl'>Review:</p>
          <p className='md:text-xl'>{book?.review}</p>
        </div>
      </div>
    </div>
  )
}

export default Bookpage;
