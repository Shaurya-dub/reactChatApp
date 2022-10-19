import React, {useRef, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import {auth} from '../firebase'
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
const Chats = () => {
    const {user} = useAuth();
    console.log(user)
    const history = useHistory();
    const handleLogout = async () => {
        await auth.signOut();
        history.push('/')
    }
    useEffect(() => {
        if(!user) {
            history.push('/')
            return
        }
        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "****",
                "user-name": user.name,
                "user-secret": user.uid
            }
        })
    },[user,history])
    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Unichat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine 
            height='calc(100vh - 66px)'
            projectId='*****'
            userName = '.'
            userSecret='.'
            />
        </div>
    )
}

export default Chats;