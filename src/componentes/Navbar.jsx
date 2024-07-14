import React from 'react'

const Navbar = () => {
  return (
    <nav>
        <ul className='flex justify-around h-10 bg-slate-500'>
          <li><span className='text-green-600 text-2xl font-bold '>&lt;</span><span className='font-bold text-xl'>Pass</span><span className='text-green-600 text-xl font-bold '>OP/</span><span className='text-green-600 text-2xl font-bold '>&gt;</span></li>
          <li className='flex flex-row cursor-pointer'><img src="./github.png" alt="github Image" className='w-7 invert-1 my-2 rounded-md invert-1'/><span className='py-1 px-2 font-bold text-xl'>Github</span></li>
        </ul>
  
    </nav>
  )
}

export default Navbar