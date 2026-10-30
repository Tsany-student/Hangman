type KeyboardProps = {
  currentWord: string;
  selectedLetters: string[];
  onSelectLetter: (letter: string) => void;
  isWin: boolean;
  isLose: boolean;
};

function Keyboard({ currentWord, selectedLetters, onSelectLetter, isWin, isLose }: KeyboardProps) {
  const keyboardRows = [
    "QWERTYUIOP".split(""),
    "ASDFGHJKL".split(""),
    "ZXCVBNM".split("")
  ];

  return (
    <div className="flex flex-col gap-2 w-full max-w-lg items-center mt-4">
      {keyboardRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2 justify-center">
          {row.map((letter) => {
            const isSelected = selectedLetters.includes(letter);
            const isCorrect = currentWord.includes(letter);

            let warnaTombol = "bg-white text-black border-black hover:bg-gray-200";
            
            if (isSelected) {
              if (isCorrect) {
                warnaTombol = "bg-blue-500 text-white border-blue-700 cursor-not-allowed";
              } else {
                warnaTombol = "bg-gray-400 text-white border-gray-500 cursor-not-allowed";
              }
            }

            return (
              <button
                key={letter}
                onClick={() => onSelectLetter(letter)}
                // DISABLED SEMUA JIKA SUDAH MENANG ATAU KALAH
                disabled={isSelected || isLose || isWin}
                className={`w-10 h-10 font-bold rounded border-2 ${warnaTombol}`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;