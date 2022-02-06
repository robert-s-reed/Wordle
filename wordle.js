const correctCol = "#21b021"
const presentCol = "#d4b90d"
const absentCol = "Gray"
const kbAbsentBgCol = "#1c1c1c"
const kbAbsentTxtCol = "Gray"

var letterCells // Cells in table containing a letter of the guess
var input = ""
const words = []
var solution = "hello"
const correctLetters = []
var guessIndex = 0

document.addEventListener("keyup", keyUp)

function loadWords()
{
    try
    {
        words = document.getElementById("words").contentWindow.document.body.childNodes[0].innerHTML.split(/\r?\n/) // Populate words array
    }
    catch
    {
        alert("Unable to load words.txt")
    }
}

function selectWord()
{
    const input = document.getElementById("word-num").value
    const wordNum = parseInt(input)
    if (wordNum == NaN || wordNum < 1 || wordNum > 5757 || wordNum.toString().length != input.length)
        alert("Enter a valid number between 1 and 5757.")
    else
        solution = words[wordNum - 1]
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
