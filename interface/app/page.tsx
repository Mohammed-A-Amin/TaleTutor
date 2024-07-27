// app/page.tsx
"use client";

import styles from "app/styles/Home.module.css";

import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
    const router = useRouter();

    const handleStudent = () => {
        router.push('/pages/selection'); // Corrected path
    };
    const handleTeacher = () => {
      router.push('/pages/teacherupload'); // Corrected path
  };

    return (
        <div className = {styles.body}>
        <div className = {styles.container}>
            <h1 className = {styles.h1} >Let's get started.</h1>
            <p className = {styles.p}>I am a</p>
            <div className = {styles.buttons}>
            
                <button className = {styles.btn} onClick={handleStudent}>Student</button>
                <button className = {styles.btn} onClick={handleTeacher}>Teacher</button>
            </div>
        </div>
        </div>
    );
};

export default Home;
