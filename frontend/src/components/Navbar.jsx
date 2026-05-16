import React from 'react'

const Navbar = ({userData}) => {

  console.log(userData)

  return (
    <div className='border-b border-zinc-800 px-10 py-5  flex items-center justify-between bg-black'>
      
      {/* Logo */}

     <div className="text-3xl font-bold text-white">

       <h1 className='text-3xl font-bold text-white'>
        TripSyncAi
      </h1>

      <h2 className='text-lg font-semibold text-white'>
        {userData?.firstName} {userData?.lastName}
      </h2>

      {/* <p className='text-sm text-gray-400'>
        {userData?.email}
      </p> */}

     </div>

    </div>
  )
}

export default Navbar
