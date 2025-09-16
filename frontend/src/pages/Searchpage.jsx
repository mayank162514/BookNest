import React, { useEffect, useState, useMemo } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useBookStore } from '../store/bookStore.js'

const Searchpage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()
  const { searchBooks, books } = useBookStore()

  const performSearch = async (term) => {
    if (!term.trim()) return
    setLoading(true)
    setError(null)
    try {
      await searchBooks(term)
    } catch (err) {
      setError('Failed to fetch books. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!searchTerm.trim()) return
    navigate(`/search?searchTerm=${encodeURIComponent(searchTerm)}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
      performSearch(searchTermFromUrl)
    }
  }, [location.search])

  const renderedBooks = useMemo(() => (
    books.map((book, index) => (
      <Link key={index} to={`/book/${book._id}`} className='block'>
        <div className='cursor-pointer w-36 md:w-40 xl:w-44 shadow-sm hover:shadow-md rounded-b-md overflow-hidden'>
          <div className='bg-gray-600 overflow-hidden'>
            <img
              src={book.image}
              alt={`${book.title} cover`}
              className='w-full h-auto object-contain transition-transform transform hover:scale-105 duration-300'
            />
          </div>
          <div className='p-2 text-center'>
            <h2 className='mb-2 font-semibold text-base md:text-lg'>{book.title}</h2>
            <p className='text-sm md:text-base text-gray-600'>{book.author}</p>
          </div>
        </div>
      </Link>
    ))
  ), [books])

  return (
    <div className='min-h-screen text-[#252422] bg-[#f5f5f5] px-4 md:px-12 pb-10'>
      <p
        className='cursor-pointer py-3 flex items-center text-[#403D39] font-medium text-xl hover:text-[#EB5E28] transition-colors duration-300'
        onClick={() => navigate('/')}
      >
        <span className="mr-2">←</span> Back
      </p>

      <div className='w-full h-full flex flex-col justify-center items-center'>
        <form onSubmit={handleSubmit} className='relative w-full max-w-sm md:max-w-xl lg:max-w-3xl text-base lg:text-lg'>
          <input
            aria-label="Search books"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder='e.g. Purple Hibiscus'
            className='w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-[#FFFCF2] border border-gray-500'
          />
          <button
            aria-label="Submit search"
            className='absolute right-0 top-0 bottom-0 bg-[#403D39] px-4 border border-white rounded-r-lg text-[#f5f5f5]'
          >
            Search
          </button>
        </form>
      </div>

      <h1 className='font-semibold pt-8 pb-6 text-xl md:text-2xl text-center'>Search results</h1>

      {loading ? (
        <p className='text-center'>Loading...</p>
      ) : error ? (
        <p className='text-center text-red-500'>{error}</p>
      ) : books.length > 0 ? (
        <div className='flex flex-wrap justify-center gap-5 lg:gap-8 w-full max-w-6xl mx-auto'>
          {renderedBooks}
        </div>
      ) : (
        <p className='text-center'>No books found</p>
      )}
    </div>
  )
}

export default Searchpage
