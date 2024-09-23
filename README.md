# TaleTutor
### An educational platform revolutionizing learning with AI-driven narratives. Personalized lessons, movie-themed experiences, and fictional examples based on real-world principles make learning engaging

[![TaleTutor Demo](https://img.youtube.com/vi/jX9IUWnVgH0/0.jpg)](https://www.youtube.com/watch?v=jX9IUWnVgH0)

## 🌟 Inspiration

The inspiration for TaleTutor came from the desire to make learning more engaging and effective for students. Traditional educational methods often fail to connect topics holistically and relate concepts to real-world scenarios, leading to disinterest and fragmented understanding. Drawing from research on narrative learning and the transformative power of storytelling, we envisioned an AI-driven platform that uses immersive narratives to captivate students' imaginations. TaleTutor strives to bridge the gap between abstract concepts and practical applications, making education both fun and meaningful.

## 🎓 What It Does

TaleTutor is a narrative-based learning system that serves three primary purposes:
1. **Relating Material to Real-World Scenarios**: Connecting academic content with practical applications.
2. **Fostering Student Comfort**: Creating a comfortable and engaging learning environment.
3. **Making Learning Enjoyable**: Using immersive narratives to make education fun.

### Features

- **Dual Interfaces**: Separate interfaces for teachers and students.
- **Themed Learning**: Students can choose their learning theme, such as Harry Potter, with subjects like Physics and Civics.
- **Interactive Chat System**: A character-led interactive chat system that dynamically explains concepts based on student interaction.
- **Real-World Scenario Teaching**: Using fictional characters to teach real-world scenarios through engaging narratives.

#### Regular conversation between bot and user
![image](https://github.com/user-attachments/assets/e1e5f681-ceb6-4e86-b614-e2ebcbf1f455)

#### When a user asks a question out of scope
![image](https://github.com/user-attachments/assets/e2bda58f-b3a3-491f-8ac2-7656ac0f2493)

#### Rising a ticket when the question is in scope but out of context
![image](https://github.com/user-attachments/assets/ba911d05-c9e6-4772-94c9-6f37f63f4023)

#### Interrupting the bot to move on to the next topic of the chapter
![image](https://github.com/user-attachments/assets/ecd7b17f-9695-47ee-af42-5dcaf76c1854)


## 🛠️ How We Built It

TaleTutor utilizes a LangChain-supported GPT-3.5 LLM to retrieve PDF content uploaded by teachers, convert it into a vectorstore, and perform RAG operations based on student queries. The system processes RAG output with another GPT-3.5 LLM that acts as a router, deciding whether to proceed with narrative building or knowledge retrieval. The GPT-3.5 LLM then generates narratives using zero-shot prompting. The system also manages off-topic queries by guiding students back on track or notifying teachers for relevant follow-up.

### Architecture 
![image](https://github.com/user-attachments/assets/05721cab-2d71-41fe-ace4-c04b556eba92)


### Technologies Used

- **GPT-3.5 LLM**: For generating and routing narratives.
- **LangChain**: For managing RAG operations.
- **Flask**: Python server to interface with LLMs.
- **Next.js**: Frontend framework for the user interface.
- **Axios**: Library for making HTTP requests to the server.

## 🏆 Accomplishments 

- **Top 10 at UC Berkeley AI Hackathon**: Proud to have been selected and placed in the top 10.
- **Innovative Approach**: Conceptualizing and implementing an innovative narrative-based learning system.
- **Team Collaboration**: Building a diverse team and developing a full-stack application in under 24 hours.

## 🌈 What's Next for TaleTutor

We have ambitious plans to grow our mission of educating students through captivating characters and unique settings:

- **Interconnected Stories**: Creating greater interconnectedness of the stories our students see.
- **Expanded Theme Library**: Introducing more characters and settings to cater to diverse student preferences.
- **Emotion Recognition**: Expanding our AI model to recognize and respond to emotional changes in students.
- **Enhanced Interaction**: Integrating student voice input directly into the AI’s voice output for better synergy.
- 


👨‍👨‍👦‍👦 Team
Rohit Raju
Niranjan Cholendiran
Carter Chen
Mohammed Amin

Learn more about us on [Devpost](https://devpost.com/software/taletutor)!

