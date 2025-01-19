document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    let guessedWords = [[]];
    let availableSpace = 1; //id-value of squares - start at number "1" 
    let word = "dairy";
    let guessedWordCount = 0;
    
    //get keys
    const keys = document.querySelectorAll(".keyboard-row button");
    
    function getCurrentWordArr(){
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords -1];
    }

    function handleDeleteLetter(){
        const currentWordArr = getCurrentWordArr();
        const removedLetter = currentWordArr.pop();
        guessedWords[guessedWords.length - 1] = currentWordArr;

        const lastLetterEl = document.getElementById(String(availableSpace) -1); 

        lastLetterEl.textContent = "";
        availableSpace = availableSpace -1;


    }

    function updateGuessedWords(letter){
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr && currentWordArr.length < 5){
            currentWordArr.push(letter);
            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;
            availableSpaceEl.textContent = letter;
        }
    }

    function getTileColor(letter, index){
        const isCorrectletter = word.includes(letter);
        if (!isCorrectletter){
            return "rgb(58,58,60)";
        }
        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;
        if (isCorrectPosition){
            return "rgb(83,141,78)";
        }
        return "rgb(181,159,59)";
    }

    function handleSubmitWord(){
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr.length !== 5){
            window.alert("Word must be 5 letters");
        }

        const currentWord = currentWordArr.join("");

        const firstLetterId = guessedWordCount * 5 + 1; //1st letter in a column
         
        const interval = 500;

        currentWordArr.forEach((letter,index) =>{
            setTimeout(()=>{
                const tileColor = getTileColor(letter, index); 
                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId); 
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor}; border-color:${tileColor}`
            }, interval * index) //intervale used here multiply by index so that each letter comes one by one letter 1 after 200 / letter 2 after 400 ets 
        });

        guessedWordCount += 1;


        if (currentWord === word){
            window.alert("Congragulations!");
        }

        if (guessedWords.length === 6){
            window.alert(`No more guesses! The word is ${word}. `);
        }

        guessedWords.push([]);
    }

    //we are painting the board on DOM
    function createSquares(){
        const gameBoard = document.getElementById("board");
        //30 squares 6 x 5 
        for (let index = 0; index< 30; index++){
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
        }
    }

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({target}) =>{
            //function(event){
            //const target = event.target; equivalent code
            const letter = target.getAttribute("data-key");

            if (letter === 'enter'){
                handleSubmitWord();
                return
            }

            if (letter === 'del'){
                handleDeleteLetter();
                return
            }

            updateGuessedWords(letter);            
        }         
    }


});