"use client";

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styles from "app/styles/Convo.module.css";

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

const ChatComponent: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>('');
    const [audioSrc, setAudioSrc] = useState<string>('/audio.mp3'); // Initialize with default audio source
    const audioRef = useRef<HTMLAudioElement | null>(null); // Create a ref for the audio element

    useEffect(() => {
        const fetchInitialResponse = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/get_response');
                setMessages([{ sender: 'bot', text: response.data.response }]);
            } catch (error) {
                console.error("There was an error fetching the initial response!", error);
            }
        };

        fetchInitialResponse();
    }, []);

    const handleSendMessage = async () => {
        const newMessage: Message = { sender: 'user', text: userInput };
        setMessages([...messages, newMessage]);
        setUserInput('');

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/chat_user_input', { user_query: userInput });
            const botMessage: Message = { sender: 'bot', text: response.data.response };
            setMessages((prevMessages) => [...prevMessages, newMessage, botMessage]);

            // Set the audio source URL and reload the audio element
            setAudioSrc('/audio.mp3');
            if (audioRef.current) {
                audioRef.current.load();
            }

        } catch (error) {
            console.error("There was an error sending the message!", error);
        }
    };

    const handlePlayAudio = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    return (
        <div className = {styles.body}>
        <div className={styles.chatContainer}>
            <a href="../../start_screen/index.html" className={styles.endConversation}>End Conversation</a>
            <h1 className={styles.title}>New Conversation</h1>
            <div className={styles.chatBox}>
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
                        <div className={styles.avatar} style={{ backgroundImage: msg.sender === 'user' ? 'url(/user_avatar.png)' : 'url(https://images.nightcafe.studio/jobs/gc33epAdeKQx8eNLkpFH/gc33epAdeKQx8eNLkpFH--4--q8ksc_2x.jpg?tr=w-1600,c-at_max)' }}></div>
                        <p><strong>{msg.sender === 'user' ? 'You' : 'Dumbledore'}:</strong> {msg.text}</p>
                    </div>
                ))}
            </div>
            <div className={styles.chatInput}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Message Dumbledore..."
                />
                <button className={styles.sendButton} onClick={handleSendMessage}>Send</button>
            </div>
            <button className={styles.audioButton} onClick={handlePlayAudio}>Play</button> {/* Play button */}
            <audio ref={audioRef} src={audioSrc} /> {/* Audio element */}
        </div>
        </div>
    );
};

export default ChatComponent;
