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
	if (equation.match(PARENTHESIS_REGX)) {
		const subEquation = equation.match(PARENTHESIS_REGX).groups.equation
		const result = parse(subEquation)
		const newEquation = equation.replace(PARENTHESIS_REGX, result)
		return parse(newEquation)
	} else if (equation.match(EXPONENT_REGX)) {
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
