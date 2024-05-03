import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import "../components/CSS/ChatbotPopup.css" // Importing CSS file

const MODEL_NAME = 'gemini-1.0-pro-001';
const API_KEY = 'AIzaSyBrMUcJ3ygJar7RJvjegkAjIIm1n41LcoM';

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

        // Check if the response is fashion-related
        if (isFashionRelated(response.text())) {
          // If fashion-related, display the response to the user
          setMessages([
            ...messages,
            { sender: 'user', text: inputValue },
            { sender: 'bot', text: response.text() },
          ]);
        } else {
          // If not fashion-related, display a message indicating that the response is not relevant
          setMessages([
            ...messages,
            { sender: 'user', text: inputValue },
            { sender: 'bot', text: 'OH! Sorry, I can only provide fashion-related information.' },
          ]);
        }
      } catch (error) {
        console.error('Error:', error);
        setMessages([
          ...messages,
          { sender: 'user', text: inputValue },
          { sender: 'bot', text: 'Sorry, I encountered an error. Please try again.' },
        ]);
      }
      
      setIsThinking(false);
    }
  };

  
// Function to check if a response is fashion-related
function isFashionRelated(response) {
  // Convert the response to lowercase for case-insensitive matching
  const lowercaseResponse = response.toLowerCase();
  
  // Keywords related to fashion
  const fashionKeywords = ['fashion', 'clothing', 'style', 'dress', 'outfit', 'apparel', 'wardrobe', 'accessories', 'trend'];
  
  // Keywords related to events
  const eventKeywords = ['party', 'wedding', 'formal event', 'casual event', 'cocktail party', 'prom', 'red carpet'];
  
  // Check if the response contains any fashion-related keywords
  const isFashion = fashionKeywords.some(keyword => lowercaseResponse.includes(keyword));

  // Check if the response contains any event-related keywords
  const isEvent = eventKeywords.some(keyword => lowercaseResponse.includes(keyword));

  // Return true if the response is fashion-related or event-related
  return isFashion || isEvent;
}


  return (
    <div className={`chatbot-popup ${isOpen ? 'open' : ''}`}>
      <button
        onClick={toggleChatbot}
        className="chatbot-toggle-button"
      >
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h2 className="chatbot-title">Chatbot</h2>
            <button
              onClick={toggleChatbot}
              className="chatbot-close-button"
            >
              Close
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.sender}`}
              >
                {message.text}
              </div>
            ))}
            {isThinking && <div className="loading-indicator">Thinking...</div>}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotPopup;
