const correctCol = "#21b021"
const presentCol = "#d4b90d"
const absentCol = "Gray"

const guesses = document.getElementsByClassName("guess-row") // Row in table containing guess letters
var letterCells // Cells in table containing a letter of the guess
var solution = "hello"
const correctLetters = []
var guessIndex = 0

window.onkeyup = keyUp

function keyUp(e)
{
    const input = e.target.value.toLowerCase()

    if (input == undefined)
        return
    
    letterCells = guesses[guessIndex].getElementsByClassName("guess-letter") // Assign letterCells to the cells of the current guess

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

        if (guessChar == solution.charAt(i)) // Is the letter in the same position in the solution?
        {
            letterCells[i].style.backgroundColor = correctCol
            document.getElementById(guessChar).style.backgroundColor = correctCol
            correctLetters.push(guessChar)
        }
        else if (solution.includes(guessChar)) // Does the letter appear in any position in the solution?
        {
            letterCells[i].style.backgroundColor = presentCol
            
            const kbLetter = document.getElementById(guessChar)
            if (!correctLetters.includes(guessChar))
                kbLetter.style.backgroundColor = presentCol
        }
        else // Letter absent in solution
            letterCells[i].style.backgroundColor = absentCol
    }

    const guessInput = document.getElementById("guess") // Get guess input field

    guessInput.value = "" // Clear guess input
    guessIndex++

    if (guessIndex >= 5) // If guesses exhausted
    {
        guessInput.placeholder = "" // Clear placeholder
        guessInput.disabled = true // Disable guess input
    }
}