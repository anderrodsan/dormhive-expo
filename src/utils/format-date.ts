async function getDate() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const today = new Date();
  const month = months[today.getMonth()];
  const year = today.getFullYear();
  const date = today.getDate();

  return `${date} ${month}, ${year}`;
}

// Shows the time if today, otherwise just the day
export function useFormatedDate(dateTime: string) {
  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });

    const now = new Date();
    const today = now.getDate();

    if (today == day) {
      // Format as time "20:30"
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      return formattedTime;
    } else {
      // Format as date "30 Jan"
      const formattedDate = `${day} ${month}`;
      return formattedDate;
    }
  };

  const formattedDateTime = formatDate(dateTime);

  return formattedDateTime;
}

/* Function that takes a date and outputs the day name (monday, tuesday, etc), number and month name separately
export function getDayAndMonth(inputDate: string) {
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const dayName = date.toLocaleString("default", { weekday: "long" });

  return { day, month, dayName };
}
*/
