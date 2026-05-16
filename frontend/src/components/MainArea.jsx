
import {
  Bot,
  CloudSun,
  MapPinned,
  Users,
} from "lucide-react"

const MainArea = ({ userData }) => {

  const features=[
    {
      icon:<Bot size={30}/>,
      title:"AI Travel Assistant",
      description:"Ask AI for itineraries budgets, and destinations planning",
    },
    {
      icon:<CloudSun size={30}/>,
      title:"Realtime Weather",
      description:"Check live updates before planning your trips"
    },
    {
      icon: <MapPinned size={30} />,
      title: "Smart Place Suggestions",
      description:
        "Discover attractions, hidden gems, and travel spots.",
    },
    {
      icon: <Users size={30} />,
      title: "Realtime Group Chat",
      description:
        "Plan trips together with friends in realtime.",
    },
  ]

  return (

    <div className="min-h-[85vh] bg-black text-white px-10 py-10">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

      {/* Left side  */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {features.map((feature,index) =>(

                <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-cyan-500 transition-all duration-300 hover:shadow-cyan-500/10 hover:shadow-xl"

                >
                  <div className="text-cyan-400 mb-4">
                    {feature.icon}
                  </div>

                  <h2 className="text-2xl font-semibold mb-3">
                    {feature.title}
                  </h2>

                   <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>


                </div>

              ))}

      </div>

      {/* Right side pannel  */}

      <div className="flex items-center justify-center">

        <div  className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 w-full max-w-xl shadow-2xl">

          <div className="flex items-center gap-5 mb-10">

             <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center text-3xl font-bold text-black">

                {userData?.firstName[0]}

              </div>

              <div>

                <h1 className="text-4xl font-bold">
                  Welcome {userData?.firstName}
                </h1>

                <p className="text-gray-400 mt-2">

                  Ready to plan your next adventures
                </p>


              </div>

          </div>

          <div className="space-y-5">

  {/* Full Name */}
  <div className="bg-zinc-800 rounded-2xl p-5">

    <p className="text-gray-400 text-sm mb-1">
      Full Name
    </p>

    <h2 className="text-xl font-semibold">
      {userData?.firstName} {userData?.lastName}
    </h2>

  </div>

  {/* Email */}
  <div className="bg-zinc-800 rounded-2xl p-5">

    <p className="text-gray-400 text-sm mb-1">
      Email
    </p>

    <h2 className="text-xl font-semibold break-all text-white ">
      {userData?.email}
    </h2>

  </div>

</div>

        </div>

      </div>

      </div>

    </div>

  );

};

export default MainArea;