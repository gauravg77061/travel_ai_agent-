import React from 'react'

import {useEffects,useState} from 'react';

import axios from 'axios';

import {useParams} from "react-router-dom"

const ChatPage = () => {

    const {groupId}=useParams();
    console.log(groupId)

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center text-4xl font-bold">
      chat page 
    </div>
  )
}

export default ChatPage
