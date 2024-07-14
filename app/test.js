const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

numbers.forEach(number => {
  if (number % 2 === 0) {
    return; // Skip even numbers
  }

  console.log(number); // This will only log odd numbers
});
