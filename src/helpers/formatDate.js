export function formatDate(dateStr) {
  const date = new Date(dateStr)

  const dateTimeFormat = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(date)

  if(date.getDay() === new Date().getDay()) {
    return `Сегодня ${date.getHours()}:${date.getMinutes()}`
  } else {
    return dateTimeFormat.replaceAll('/', '.').split(',')[0]
  }
}
