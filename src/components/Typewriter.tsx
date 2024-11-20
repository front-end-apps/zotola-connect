import '../styles/Typewriter.scss';
import React, { useState, useEffect } from 'react';
interface TypewriterProps {
    dataText: string,
    speed?: number,
    pauseBetweenWord?: number
}
const Typewriter: React.FC<TypewriterProps> = ({ dataText, speed = 75, pauseBetweenWord = 1500 }) => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  const textArr = dataText.split(', ');
  const maxTextIndex = textArr.length;

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (isTyping) {
        typeText(); 
      } else if (isDeleting) {
        deleteText();
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [isTyping, isDeleting, currentIndex, text]);

  const typeText = () => {
    const currentWord = textArr[currentIndex];
    if (text.length < currentWord.length) {
      setText((prevText) => prevText + currentWord[text.length]);
    } else {
      setIsTyping(false);
      setTimeout(() => setIsDeleting(true), pauseBetweenWord);
    }
  };

  const deleteText = () => {
    if (text.length > 0) {
      setText((prevText) => prevText.slice(0, -1));
    } else {
      setIsDeleting(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % maxTextIndex);
      setTimeout(() => setIsTyping(true), pauseBetweenWord);
    }
  };

  return (
    <div className="typewriter">
      Search:
      <span className="typewriter-content">{text}</span>
    </div>
  );
};

export default Typewriter;
