import React from 'react'

import {useEffect,useState} from 'react';

import axios from 'axios';

import {useParams} from "react-router-dom"

import BASE_URL from '../services/axios';

const ChatPage = () => {

    const {groupId}=useParams();
    // console.log(groupId)

    const[groupData,setGroupData]=useState(null);

    const [messages,setMessages]=useState([]);

    const fetchGroupDetails=async ()=>{

        try {
            const response=await axios.get(BASE_URL+`group/${groupId}`,
                {withCredentials:true,})

                console.log("Group Data",response?.data?.data);

                setGroupData(response?.data?.data);
        } catch (error) {
            console.log(error.messages);
        }

    }

    const fetchMessages= async() =>{
        try {
            const response = await axios.get(BASE_URL+`message/${groupId}`,{withCredentials:true});

            console.log(response?.data.data);

            setMessages(response?.data.data);
        } catch (error) {
            
            console.log(error)

        }
    }

    useEffect(()=>{

        fetchGroupDetails();

        fetchMessages();

    },[])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center text-4xl font-bold">
     
     <h1 className='text-4xl font-bold'>

        chat group
        {groupData?.name}

     </h1>

    </div>
  )
}

export default ChatPage
