export function getRemainingTimeUntilMsTimestamp(timestampMs) {
    const countDownTs = new Date(timestampMs).getTime();
    const now = new Date().getTime();
    const distance = countDownTs - now;
    if (distance < 0) {
      return {
        seconds: "00",
        minutes: "00",
        hours: "00",
        days: "00",
      };
    }
    return {
      seconds: getRemainingSeconds(now, countDownTs),
      minutes: getRemainingMinutes(now, countDownTs),
      hours: getRemainingHours(now, countDownTs),
      days: getRemainingDays(now, countDownTs),
    };
  }
  
  function getRemainingSeconds(now, countDownTs) {
    const distance = countDownTs - now;
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return padWithZeros(seconds, 2);
  }
  
  function getRemainingMinutes(now, countDownTs) {
    const distance = countDownTs - now;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    return padWithZeros(minutes, 2);
  }
  
  function getRemainingHours(now, countDownTs) {
    const distance = countDownTs - now;
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    return padWithZeros(hours, 2);
  }
  
  function getRemainingDays(now, countDownTs) {
    const distance = countDownTs - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    return padWithZeros(days, 2);
  }
  
  function padWithZeros(number, minLength) {
    const numberString = number.toString();
    if (numberString.length >= minLength) return numberString;
    return "0".repeat(minLength - numberString.length) + numberString;
  }
  