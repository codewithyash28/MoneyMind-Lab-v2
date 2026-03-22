'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff, User, Bot, Volume2, VolumeX } from 'lucide-react';
import { useUser } from '@/lib/UserContext';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "Hi! I'm your MoneyMind Lab Assistant. What would you like to learn about today? (Budgeting, debt, credit, or scams?)" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { user, refetch } = useUser();

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: 'bot', content: data.response }]);
        await refetch();
        if (isSpeaking) {
          speak(data.response);
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleSpeech = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleSendMessage(transcript);
    };
    recognition.start();
  };

  const speak = (text: string) => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.onend = () => {};
    synth.speak(utterance);
  };

  const toggleTts = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      if (messages.length > 0) {
        speak(messages[messages.length - 1].content);
      }
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-indigo-100 dark:border-gray-700">
      <div className="flex items-center justify-between p-4 bg-indigo-600 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-full">
            <Bot size={24} />
          </div>
          <h2 className="font-bold">MoneyMind AI Chat</h2>
        </div>
        <button
          onClick={toggleTts}
          className={`p-2 rounded-full hover:bg-white/20 transition-colors ${isSpeaking ? 'bg-white/20' : ''}`}
        >
          {isSpeaking ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`p-2 rounded-full shrink-0 ${msg.role === 'user' ? 'bg-indigo-100 dark:bg-indigo-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-gray-100 dark:bg-gray-700 dark:text-gray-100 rounded-tl-none'}`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 p-4 bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-none animate-pulse">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSpeech}
            className={`p-3 rounded-full transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200 dark:bg-gray-800 dark:text-indigo-400'}`}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(input)}
            placeholder="Ask me anything about money..."
            className="flex-1 p-3 bg-white dark:bg-gray-800 border-2 border-indigo-100 dark:border-gray-700 rounded-xl outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            onClick={() => handleSendMessage(input)}
            disabled={!input.trim()}
            className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
