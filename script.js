// const equation = 2 + 44* 3 - 7 /8

// 2 + 12 - 7 = parse(2 + 4 * 3 - 7)
// 14- 7 = parse(2 + 12 - 7)
// 7 = parse(14 - 7)

const solveButton = document.querySelector("[data-solve]")
const input = document.getElementById("equation")
const outputElement = document.getElementById("results")

const PARENTHESIS_REGX = /\((?<equation>[^\(\)]*)\)/
const MULTIPLY_DIVIDE_REGX =
	/(?<operand1>\S+)\s*(?<operation>[\/\*])\s*(?<operand2>\S+)/
const EXPONENT_REGX = /(?<operand1>\S+)\s*(?<operation>\^)\s*(?<operand2>\S+)/
const ADD_SUBTRACT_REGX =
	/(?<operand1>\S+)\s*(?<operation>(?<!e)[\-\+])\s*(?<operand2>\S+)/

solveButton.addEventListener("click", (e) => {
	e.preventDefault()
	const result = parse(input.value)
	outputElement.textContent = result
})

function parse(equation) {
	if (equation.match(EXPONENT_REGX)) {
		const result = handleMath(equation.match(EXPONENT_REGX).groups)
		const newEquation = equation.replace(EXPONENT_REGX, result)
		return parse(newEquation) //recursive function
	} else if (equation.match(MULTIPLY_DIVIDE_REGX)) {
		const result = handleMath(equation.match(MULTIPLY_DIVIDE_REGX).groups)
		const newEquation = equation.replace(MULTIPLY_DIVIDE_REGX, result)
		return parse(newEquation) //recursive function
	} else if (equation.match(ADD_SUBTRACT_REGX)) {
		const result = handleMath(equation.match(ADD_SUBTRACT_REGX).groups)
		const newEquation = equation.replace(ADD_SUBTRACT_REGX, result)
		return parse(newEquation) //recursive function
	} else {
		return parseFloat(equation)
	}
}

function handleMath({ operand1, operand2, operation }) {
	console.log(operand1, operand2, operation)
	const number1 = parseFloat(operand1)
	const number2 = parseFloat(operand2)

	switch (operation) {
		case "^":
			return number1 ** number2
		case "*":
			return number1 * number2
		case "/":
			return number1 / number2
		case "+":
			return number1 + number2
		case "-":
			return number1 - number2
		default:
			return
	}
}

// function parse(equation) {
// 	const step = getNextStep(equation)
// 	console.log(step)
// 	// const result = solve(step)
// 	// replaceNextStep(equation, step, result)
// }

// // const regx = /\d+/
// // const str = "there are 123 numbers"

// // const [matches] = str.match(regx)
// // console.log(matches)
// // console.log(str.includes('there'))

// function getNextStep(equation) {
// 	if (equation.includes("*") || equation.includes("/")) {
// 		const regx = /(\d+)\s*\*\s*(\d+)/g // get #s L and R of *
// 		const matches = []
// 		let match
// 		// console.log(regx.exec(equation))

// 		while ((match = regx.exec(equation)) !== null) {
// 			const leftNum = match[1]
// 			const [operand] = equation.match(/\*/)
// 			const rightNum = match[2]
// 			matches.push({ leftNum, operand, rightNum })
// 		}
// 		return matches
// 	}
// }

// const testEq = "2 + 44* 3 - 7 /8+5^2 + 10+8"
// // "(2 + 44)* 3 - 7 /8 + 5^2 + 10 + 8"
// // "((2 + 44)* 3) - (7/8)+(5^2) + (10+8)"
// //
// const groups = addParentheses(testEq)

// function orderOfOperation(equation) {
// 	equation = equation.replace(/\s+/g, "")

// 	const regxParentheses = /\((.*?)\)/g
// 	const regxMultDiv = /(\d+)([\*/^])(\d+)/g

// 	if (regxParentheses.test(equation)) {
// 		// Handle parantheses
// 		console.log("there are parantheses")
// 	}

// 	if (regxMultDiv.test(equation)) {
// 		// Add parantheses
// 		equation = equation.replace(/(\d+)([\*/^])(\d+)/g, "($1$2$3)")
// 		equation = equation.replace(/(?<!\()\d+(?!\))/g, "($&)")
// 		console.log(equation)
// 	}

// 	const regx = /(\d+)([\*/^])(\d+)/g
// }

// orderOfOperation(testEq)

// function addParentheses(equation) {
// 	equation = equation.replace(/\s+/g, "")
// 	const regx = /(\d+)([\*/^])(\d+)/g
// 	const matches = []
// 	let match

// 	while ((match = regx.exec(equation)) !== null) {
// 		const subEq = {
// 			group: match[0],
// 			left: Number(match[1]),
// 			operand: match[2],
// 			right: Number(match[3]),
// 		}

// 		matches.push(subEq)
// 		doOperation(matches)
// 	}
// 	return matches
// }

// function doOperation(equation) {
// 	equation.forEach((group) => {
// 		switch (group.operand) {
// 			case "+":
// 				group.group = group.left + group.right
// 				break
// 			case "-":
// 				group.group = group.left - group.right
// 				break
// 			case "*":
// 				group.group = group.left * group.right
// 				break
// 			case "/":
// 				group.group = group.left / group.right
// 				break
// 			case "^":
// 				group.group = group.left ** group.right
// 				break

// 			default:
// 				return
// 		}
// 	})
// }
