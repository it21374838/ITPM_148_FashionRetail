import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const MODEL_NAME = 'gemini-1.0-pro-001';
const API_KEY = 'AIzaSyBrMUcJ3ygJar7RJvjegkAjIIm1n41LcoM';// API Key eka danna

const ChatbotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [genAI, setGenAI] = useState(null);
  const [model, setModel] = useState(null);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    const initGeminAI = async () => {
      const geminAI = new GoogleGenerativeAI(API_KEY);
      const model = geminAI.getGenerativeModel({ model: MODEL_NAME });

      setGenAI(geminAI);
      setModel(model);
    };

    initGeminAI();
  }, []);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() && genAI && model) {
      // Clear the input field
      setInputValue('');
    
      setMessages([...messages, { sender: 'user', text: inputValue }]);
      setIsThinking(true);

      const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };
  
      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];
  
      try {
        const result = await model.generateContent({
            contents: [
                {
                  role: 'user',
                  parts: [{ text: inputValue }],
                },
              ],
          generationConfig,
          safetySettings,
        });
  
        const response = result.response;
        setMessages([
          ...messages,
          { sender: 'user', text: inputValue },
          { sender: 'bot', text: response.text() },
        ]);
      } catch (error) {
        console.error('Error:', error);
        setMessages([
          ...messages,
          { sender: 'user', text: inputValue },
          { sender: 'bot', text: 'Sorry, something went wrong. Please try again.' },
        ]);
      }
      
      setIsThinking(false);
      
    }
  
  };

  

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={toggleChatbot}
        className="bg-indigo-600 text-white rounded-full p-3 hover:bg-indigo-700 transition-colors duration-300"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-16 right-4 bg-white rounded-lg shadow-lg p-6 max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Chatbot</h2>
            <button
              onClick={toggleChatbot}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 max-h-96 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                } mb-2`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-xs ${
                    message.sender === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-300 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isThinking && (
                <div class="flex gap-2">
                <span className="loading loading-dots loading-sm"></span>
                </div>
            )}
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition-colors duration-300"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotPopup;