export type Entry = {
  id: string;
  title: string;
  period_start: string;
  period_end: string;
  sub?: Entry[];
}

export type MappedEndtry = {
  id: string;
  title: string;
  period_start: string;
  period_end: string;
  show: boolean;
  sub?: Entry["id"][];
  level: number;
}

export type Graph = {
  project: string;
  period: string;
  chart: Entry;
}

export type MappedGraph = {
  project: string;
  period: string;
  startDate: Date | null;
  chart: Record<MappedEndtry["id"], MappedEndtry>;
  rootId: MappedEndtry["id"];
}