export function formatDate(dateStr) {
  let date = new Date(dateStr);

  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (day < 10) {
    day = '0' + day;
  }

  if (month < 10) {
    month = '0' + month;
  }

  if (hours < 10) {
    hours = '0' + hours;
  }

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  if (day == new Date().getDate()) {
    return `Сегодня ${hours}:${minutes}`;
  } else {
    return `${day}.${month}.${year}`;
  }
}
