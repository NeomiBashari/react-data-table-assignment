export interface TableColumn {
  id: string; // id of the column, matches data rows
  ordinalNo: number; // position of the column
  title: string; // name of the column
  type: string; // type of the data in the column
  width?: number; // optional width
}

export interface TableData {
  columns: TableColumn[];
  data: Array<{
    id: string;
    [columnId: string]: any;
  }>;
}