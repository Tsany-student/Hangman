type HangmanWordProps = {
  word: string;
  selectedLetters: string[];
  isWin: boolean;
  isLose: boolean;
};

function HangmanWord({ word, selectedLetters, isWin, isLose }: HangmanWordProps) {
  return (
    <div className="flex gap-2 text-3xl font-bold tracking-widest">
      {word.split("").map((letter, index) => {
        // Cek apakah huruf ini beneran ditebak (ada di selectedLetters) atau lagi di-reveal
        const isRevealed = selectedLetters.includes(letter) || isLose;
        
        // Logika Warna
        let textColor = "text-black"; // Default hitam
        if (isWin) {
          textColor = "text-green-500"; // Menang: Semua hijau
        } else if (isLose && !selectedLetters.includes(letter)) {
          textColor = "text-red-500"; // Kalah: Yang salah (di-reveal) jadi merah
        }

        return (
          <span 
            key={index} 
            className={`border-b-4 border-black w-8 text-center ${textColor}`}
          >
            {isRevealed ? letter : ""}
          </span>
        );
      })}
    </div>
  );
}

export default HangmanWord;