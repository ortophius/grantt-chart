export const getDayOfWeek = (date: Date) => {
  return (date.getDay() + 6) % 7;
}

export const getDateOfMonday = (date: Date) => {
  const currentDate = new Date(date);
  currentDate.setDate(currentDate.getDate() - getDayOfWeek(currentDate));
  return currentDate;
}

export const isWeekend = (date: Date) => {
  return getDayOfWeek(date) > 4;
}

export const getWeeks = (startDate: Date, length: number) => {
  const weeks: number[][] = []
  const currentDate = new Date(startDate);

  let i = 0;
  while (i < length) {
    const currentDayOfWeek = getDayOfWeek(currentDate);
    const startTime = currentDate.getTime();
    const daysToNextWeek = Math.min(6 - currentDayOfWeek, length - i - 1);
    
    currentDate.setDate(currentDate.getDate() + daysToNextWeek);

    const endTime = currentDate.getTime();

    weeks.push([startTime, endTime]);
    
    currentDate.setDate(currentDate.getDate() + 1);

    i += daysToNextWeek + 1;
  }
  return weeks;
}

export const getDays = (startDate: Date, length: number) => {
  const currentDate = new Date(startDate);
  const days: number[] = []

  for (let i = 0; i < length; i++) {
    days.push(currentDate.getDate());
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
}

export const getPeriodInDays = (startDate: Date, endDate: Date) => {
  const dayInMiliseconds = 1000 * 60 * 60 * 24;
  const diff = Math.abs(endDate.getTime() - startDate.getTime());
  const numberOfDays = Math.floor(diff / dayInMiliseconds) + 1 ;
  return numberOfDays;
}