import styled from 'styled-components';
import { graphSelector, toggle } from '../../../../entities/graph/model';
import { MappedEndtry } from '../../../../entities/graph/types';
import { getPeriodInDays } from '../../../../lib/date';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import clsx from 'clsx';
import styles from './work-list.module.scss';

type WorkRowProps = {
  entry: MappedEndtry;
  level?: number;
  startDate: Date;
}

type CandleContainerProps = {
  startRow: number;
  startColumn: number;
  span: number;
  color: string;
}

type CandleLabelProps = {
  startColumn: number;
}

const CandleContainer = styled.div<CandleContainerProps>`
  grid-column: ${({ startColumn }) => startColumn + 1} / span ${({ span }) => span};
`

const CandleLabel = styled.div<CandleLabelProps>`
  grid-column: ${({ startColumn }) => startColumn } / -1;
  padding-left: 8px;
  font-size: 14px;
`

const RowsRenderer = ({ entry, startDate, level = 1 }: WorkRowProps) => {
  const dispatch = useAppDispatch();
  const { chart } = useAppSelector(graphSelector);
  const rowClass = `${styles.workItem} ${styles[`level-${entry.level}`]}`;
  const candleClass = `${styles.candle} ${styles[`candle-${entry.level}`]}`;
  const showChildren = entry.show && entry.sub && entry.sub.length;
  const startColumn = getPeriodInDays(startDate, new Date(entry.period_start));
  const span = getPeriodInDays(new Date(entry.period_start), new Date(entry.period_end));
  const nextColumn = startColumn + span + 1;

  return (
    <>
        <div className={rowClass} onClick={() => { dispatch(toggle(entry.id)) }} role="presentation">
          { entry.sub && entry.sub.length ? <span className={clsx("icon-chevron", styles.chevron, { [styles.chevronClosed]: !showChildren })} /> : null }
          <span className={clsx("icon-papers", styles.taskIcon)}/>
          <i className={styles.childrenCount}>{entry.sub && entry.sub.length}</i>
          {entry.title}
        </div>
        <CandleContainer
          startColumn={startColumn}
          startRow={1}
          span={span}
          color="red"
        >
          <div className={candleClass} />
        </CandleContainer>
        <CandleLabel startColumn={nextColumn}>{entry.title}</CandleLabel>
      { showChildren ? entry?.sub?.map((id) => <RowsRenderer key={id} startDate={startDate} entry={chart[id]} level={level + 1} />) : null }
    </>
  )
}

type WorkListProps = {
  startDate: Date;
}

export const WorkList = ({ startDate }: WorkListProps) => {
  const graph = useAppSelector(graphSelector);
  const { chart, rootId } = graph;

  return (
    <>
    <div className={styles.header}>Work item</div>
      <div className={styles.workTable}>
        { Object.values(chart).length ? <RowsRenderer startDate={startDate} entry={chart[rootId]} /> : null }
      </div>
    </>
  )
}