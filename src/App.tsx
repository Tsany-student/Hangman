import { useState, useEffect } from 'react';
import HangmanDraw from './components/HangmanDraw';
import HangmanWord from './components/HangmanWord';
import Keyboard from './components/Keyboard';
import dataKata from '../wordList.json';

function App() {
  const [soal, setSoal] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

  const pilihKataBaru = () => {
    const randomIndex = Math.floor(Math.random() * dataKata.length);
    const dataRandom = dataKata[randomIndex];
    
    setSoal(dataRandom.soal);
    setCurrentWord(dataRandom.jawaban);
    setSelectedLetters([]); 
  };

  useEffect(() => {
    pilihKataBaru();
  }, []);

  const incorrectLetters = selectedLetters.filter((letter) => {
    return !currentWord.includes(letter);
  });

  const handleSelectLetter = (letter: string) => {
    if (!selectedLetters.includes(letter)) {
      setSelectedLetters([...selectedLetters, letter]);
    }
  };

  // Cek Menang / Kalah
  const isWin = currentWord.split("").every((l) => selectedLetters.includes(l));
  const isLose = incorrectLetters.length >= 6;

  return (
    <section className='flex flex-col items-center gap-6 min-h-screen bg-gray-100 py-10'>
      
      <div className="text-center">
        <h1 className="text-2xl font-bold">Game Hangman</h1>
        
        <p className="text-lg font-semibold text-blue-600 mt-2 px-4 max-w-md">
          {soal}
        </p>
        
        <p className="text-sm font-bold text-gray-500 mt-1">
          ({currentWord.length} huruf)
        </p>
        
        {/* TULISAN LOSE WIN DIUBAH JADI PESAN DINAMIS */}
        <div className="mt-4 text-xl font-bold h-8">
          {isWin ? (
            <p className="text-green-600">🎉 You win, refresh and try again!</p>
          ) : isLose ? (
            <p className="text-red-600">💀 Nice try, refresh and try again!</p>
          ) : (
            <p className="text-gray-400">Lose Win</p>
          )}
        </div>
        
        <p className="text-red-500 font-bold mt-1">
          Kesempatan Salah: {incorrectLetters.length} / 6
        </p>
      </div>

      <button 
        onClick={pilihKataBaru}
        className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-600"
      >
        Ganti Soal
      </button>

      <HangmanDraw attempt={incorrectLetters.length} />
      
      {/* LEMPAR isWin & isLose KE HANGMANWORD */}
      <HangmanWord
        word={currentWord}
        selectedLetters={selectedLetters}
        isWin={isWin}
        isLose={isLose}
      />
      
      {/* LEMPAR isWin & isLose KE KEYBOARD */}
      <Keyboard 
        currentWord={currentWord}
        selectedLetters={selectedLetters} 
        onSelectLetter={handleSelectLetter} 
        isWin={isWin}
        isLose={isLose}
      />
    </section>
  );
}

export default App;