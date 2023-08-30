// const equation = 2 + 4 * 3 - 7

// 2 + 12 - 7 = parse(2 + 4 * 3 - 7)
// 14- 7 = parse(2 + 12 - 7)
// 7 = parse(14 - 7)

const solveButton = document.querySelector("[data-solve]")
const input = document.getElementById("equation")

solveButton.addEventListener("click", (e) => {
	e.preventDefault()
	const equation = input.value

	parse(equation)
})

function parse(equation) {
	const step = getNextStep()
	const result = solve(step)
	replaceNextStep(equation, step, result)
}
