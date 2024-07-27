"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface StoryModelParameters {
    name: string | null;
    chapter: string | null;
    topic: string | null;
    theme: string | null;
}

interface ResponseData {
    response: string;
}

const InitialInput: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [chapter, setChapter] = useState<string>('');
    const [topic, setTopic] = useState<string>('');
    const [theme, setTheme] = useState<string>('');
    const [response, setResponse] = useState<ResponseData | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const storyModelParameters: StoryModelParameters = {
            name: name || null,
            chapter: chapter || null,
            topic: topic || null,
            theme: theme || null
        };

        try {
            const res = await axios.post('http://127.0.0.1:5000/api/chatbot', { story_model_parameters: storyModelParameters });
            setResponse(res.data);
            console.log(res.data)
            router.push('/pages/chat');
        } catch (error) {
            console.error("There was an error sending the data!", error);
        }
    };

    return (
        <div>
            <h1>Chatbot</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    style={{ color: 'black' }}
                />
                <input
                    type="text"
                    value={chapter}
                    onChange={(e) => setChapter(e.target.value)}
                    placeholder="Chapter"
                    style={{ color: 'black' }}
                />
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Topic"
                    style={{ color: 'black' }}
                />
                <input 
                    type="text"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    placeholder="Theme"
                    style={{ color: 'black' }}
                />
                <button type="submit">Submit</button>
            </form>
            <div>
                <h2>Response:</h2>
                {response && <p>{response.response}</p>}
            </div>
        </div>
    );
};

export default InitialInput;


