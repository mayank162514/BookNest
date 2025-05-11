import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useBookStore } from '../store/bookStore.js'

const BookList = () => {
  const { books, fetchBooks } = useBookStore()
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    fetchBooks()
  }, [fetchBooks])

  // Show only one row (let's assume 4 books for the row)
  const visibleBooks = showAll ? books : books.slice(0, 4)

  return (
    <div className="text-[#252422] bg-[#f5f5f5] px-4 md:px-12 pb-20">
      <h1 className="py-6 text-2xl md:text-3xl lg:text-4xl font-semibold text-center">Reader’s Favourites</h1>

      <div className="flex flex-wrap justify-center gap-6 lg:gap-10 w-full max-w-6xl mx-auto">
        {visibleBooks.map((book, index) => (
          <Link key={index} to={`/book/${book._id}`} className="block">
            <div className="cursor-pointer w-40 md:w-44 xl:w-48 shadow-md hover:shadow-lg rounded-lg overflow-hidden bg-white transition-transform transform hover:scale-105 duration-300">
              <div className="h-52 md:h-56 xl:h-64 bg-gray-300 overflow-hidden relative">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-contain transition-transform transform hover:scale-105 duration-300"
                  loading="lazy"
                />
              </div>

              <div className="p-3 text-center">
                <h2 className="mb-1 font-semibold text-base md:text-lg">{book.title}</h2>
                <p className="text-sm md:text-base text-gray-600">{book.author}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Show 'See More' or 'Show Less' button if books are more than 4 */}
      {books.length > 4 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-[#252422] text-white rounded-lg hover:bg-[#403f3f] transition duration-300"
          >
            {showAll ? 'Show Less' : 'See More'}
          </button>
        </div>
      )}
    </div>
  )
}

export default BookList
