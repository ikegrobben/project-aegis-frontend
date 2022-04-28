// * Filter array of objects based on filterType
export function FilterItems(filterArray, filterType, filterBy) {
  const arrayFilter = filterArray.filter((item) => {
    const dateToday = new Date(filterBy);
    const dateItem = new Date(item.reportItemDateTime);

    switch (filterType) {
      case "filterOnStatus":
        if (item.status.toUpperCase() === filterBy.toUpperCase()) {
          return true;
        }
        break;
      case "filterOnDay":
        if (
          dateToday.getDate() === dateItem.getDate() &&
          dateToday.getMonth() === dateItem.getMonth() &&
          dateToday.getFullYear() === dateItem.getFullYear()
        ) {
          return true;
        }
        break;
      case "filterOnMonth":
        if (dateToday.getMonth() === dateItem.getMonth()) {
          return true;
        }
        break;

      default:
    }
    return false;
  });
  return arrayFilter;
}

// * Sort items based on sortType
export function SortItems(sortArray, sortType, sortBy) {
  if (sortType === "date" && sortBy === "latest first") {
    sortArray.sort(
      (a, b) => new Date(b.reportItemDateTime) - new Date(a.reportItemDateTime)
    );
  } else if (sortType === "date" && sortBy === "latest last") {
    sortArray.sort(
      (a, b) => new Date(a.reportItemDateTime) - new Date(b.reportItemDateTime)
    );
  } else if (sortType === "status" && sortBy === "open") {
    sortArray.sort((a, b) =>
      a.status.toUpperCase() > b.status.toUpperCase()
        ? -1
        : a.status.toUpperCase() < b.status.toUpperCase()
        ? 1
        : 0
    );
  } else if (sortType === "status" && sortBy === "closed") {
    sortArray.sort((a, b) =>
      a.status.toUpperCase() < b.status.toUpperCase()
        ? -1
        : a.status.toUpperCase() > b.status.toUpperCase()
        ? 1
        : 0
    );
  } else if (sortType === "enabled" && sortBy === "enabled first") {
    sortArray.sort((a, b) => b.enabled - a.enabled);
  }
}
