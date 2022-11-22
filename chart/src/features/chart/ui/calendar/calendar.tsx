import { useMemo } from 'react';
import styled from 'styled-components';
import { getDays, getPeriodInDays, getWeeks } from '../../../../lib/date';

type CalendarProps = {
  startDate: Date;
  length: number;
  columnOffset?: number;
}

type WeekTabProps = {
  startColumn: number;
  span: number;
}

type CalendarLiningProps = {
  startColumn: number;
  startRow: number;
}

const CalendarColumn = styled.div`
  border-left: 1px solid var(--color-grey);
`

const CalendarLining = styled.div<CalendarLiningProps>`
  display: grid;
  grid-template-columns: repeat(var(--chart-length), var(--chart-column-size));
  grid-row: ${({ startRow }) => startRow } / -1;
  grid-column: ${({ startColumn }) => startColumn } / -1; 
`

const WeekTab = styled.div<WeekTabProps>`
  padding: 4px 8px;
  text-align: center;
  font-size: 12px;
  grid-column: ${({ startColumn }) => startColumn} / span ${({ span }) => span};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: var(--color-light-background);
  border-left: 1px solid var(--color-grey);
  border-bottom: 1px solid var(--color-grey);
`

const DayTab = styled.div`
  text-align: center;
  padding: 4px 0;
  font-size: 12px;
  background-color: var(--color-light-background);
  border-left: 1px solid var(--color-grey);
  border-bottom: 1px solid var(--color-grey);
`

const WeekTabs = ({ startDate, length, columnOffset = 0 }: CalendarProps) => {
  const weeks = useMemo(() => getWeeks(startDate, length), [startDate, length]);

  const formatDate = (date: number) => `${new Date(date).toLocaleDateString("en", {month: "short", day: "2-digit"})}`;

  const weekColumns = weeks.reduce((columns, week, i) => {
    const lastWeek = columns[i - 1] || { column: columnOffset + 1, length: 0 };
    return [
      ...columns,
      { 
        column: lastWeek.column + lastWeek.length,
        length: getPeriodInDays(new Date(week[0]), new Date(week[1])),
      }]
  }, [] as { column: number, length: number }[]);

  return (
    <>
      {weeks.map((week, i) => <WeekTab key={week[0]} startColumn={weekColumns[i].column} span={weekColumns[i].length}>
        { `${formatDate(week[0])} - ${formatDate(week[1])}` }
      </WeekTab>)}  
    </>
  )
}

const DayTabs = ({ startDate, length }: CalendarProps) => {
  const days = useMemo(() => getDays(startDate, length), [startDate, length]);

  return <>{days.map((day, i) => <DayTab key={i}>{day}</DayTab>)}</>
}

export const Calendar = (props: CalendarProps) => {

  const columns = useMemo(() => {
    const columnsArray = [];
    for (let i = 0; i < props.length; i++) {
      columnsArray.push(<CalendarColumn key={i} />)
    }
    return columnsArray
  }, [props.length])

  return (
      <>
      <WeekTabs startDate={props.startDate} length={props.length} columnOffset={1} />
      <DayTabs {...props} />
      <CalendarLining startColumn={2} startRow={3}>
        { columns }
      </CalendarLining>
      </>
  )
}