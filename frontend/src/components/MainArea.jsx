const MainArea = ({ userData }) => {

  return (

    <div className="flex items-center justify-center min-h-[85vh] bg-black text-white px-10 py-10">

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 w-full max-w-2xl shadow-2xl">

        {/* Top Section */}
        <div className="flex items-center gap-5 mb-10">

          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center text-3xl font-bold text-black">

            {userData?.firstName?.[0]}

          </div>

          {/* Welcome Text */}
          <div>

            <h1 className="text-4xl font-bold">
              Welcome {userData?.firstName}
            </h1>

            <p className="text-gray-400 mt-2">
              Ready to plan your next adventure?
            </p>

          </div>

        </div>

        {/* User Info */}
        <div className="space-y-5">

          {/* Full Name */}
          <div className="bg-zinc-800 rounded-2xl p-5">

            <p className="text-gray-400 text-sm mb-1">
              Full Name
            </p>

            <h2 className="text-xl font-semibold text-white">
              {userData?.firstName} {userData?.lastName}
            </h2>

          </div>

          {/* Email */}
          <div className="bg-zinc-800 rounded-2xl p-5">

            <p className="text-gray-400 text-sm mb-1">
              Email
            </p>

            <h2 className="text-xl font-semibold break-all text-white">
              {userData?.email}
            </h2>

          </div>

        </div>

      </div>

    </div>

  );

};

export default MainArea;