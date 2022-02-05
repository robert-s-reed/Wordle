const guessInput = document.getElementById("guess")
const guesses = document.getElementsByClassName("guess-row")

var solution = "hello"

window.onkeyup = keyUp

function keyUp(e)
{
    const input = e.target.value

    if (input != undefined)
    {
        const letterCells = guesses[0].getElementsByClassName("letter")

        for (var i = 0; i < 5; i++)
        {
            if (i < input.length)
                letterCells[i].innerHTML = input.charAt(i)
            else
                letterCells[i].innerHTML = ""
        }

        if (input.length == 5)
            checkGuess(letterCells, input)
    }
}

function checkGuess(letterCells, guess)
{
    for (var i = 0; i < 5; i++)
    {
        const guessChar = guess.charAt(i)

        if (guessChar == solution.charAt(i))
            letterCells[i].style.backgroundColor = "LimeGreen"
        else if (solution.includes(guessChar))
            letterCells[i].style.backgroundColor = "Yellow"
    }
}