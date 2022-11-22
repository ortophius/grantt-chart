import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../config/store";
import { getDateOfMonday } from "../../lib/date";
import { Entry, Graph, MappedGraph } from "./types";

const initialState = {
  project: "",
  period: "",
  chart: {},
  rootId: "",
  startDate: null,
  endDate: null
} as MappedGraph;

export const fetchGraphData = createAsyncThunk("graph/fetchData", async () => {
  const response = await fetch("http://localhost:3001/");
  const graphData = await response.json() as Graph;
  return graphData;
})

const mapGraphToState = (graph: Graph) => {
  const mappedChart: MappedGraph["chart"] = {};
  const entryStartDates: string[] = [];

  const extractEntries = (entry: Entry, level = 1) => {
    entryStartDates.push(entry.period_start);
    const sub = entry.sub?.map((entry) => entry.id) || [];
    mappedChart[entry.id] = ({
      ...entry,
      sub: sub,
      show: false,
      level,
    });
    entry.sub?.forEach((entry) => { extractEntries(entry, level + 1) });
  }

  extractEntries(graph.chart);

  const startDate = getDateOfMonday(new Date(
    Math.min(...entryStartDates.map((date) => Number(new Date(date))))
  )).toString();

  return {
    ...graph,
    chart: mappedChart,
    rootId: graph.chart.id,
    startDate,
  } as MappedGraph;
}

const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    toggle: ({ chart }, { payload: id }: PayloadAction<Entry["id"]>) => {
      chart[id].show = !chart[id].show;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGraphData.fulfilled, (_, { payload }) => mapGraphToState(payload));
  }
});

export const graphSelector = (state: RootState) => state.graph;

export const { reducer: graphReducer, actions: { toggle } } = graphSlice;