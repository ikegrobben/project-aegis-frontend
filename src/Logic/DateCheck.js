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

export function getReportDate(day) {
  const today = new Date(day);
  const selectedDay = today.toLocaleString("default", { month: "long" });

  return selectedDay + " " + today.getDay() + " " + today.getFullYear();
}
