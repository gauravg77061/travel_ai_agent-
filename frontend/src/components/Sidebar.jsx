import React, { useEffect, useState } from "react";

import axios from "axios";



import BASE_URL from "../services/axios";

const Sidebar =()=>{

    const[groups,setGroups]=useState([])

    const fetchGroups = async () =>{
        try {
            
            const response = await axios.get(BASE_URL+"group/all",{withCredentials:true,});

            // console.log(response.data.data)

            setGroups(response.data.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchGroups();
    },[])

    return(
        <div  className="w-[320px] min-h-[90vh] bg-zinc-950/95 backdrop-blur-xl border-r border-zinc-800 p-5 overflow-y-auto">
           
           <div className="text-2xl font-bold text-white mb-6">

            Your Groups

           </div>

           <div className="space-y-3 mb-6">
             <button className="w-full bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-black font-semibold py-3 rounded-2xl">
            +Create Group
           </button>

            <button className="w-full border border-zinc-700 hover:border-cyan-500 transition-all duration-300 text-white py-3 rounded-2xl">

          Join Group


        </button>
           </div>

        <div>

            {
                groups.map((group,key) =>(
                    <div
                    key={group?._id}
                    className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-cyan-500 transition-all duration-300 p-4 rounded-2xl cursor-pointer">

                        <h2 className="text-lg font-semibold text-white">
                            {group?.name}
                        </h2>

                            <button className="mt-3 text-sm text-cyan-400 hover:text-cyan-300 ">

              Invite Members

            </button>

                    </div>
                ))
            }

        </div>

        </div>
    )
}

export default Sidebar;