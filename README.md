# SpeakUp – A Safe Space for Mental Health Support

## Contributors
- Binyam Meuz Tekue  
- Firdews Seifu Kemal  
- Dagimawit Belayineh Bangu

## Real People, Real Support — No Names Needed  
SpeakUp creates a unique balance between **anonymity and trust**. Users log in with their **Fayda digital ID** — proving they're real — but their **personal identity stays private**. This ensures safe, honest conversations without fear of judgment, bots, or trolls.

## Project Synopsis

### Problem  
Many people experience mental health challenges but avoid speaking up because of stigma, fear of judgment, or lack of privacy. Most online platforms feel unsafe, with fake users and bots, making it harder to open up.

### Solution  
**SpeakUp** is a simple and safe chat platform where people can join anonymous support rooms and talk about their feelings with others who truly understand. By using **Fayda digital ID**, users are verified as real people, while remaining completely anonymous to others.

### Target Audience  
SpeakUp is designed for **teens, young adults, and anyone seeking a supportive space** to talk about mental health — especially in **communities where stigma is still strong**.

### Extended Support from Professionals  
<!--  
This feature is currently under development and will be launched soon after the MVP competition. 
-->

We plan to integrate **licensed psychiatrists** into SpeakUp this week. These professionals will begin joining **group chat rooms** like any other user — participating in discussions, listening, and sharing supportive advice when needed. Their profiles will display a **verified badge**, and their presence will be visible in chat rooms.

**Coming soon after MVP launch:**
- **Paid one-on-one sessions**: Users will be able to book private sessions with psychiatrists. These sessions will be paid, secure, and easy to access.
- **Free participation in group chats**: Psychiatrists can also participate freely in public chat rooms, helping users in a more casual, open setting.
- **Rating system**: Users can rate psychiatrists based on how helpful their group responses are.
- **Monthly certification**: Psychiatrists with the highest ratings each month will be awarded a **SpeakUp Community Certification** to recognize their impact.

This approach ensures **accessible, trustworthy support**, whether you're chatting with peers or seeking help from a professional.

### Expected Outcome  
We aim to build a **trusted, judgment-free community** where verified users feel safe to express themselves. With both **peer support and optional professional guidance**, SpeakUp empowers people to speak honestly, heal together, and know they are not alone.

### Fayda’s Role  
Fayda provides a secure digital ID login. It ensures that users are real people without revealing their names or private data. This protects the community from bots, trolls, and fake accounts, making SpeakUp a safer place to be vulnerable.

### Tech Stack  
- **Frontend**: HTML, Tailwind CSS, JavaScript, or React  
- **Backend**: Node.js with Express  
- **Database**: MySQL or MongoDB  
- **Authentication**: VeriFayda OIDC (Fayda Login)

## Installation and Deployment

Follow these steps to install and run SpeakUp locally.

### 1. Clone the Repository


git clone https://github.com/your-username/speakup.git
cd speakup 

##Backend
cd server
npm install

##Frontend
cd ../client
npm install

##Run App Locally
*We do Both Equally in different terminals
cd server
npm start

cd ../client
npm run dev

Docker Coming soon 
### How to Use Docker Compose in PowerShell (Windows)

1. **Check Docker installation**  
   Open PowerShell and run:
   
        docker --version
If you get an error, download and install Docker Desktop

Restart your computer after installation.

Use the correct Docker Compose command
Docker Compose is now a Docker subcommand. Use:

    docker compose version
    docker compose build
    docker compose up
  Do NOT use docker-compose (with a hyphen).

If Docker commands are not recognized, add Docker to your system PATH:

Search Edit the system environment variables in Windows Start menu

Click Environment Variables…

Under System variables, select Path → Edit → New

Add this path:

C:\Program Files\Docker\Docker\resources\bin
Click OK, then restart your computer.

Verify Docker Compose again:

    docker compose version
Run your Docker Compose commands:

    docker compose build
    docker compose up





