const correctCol = "#21b021"
const presentCol = "#d4b90d"
const absentCol = "Gray"
const kbAbsentBgCol = "#1c1c1c"
const kbAbsentTxtCol = "Gray"

var letterCells // Cells in table containing a letter of the guess
var input = ""
var wordNum = 1 // 1-indexed
var solution = "hello"
const correctLetters = []
var guessIndex = 0

document.addEventListener("keyup", keyUp)

function loadWords()
{
    try{
        const wordsStr = document.getElementById("words").contentWindow.document.body.childNodes[0].innerHTML // Raw words.txt content
        solution = wordsStr.slice((wordNum - 1) * 5, wordNum * 5 + 1) // Get solution from wordsStr
        console.log(solution)
    }
    catch
    {
        alert("words.txt could not be loaded")
    }
}

function keyUp(event)
{
    kbPress(event.key)
}

function kbPress(letter)
{
    if (letter == "Backspace")
        input = input.slice(0, -1)
    else if (letter.match(/^[a-z]$/))
        input += letter
    
    letterCells = document.getElementById("guesses").rows[guessIndex].cells // Assign letterCells to the cells of the current guess

    for (var i = 0; i < 5; i++) // For each letter cell
    {
        if (i < input.length)
            letterCells[i].innerHTML = input.charAt(i).toUpperCase() // Set cell value to the corresponding letter in the guess
        else
            letterCells[i].innerHTML = "" // Ensure cell is empty (e.g., if a character was removed)
    }

    if (input.length == 5) // Full guess input
        checkGuess(input)
}

function checkGuess(guess)
{
    for (var i = 0; i < 5; i++) // For each letter in the guess
    {
        const guessChar = guess.charAt(i)
        const kbLetter = document.getElementById(guessChar)

        if (guessChar == solution.charAt(i)) // Is the letter in the same position in the solution?
        {
            letterCells[i].style.backgroundColor = correctCol
            kbLetter.style.backgroundColor = correctCol
            correctLetters.push(guessChar)
        }
        else if (solution.includes(guessChar)) // Does the letter appear in any position in the solution?
        {
            letterCells[i].style.backgroundColor = presentCol
            
            if (!correctLetters.includes(guessChar))
                kbLetter.style.backgroundColor = presentCol
        }
        else // Letter absent in solution
        {
            letterCells[i].style.backgroundColor = absentCol
            kbLetter.style.color = kbAbsentTxtCol
            kbLetter.style.backgroundColor = kbAbsentBgCol
        }
    }

    guessIndex++
    input = "" // Reset input
}
