"use client";

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

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

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load(); // Reload the audio element whenever audioSrc changes
        }
    }, [audioSrc]);

    const handleSendMessage = async () => {
        const newMessage: Message = { sender: 'user', text: userInput };
        setMessages([...messages, newMessage]);
        setUserInput('');

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/chat_user_input', { user_query: userInput });
            const botMessage: Message = { sender: 'bot', text: response.data.response };
            setMessages((prevMessages) => [...prevMessages, newMessage, botMessage]);

            // Update the audio source with a unique query parameter to force reload
            const uniqueSrc = `/audio.mp3?${new Date().getTime()}`;
            setAudioSrc(uniqueSrc);
        } catch (error) {
            console.error("There was an error sending the message!", error);
        }
    };

    const handlePlayAudio = () => {
        if (audioRef.current) {
            audioRef.current.play().catch(error => {
                console.error("Error playing audio:", error);
            });
        }
    };

    return (
        <div>
            <h1>Chat with LLM</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                        <p><strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message"
                style={{ color: 'black' }}
            />
            <button onClick={handleSendMessage}>Send</button>
            <br />
            <button onClick={handlePlayAudio}>Play</button> {/* Play button */}
            <audio ref={audioRef} src={audioSrc} /> {/* Audio element */}
        </div>
    );
};

export default ChatComponent;
