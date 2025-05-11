import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useBookStore } from '../store/bookStore'
import { useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'

const AddBook = () => {

  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [author, setAuthor] = useState('')
  const [link, setLink] = useState('')
  const [review, setReview] = useState('')
  const { addBook, isLoading, error } = useBookStore()
  const navigate = useNavigate()

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
    if (!image || !title || !author || !link) {
      toast.error('Please fill required details')
    }

    const { message } = await addBook(
      image,
      title,
      subtitle,
      author,
      link,
      review,
    )

    toast.success(message)
    navigate('/')
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#f5f5f5] to-[#e3e3e3] px-4 md:px-12 py-16'>

      <button onClick={() => navigate(-1)} className="flex items-center text-gray-700 hover:text-[#EB5E28] transition-all mb-4">
        <ArrowLeft size={24} className="mr-2" />
        <span className="text-lg font-medium">Back</span>
      </button>

      <h2 className='text-center text-4xl font-semibold text-[#333] mb-8'>Add Book to Library</h2>

      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-full max-w-xl mx-auto space-y-6 bg-white p-8 rounded-lg shadow-lg'>
        {/* Image Upload */}
        <div className='flex flex-col w-full'>
          <label className='md:text-lg font-medium text-[#333]'>Book Image*:</label>
          <div className='flex items-center justify-center w-full'>
            <input type="file" accept="image/*" onChange={handleImageChange} className='w-full px-3 py-2 text-[#252422] rounded-lg bg-[#f7f7f7] border border-gray-300 shadow-sm' />
          </div>
        </div>

        {/* Title */}
        <div className='flex flex-col w-full'>
          <label className='md:text-lg font-medium text-[#333]'>Title*:</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className='w-full px-4 py-2 text-[#252422] rounded-lg bg-[#f7f7f7] border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#403D39]' type="text" />
        </div>

        {/* Subtitle */}
        <div className='flex flex-col w-full'>
          <label className='md:text-lg font-medium text-[#333]'>Subtitle (optional):</label>
          <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className='w-full px-4 py-2 text-[#252422] rounded-lg bg-[#f7f7f7] border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#403D39]' type="text" />
        </div>

        {/* Author */}
        <div className='flex flex-col w-full'>
          <label className='md:text-lg font-medium text-[#333]'>Author*:</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} className='w-full px-4 py-2 text-[#252422] rounded-lg bg-[#f7f7f7] border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#403D39]' type="text" />
        </div>

        {/* Link */}
        <div className='flex flex-col w-full'>
          <label className='md:text-lg font-medium text-[#333]'>Link*:</label>
          <input value={link} onChange={(e) => setLink(e.target.value)} className='w-full px-4 py-2 text-[#252422] rounded-lg bg-[#f7f7f7] border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#403D39]' type="text" />
        </div>

        {/* Personal Review */}
        <div className='flex flex-col w-full'>
          <label className='md:text-lg font-medium text-[#333]'>Personal Review (optional):</label>
          <textarea rows={4} value={review} onChange={(e) => setReview(e.target.value)} className='w-full px-4 py-2 text-[#252422] rounded-lg bg-[#f7f7f7] border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#403D39]' />
        </div>

        {error && <p className='text-red-500 text-center'>{error}</p>}

        <button type='submit' disabled={isLoading} className='w-full bg-[#403D39] text-[#FFFCF2] py-2 font-medium rounded-lg shadow-md hover:bg-[#5A534B] focus:outline-none focus:ring-2 focus:ring-[#FFFCF2]'>
          {isLoading ? 'Please Wait...' : 'Add Book'}
        </button>
      </form>
    </div>
  )
}

export default AddBook
