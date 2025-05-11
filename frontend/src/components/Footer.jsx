import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="mt-auto text-[#252422] bg-[#f5f5f5] px-4 md:px-12 md:text-lg">
      <h3 className="border-t border-[#252422] pt-4 pb-6 italic">
        Designed and developed by 
        <Link to={'/mayankpatel251104@gmail.com'} className="text-[#944424] ml-1">
          Mayank Patel
        </Link>
      </h3>
    </footer>
  )
}

export default Footer;
