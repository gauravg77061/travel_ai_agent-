import React from 'react'

const Navbar = ({userData}) => {

  // console.log(userData)

  return (
   <div className="border-b border-zinc-800 px-8 py-4 flex items-center justify-between bg-black">

  {/* Logo */}
  <h1 className="text-4xl font-extrabold tracking-tight text-white">

    TripSync
    <span className="text-cyan-400">
      AI
    </span>

  </h1>

  {/* User */}
  <div className="text-right">

    <h2 className="text-lg font-semibold text-white">
      {userData?.firstName} {userData?.lastName}
    </h2>

  </div>

</div>
  )
}

export default Navbar
