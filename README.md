# LLM Application

## Overview

This application leverages the OpenAI API to provide a user-friendly interface for interacting with language models. Users can input prompts, retrieve generated responses, and engage in a chat-like conversation. The application allows for seamless integration of model parameters and API keys, enhancing the overall user experience.

## Features

- **Input Handling**: Users can input text prompts to communicate with the language model.
- **Dynamic Responses**: The application fetches responses from the OpenAI API based on user input.
- **Chat Interface**: Engage in a chat-like experience with a dedicated chat interface.
- **Deploy/Undeploy Functionality**: Users can deploy the chat interface or revert to the original drag-and-drop UI.
- **Tooltips**: Provides user guidance via tooltips on button hover, enhancing usability.

## Technologies Used

- **Frontend**: React.js, React-Flow, React-DnD, Vite
- **State Management**: Context API
- **API Integration**: Fetch API for communication with OpenAI
- **Styling**: Tailwind CSS for responsive design

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)

### Steps to Set Up

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/llm-app.git

2. **Navigate to Directory**

   ```bash
   cd llm-app

3. **Install dependencies**

   ```bash
   npm i

3. **Start Server**

   ```bash
   npm run dev
