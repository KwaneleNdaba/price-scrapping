"use client"
import React from 'react'

function Searchbar() {
  
  const handleSubmit = () => {

  }
    return (
    <form onSubmit={handleSubmit}  className='flex flex-wrap gap-4 mt-12'>
        <input type='text' placeholder='Enter product link' className='searchbar-input' />

        <button type='submit'  className='searchbar-btn'>
            Search
        </button>
    </form>
  )
}

export default Searchbar
