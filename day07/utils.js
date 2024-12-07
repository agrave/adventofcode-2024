function generateOperators(B) {
    // Total combinations is 2^B
    const totalCombinations = Math.pow(2, B);

    // Array to store the resulting strings
    const result = [];

    for (let i = 0; i < totalCombinations; i++) {
        // Create a binary string representation of the current number
        let binaryString = i.toString(2).padStart(B, '0');

        // Replace 0 with + and 1 with *
        let modifiedString = binaryString.replace(/0/g, '+').replace(/1/g, '*');

        // Add the modified string to the result array
        result.push(modifiedString.split(''));
    }

    return result;
}

function generateOperators2(B) {
    // Total combinations is 3^B
    const totalCombinations = Math.pow(3, B);

    // Array to store the resulting strings
    const result = [];

    for (let i = 0; i < totalCombinations; i++) {
        // Create a ternary string representation of the current number
        let ternaryString = i.toString(3).padStart(B, '0');

        // Replace 0 with +, 1 with *, and 2 with |
        let modifiedString = ternaryString
            .replace(/0/g, '+')
            .replace(/1/g, '*')
            .replace(/2/g, '|');

        // Add the modified string to the result array
        result.push(modifiedString.split(''));
    }

    return result;
}

function evaluate(numbers, operators) {
    if (numbers.length - 1 !== operators.length) {
        throw new Error("Invalid input: The number of operators must be one less than the number of numbers.");
    }

    let result = numbers[0];

    for (let i = 0; i < operators.length; i++) {
        const operator = operators[i];
        const nextNumber = numbers[i + 1];

        switch (operator) {
            case '+':
                result += nextNumber;
                break;
            case '-':
                result -= nextNumber;
                break;
            case '*':
                result *= nextNumber;
                break;
            case '/':
                result /= nextNumber;
                break;
            case '|':
                result = parseInt(result.toString() + nextNumber.toString())
                break;
            default:
                throw new Error(`Invalid operator: ${operator}`);
        }
    }

    return result;
}

module.exports = {
    generateOperators,
    evaluate,
    generateOperators2
}
