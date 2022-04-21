import moment from "moment";

// * Function for check if day === current day
export function dateToday(day) {
  const today = new Date();
  const checkToday = new Date(day);
  if (
    checkToday.getDate() === today.getDate() &&
    checkToday.getMonth() === today.getMonth() &&
    checkToday.getFullYear() === today.getFullYear()
  ) {
    return <span className="blue">{day}</span>;
  }

  return <span className="grey">{day}</span>;
}

// * Get a string of the current month * number of the day and year
export function getReportDate(day) {
  const today = new Date(day);
  const selectedMonth = today.toLocaleString("default", { month: "long" });

  return today.getFullYear() + " " + selectedMonth + " " + today.getDate();
}

export function currentDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  return (
    month +
    "-" +
    today.getDate() +
    "-" +
    today.getFullYear() +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes()
  );
}

export function getMonth(day) {
  const today = new Date(day);
  const selectedMonth = today.toLocaleString("default", { month: "long" });

  return selectedMonth;
}
