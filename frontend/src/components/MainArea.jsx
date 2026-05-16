const MainArea = ({ userData }) => {

  return (

    <div className="flex-1 min-h-[90vh] bg-gradient-to-br from-black via-zinc-950 to-black text-white p-10">

      {/* Top Greeting */}
      <div className="mb-8">

        <h1 className="text-5xl font-bold tracking-tight">

          Welcome back,
          <span className="text-cyan-400">
            {" "} {userData?.firstName}
          </span>

        </h1>

        <p className="text-zinc-400 mt-3 text-lg">

          Start planning trips, chatting with friends, and exploring destinations together.

        </p>

      </div>

      {/* Main Card */}
      <div className="bg-zinc-900/80 backdrop-blur-lg border border-zinc-800 rounded-[32px] p-10 max-w-4xl shadow-2xl shadow-cyan-500/5">

        {/* Header */}
        <div className="flex items-center gap-6 mb-10">

          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-4xl font-bold text-black shadow-lg">

            {userData?.firstName?.[0]}

          </div>

          {/* User Info */}
          <div>

            <h2 className="text-4xl font-bold">

              {userData?.firstName} {userData?.lastName}

            </h2>

            <p className="text-zinc-400 mt-2 text-lg">

              Ready for your next adventure ✈️

            </p>

          </div>

        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Full Name */}
          <div className="bg-zinc-800/80 border border-zinc-700 rounded-3xl p-6 hover:border-cyan-500 transition-all duration-300">

            <p className="text-zinc-400 text-sm mb-2 uppercase tracking-wide">

              Full Name

            </p>

            <h2 className="text-2xl font-semibold text-white">

              {userData?.firstName} {userData?.lastName}

            </h2>

          </div>

          {/* Email */}
          <div className="bg-zinc-800/80 border border-zinc-700 rounded-3xl p-6 hover:border-cyan-500 transition-all duration-300">

            <p className="text-zinc-400 text-sm mb-2 uppercase tracking-wide">

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