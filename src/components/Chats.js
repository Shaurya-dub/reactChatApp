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

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    }

    const [loading,setLoading] = useState(true);
    useEffect(() => {
        if(!user) {
            history.push('/')
            return
        }
        axios.get("https://api.chatengine.io/users/me", {
          headers: {
            "project-id": "8639c2c3-55ea-4f75-88b2-a96743943550",
            "user-name": user.name,
            "user-secret": user.uid,
          },
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            const formdata = new FormData()
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);
            getFile(user.photoUrl)
            .then((avatar) => {
                formdata.append('avatar', avatar, avatar.name)

                axios.post('https://api.chatengine.io/users',
                formdata, {headers: {"private-key": "*********"}})
                .then(() => setLoading(false))
                .catch((e) => console.error(e))
            })
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