import React, { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import BASE_URL from "../services/axios";

const Sidebar =()=>{

    const[groups,setGroups]=useState([]);

    const[showCreateModal,setShowCreateModal]=useState(false);

    const[showJoinModal,setShowJoinModal]=useState(false);

    const[inviteCode,setInviteCode] = useState("");

    const[groupName ,setGroupName] = useState("");

    const[showInviteModal,setShowInviteModal] =useState(false);

    const[selectedGroup,setSelectedGroup]=useState(null);



    const navigate=useNavigate();

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

    const createGroup = async() =>{

        try {
            
            if(!groupName.trim()){
                return ;
            }

            await axios.post(
                BASE_URL+"group/create",
                {
                    groupName,
                },
                {
                    withCredentials:true,
                }
            )
            setGroupName("")

            setShowCreateModal(false);

            fetchGroups();

        } catch (error) {
            console.error(error);
        }

    }

    const joinGroup =async()=>{

        try {
           
            if(!inviteCode.trim()){
                return ;
            }

            await axios.post(
                BASE_URL+'group/join',
                {
                    inviteCode,
                },
                {withCredentials:true,}
            )

            setInviteCode("");

            setShowJoinModal(false);

            fetchGroups();
            
        } catch (error) {
            console.error(error);
        }
    }

    const openInviteModal =(group) =>{
        setSelectedGroup(group);

        setShowInviteModal(true);
    }

    const copyInviteCode = async () => {

  try {

    await navigator.clipboard.writeText(
      selectedGroup?.inviteCode
    );

    alert("Invite code copied!");

  } catch (error) {

    console.log(error);

  }

};

const shareOnWhatsApp = () => {

  const message = `Join my TripSyncAI group!

Group Name: ${selectedGroup?.name}

Invite Code: ${selectedGroup?.inviteCode}`;

  window.open(
    `https://wa.me/?text=${encodeURIComponent(message)}`
  );

};

    

    return(
        <div  className="w-[320px] min-h-[90vh] bg-zinc-950/95 backdrop-blur-xl border-r border-zinc-800 p-5 overflow-y-auto">
           
           <div className="text-2xl font-bold text-white mb-6">

            Your Groups

           </div>

           <div className="space-y-3 mb-6">
             <button className="w-full bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-black font-semibold py-3 rounded-2xl"
             onClick={()=>setShowCreateModal(true)}
             >
            +Create Group
           </button>

            <button className="w-full border border-zinc-700 hover:border-cyan-500 transition-all duration-300 text-white py-3 rounded-2xl"
            onClick={()=>setShowJoinModal(true)}
            >

          Join Group


        </button>
           </div>

        <div className="space-y-4">

            {
                groups.map((group,key) =>(
                    <div
                    key={group?._id}

                    onClick={() => navigate(`/chat/${group?._id}`)}

                    className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-cyan-500 transition-all duration-300 p-4 rounded-2xl cursor-pointer">

                        <h2 className="text-lg font-semibold text-white">
                            {group?.name}
                        </h2>

                            <button 
                            
                            onClick={(e) => {

                                    e.stopPropagation();

                                    openInviteModal(group);

                                }}
                                                            
                            className="mt-3 text-sm text-cyan-400 hover:text-cyan-300 ">

              Invite Members

            </button>

                    </div>
                ))
            }

        </div>

        {/* Create Group Modal */}
{
  showCreateModal && (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 w-100">

        <h2 className="text-2xl font-bold text-white mb-6">
          Create Group
        </h2>

        <input
          type="text"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-500"
        />

        <div className="flex gap-4 mt-6">

          <button
            onClick={() => setShowCreateModal(false)}
            className="flex-1 border border-zinc-700 text-white py-3 rounded-2xl"
          >
            Cancel
          </button>

          <button
            onClick={createGroup}
            className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-2xl"
          >
            Create
          </button>

        </div>

      </div>

    </div>
  )
}

{/* Join Group Modal */}
{
  showJoinModal && (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 w-100">

        <h2 className="text-2xl font-bold text-white mb-6">
          Join Group
        </h2>

        <input
          type="text"
          placeholder="Enter invite code"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-500"
        />

        <div className="flex gap-4 mt-6">

          <button
            onClick={() => setShowJoinModal(false)}
            className="flex-1 border border-zinc-700 text-white py-3 rounded-2xl"
          >
            Cancel
          </button>

          <button
            onClick={joinGroup}
            className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-2xl"
          >
            Join
          </button>

        </div>

      </div>

    </div>
  )
}

{/* Invite Modal */}
{
  showInviteModal && (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 w-100">

        <h2 className="text-2xl font-bold text-white mb-6">
          Invite Members
        </h2>

        <div className="bg-zinc-800 rounded-2xl p-5 mb-6">

          <p className="text-sm text-zinc-400 mb-2">
            Invite Code
          </p>

          <h1 className="text-3xl font-bold text-cyan-400 tracking-widest">

            {selectedGroup?.inviteCode}

          </h1>

        </div>

        <div className="space-y-4">

          <button
            onClick={copyInviteCode}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-2xl"
          >
            Copy Invite Code
          </button>

          <button
            onClick={shareOnWhatsApp}
            className="w-full border border-zinc-700 hover:border-cyan-500 text-white py-3 rounded-2xl"
          >
            Share on WhatsApp
          </button>

          <button
            onClick={() => setShowInviteModal(false)}
            className="w-full border border-red-500 text-red-400 py-3 rounded-2xl"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  )
}

        </div>
    )
}

export default Sidebar;