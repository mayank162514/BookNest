import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useBookStore } from '../store/bookStore'
import { useNavigate, useParams } from 'react-router'
import { ArrowLeft } from 'lucide-react'

const UpdateBook = () => {
  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [author, setAuthor] = useState('')
  const [link, setLink] = useState('')
  const [review, setReview] = useState('')
  const { updateBook, isLoading, error, fetchBook, book } = useBookStore()
  const navigate = useNavigate()
  const params = useParams()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    let reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onloadend = function () {
      setImage(reader.result)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !author || !link) {
      toast.error('Please fill required details')
      return
    }

    const { message } = await updateBook(
      params.id,
      image,
      title,
      subtitle,
      author,
      link,
      review,
    )

    toast.success(message)
    navigate(`/book/${book._id}`)
  }

  useEffect(() => {
    fetchBook(params.id)
  }, [fetchBook, params.id])

  useEffect(() => {
    if (book) {
      setTitle(book.title)
      setSubtitle(book.subtitle)
      setAuthor(book.author)
      setLink(book.link)
      setReview(book.review)
      setImage(book.image)  // Initial image preview
    }
  }, [book])

  return (
    <div className='min-h-screen bg-[#f5f5f5] px-6 md:px-12 pb-16'>

      <button onClick={() => navigate(-1)} className="flex items-center text-gray-700 pt-4 hover:text-[#EB5E28] transition-all mb-4">
        <ArrowLeft size={24} className="mr-2" />
        <span className="text-lg font-medium">Back</span>
      </button>

      <h2 className='text-center font-semibold pt-4 text-3xl text-[#403D39]'>Update Book</h2>

      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-full max-w-4xl mx-auto space-y-6 mt-10 bg-white p-8 rounded-lg shadow-md'>

        {/* Book Image Section */}
        <div className='flex flex-col w-full'>
          <label className='md:text-lg text-[#403D39]'>Book Image*:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className='w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg' />
          {image && <img src={image} alt="Preview" className='mt-4 max-w-xs mx-auto rounded-md' />}
        </div>

        {/* Title Section */}
        <div className='flex flex-col w-full'>
          <label className='md:text-lg text-[#403D39]'>Title*:</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className='w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg' type="text" />
        </div>

        {/* Subtitle Section */}
        <div className='flex flex-col w-full'>
          <label className='md:text-lg text-[#403D39]'>Subtitle (optional):</label>
          <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className='w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg' type="text" />
        </div>

        {/* Author Section */}
        <div className='flex flex-col w-full'>
          <label className='md:text-lg text-[#403D39]'>Author*:</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} className='w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg' type="text" />
        </div>

        {/* Link Section */}
        <div className='flex flex-col w-full'>
          <label className='md:text-lg text-[#403D39]'>Link*:</label>
          <input value={link} onChange={(e) => setLink(e.target.value)} className='w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg' type="text" />
        </div>

        {/* Review Section */}
        <div className='flex flex-col w-full'>
          <label className='md:text-lg text-[#403D39]'>Personal Review (optional):</label>
          <textarea rows={4} value={review} onChange={(e) => setReview(e.target.value)} className='w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg' />
        </div>

        {error && <p className='text-red-500 text-center'>{error}</p>}
        
        <button type='submit' disabled={isLoading} className='w-full bg-[#403D39] text-white py-3 mt-6 font-semibold rounded-lg hover:bg-[#EB5E28] transition-all'>
          {isLoading ? 'Updating...' : 'Update Book'}
        </button>

      </form>
    </div>
  )
}

export default UpdateBook
