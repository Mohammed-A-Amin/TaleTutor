"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from 'app/styles/Init.module.css';

interface StoryModelParameters {
    name: string | null;
    chapter: string | null;
    topic: string | null;
    theme: string | null;
}

const InitialInput: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [topic, setTopic] = useState<string>('');
    const [chapter, setChapter] = useState<string>('');
    const [theme, setTheme] = useState<string>('minimal');
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
            await axios.post('http://127.0.0.1:5000/api/chatbot', { story_model_parameters: storyModelParameters });
            router.push('/pages/chat');
        } catch (error) {
            console.error("There was an error sending the data!", error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className = {styles.h1}>Before we start learning together, tell me a bit about yourself.</h1>
            <form id="questionnaireForm" onSubmit={handleSubmit}>
                <label htmlFor="name" className={styles.label}>Name:</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                />

                <label className={styles.label}>Select a Topic:</label>
                <div className={styles.buttonGroup}>
                    <button type="button" className={styles.topicButton} onClick={() => setTopic('Physics')}>Physics</button>
                    <button type="button" className={styles.topicButton} onClick={() => setTopic('Civics')}>Civics</button>
                </div>

                {topic && (
                    <>
                        <label className={styles.label}>Select a Chapter:</label>
                        {topic === 'Physics' && (
                            <div className={styles.buttonGroup}>
                                <button type="button" className={styles.chapterButton} onClick={() => setChapter("Newton's Laws of Motion")}>
                                    Newton's Laws of Motion
                                </button>
                                {/* <button type="button" className={styles.chapterButton} onClick={() => setChapter("Thermodynamics")}>
                                    Thermodynamics
                                </button> */}
                            </div>
                        )}
                        {topic === 'Civics' && (
                            <div className={styles.buttonGroup}>
                                <button type="button" className={styles.chapterButton} onClick={() => setChapter('Role of Political Parties')}>
                                    Role of Political Parties
                                </button>
                                {/* <button type="button" className={styles.chapterButton} onClick={() => setChapter('Constitutional Amendments')}>
                                    Constitutional Amendments
                                </button> */}
                            </div>
                        )}
                    </>
                )}

                <label className={styles.label}>Preferred Theme:</label>
                <div className={styles.themes}>
                    <label>
                        <input 
                            type="radio" 
                            name="theme" 
                            value="minimal" 
                            checked={theme === 'minimal'}
                            onChange={() => setTheme('minimal')}
                        />
                        <img src="https://png.pngtree.com/thumb_back/fh260/background/20230421/pngtree-color-red-blue-purple-yellow-normal-image_2476028.jpg" alt="Minimal (Default)" />
                        <span className = {styles.span}>Minimal </span>
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="theme" 
                            value="Harry Potter" 
                            checked={theme === 'Harry Potter'}
                            onChange={() => setTheme('Harry Potter')}
                        />
                        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6703aada-2649-4453-b1cb-c1dade721c88/dg29fpo-e6430306-a974-4406-93db-72a9cabc4029.png/v1/fill/w_1600,h_900,q_80,strp/hogwarts_legacy___red_edition___4k_wallpaper_by_aksensei_dg29fpo-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAwIiwicGF0aCI6IlwvZlwvNjcwM2FhZGEtMjY0OS00NDUzLWIxY2ItYzFkYWRlNzIxYzg4XC9kZzI5ZnBvLWU2NDMwMzA2LWE5NzQtNDQwNi05M2RiLTcyYTljYWJjNDAyOS5wbmciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.BSuBdgIrD1BwUP3ZY9vz1-134wh3yiDEFWt1XKm9FxM" alt="Harry Potter" />
                        <span className= {styles.span}>Harry Potter</span>
                    </label>
                </div>

                <button type="submit" id="nextButton" className={styles.button}>Next →</button>
            </form>
        </div>
    );
};

export default InitialInput;
