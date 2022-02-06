const unknownCol = "#262626"
const correctCol = "#21b021"
const presentCol = "#d4b90d"
const absentCol = "Gray"
const kbAbsentBgCol = "#1c1c1c"
const kbAbsentTxtCol = "Gray"

var letterCells // Cells in table containing a letter of the guess
var input = ""
var solution = "hello"
const correctLetters = []
var guessIndex = 0

document.addEventListener("keyup", keyUp)

function selectWord()
{
    const inputField = document.getElementById("word-num")

    if (inputField.value.length <= 0) // Empty input
        return // Prevent pressing enter (to submit guess) leading to invalid inputs

    const wordNum = parseInt(inputField.value)
    if (wordNum == NaN || wordNum < 1 || wordNum > 5757 || wordNum.toString().length != inputField.value.length)
        alert("Enter a valid number between 1 and 5757.")
    else
    {
        solution = words[wordNum - 1]
        reset()
    }
    inputField.value = ""
}

function keyUp(event)
{
    if (event.key == "Enter")
        checkGuess()
    else
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
}

function checkGuess()
{
    if (input.length != 5 || !words.includes(input))
        return

    for (var i = 0; i < 5; i++) // For each letter in the guess
    {
        const guessChar = input.charAt(i)
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

function reset()
{
    for (var r = 0; r < 5; r++) // For each guesses row
    {
        const row = document.getElementById("guesses").rows[r]
        for (var c = 0; c < 5; c++) // For each column in guess
        {
            row.cells[c].innerHTML = "" // Clear cell value
            row.cells[c].style.backgroundColor = unknownCol
        }
    }

    guessIndex = 0
    input = ""
    correctLetters.length = 0
}