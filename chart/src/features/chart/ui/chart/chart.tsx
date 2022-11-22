import { useEffect } from "react";
import { fetchGraphData, graphSelector } from "../../../../entities/graph/model";
import { useAppDispatch, useAppSelector } from "../../../../lib/hooks";
import { Calendar } from "../calendar/calendar";
import { GridLayout } from "../grid-layout/grid-layout";
import { WorkList } from "../work-list/work-list";

import styles from './chart.module.scss';

export const Chart = () => {
  const dispatch = useAppDispatch();
  const graph = useAppSelector(graphSelector);

  const startDate = graph.startDate ? new Date(graph.startDate) : new Date();

  useEffect(() => {
    const promise = dispatch(fetchGraphData());
    return () => { promise.abort() }
  }, [dispatch])

  return (
    <div className={styles.chartLayout}>
      <div className={styles.chartHeader}>
        <h1>{graph.project} / {graph.period}</h1>
        <button className={styles.exportButton}>Export</button>
      </div>
      <div className={styles.table}>
        <GridLayout length={360}>
          <Calendar startDate={startDate} length={360} />
          <WorkList startDate={startDate} />
        </GridLayout>
      </div>
    </div>
  )
}