// Count total report items
export function countItems(data) {
  let counter = 0;
  data.map((dat) => {
    let secondCounter = dat.reportItems.length;
    counter = counter + secondCounter;
    return null;
  });

  return counter;
}

// count total items with a status.
export function countStatus(data, value) {
  let counter = 0;
  data.map((dat) => {
    let secondCounter = countOccStatus(dat.reportItems, value);
    counter = counter + secondCounter;
    return null;
  });
  return counter;
}

export function countOccStatus(array, value) {
  let counter = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].status === value) {
      counter++;
    }
  }
  return counter;
}
