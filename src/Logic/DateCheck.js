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
