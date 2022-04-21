import { keyboard } from "@testing-library/user-event/dist/keyboard";

export function countItems(data) {
  let counter = 0;
  data.map((dat) => {
    let testcounter = dat.reportItems.length;
    counter = counter + testcounter;
  });

  return counter;
}

export function countStatus(data, value) {
  let counter = 0;
  console.log(data);
  data.map((dat) => {
    let testCounter = countOccStatus(dat.reportItems, value);
    counter = counter + testCounter;
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

export function countCategories(data, value) {
  let counter = 0;
  data.map((dat) => {
    let testCounter = countOccCategories(dat.reportItems, value);
    counter = counter + testCounter;
  });
  return counter;
}

export function countOccCategories(array, value) {
  let counter = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].category.name === value) {
      counter++;
    }
  }
  return counter;
}
