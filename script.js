// const equation = 2 + 44* 3 - 7 /8

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
	const step = getNextStep(equation)
	console.log(step)
	// const result = solve(step)
	// replaceNextStep(equation, step, result)
}

// const regx = /\d+/
// const str = "there are 123 numbers"

// const [matches] = str.match(regx)
// console.log(matches)
// console.log(str.includes('there'))

function getNextStep(equation) {
	if (equation.includes("*") || equation.includes("/")) {
		const regx = /(\d+)\s*\*\s*(\d+)/g // get #s L and R of *
		const matches = []
		let match
        // console.log(regx.exec(equation))

		while ((match = regx.exec(equation)) !== null) {
            const leftNum = match[1]
			const [operand] = equation.match(/\*/)
			const rightNum = match[2]
			matches.push({ leftNum, operand, rightNum })
		}
		return matches
	}
}


// 2 + 44* 3 - 7 /8

// function getRegx(...args){
//     for(const arg of args){

//     }

// }
