// Helper function to get a random integer within a range
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to get a random element from an array
const getRandomElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Function to generate a question
export const generateQuestion = () => {
  const operations = ['multiplication', 'division', 'addition', 'subtraction', 'mixed'];
  const operation = getRandomElement(operations);

  let question = '';
  let answer = 0;

  switch (operation) {
    case 'multiplication': {
      // Generate awkward multiplication: e.g., 17 * 4.5
      const num1 = getRandomInt(11, 49);
      const num2 = getRandomElement([1.5, 2.5, 3.5, 4.5]);
      question = `${num1} * ${num2}`;
      answer = num1 * num2;
      break;
    }
    case 'division': {
      // Generate awkward division: e.g., 1250 / 2.5
      const divisor = getRandomElement([1.25, 1.5, 2.5]);
      const result = getRandomInt(20, 100);
      const dividend = divisor * result;
      question = `${dividend} / ${divisor}`;
      answer = result;
      break;
    }
    case 'addition': {
        const add1 = getRandomInt(100, 999);
        const add2 = getRandomInt(100, 999);
        question = `${add1} + ${add2}`;
        answer = add1 + add2;
        break;
    }
    case 'subtraction': {
        const sub1 = getRandomInt(500, 1000);
        const sub2 = getRandomInt(100, sub1);
        question = `${sub1} - ${sub2}`;
        answer = sub1 - sub2;
        break;
    }
    case 'mixed': {
        // (X * Y) + Z
        const x = getRandomInt(10, 20);
        const y = getRandomInt(5, 15);
        const z = getRandomInt(100, 500);
        question = `(${x} * ${y}) + ${z}`;
        answer = (x * y) + z;
        break;
    }
  }

  // To handle potential floating point inaccuracies, we can round the answer.
  // Let's round to 4 decimal places if it's a float.
  if (answer % 1 !== 0) {
    answer = parseFloat(answer.toFixed(4));
  }

  return { question, answer };
};
