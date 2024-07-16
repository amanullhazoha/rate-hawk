import { Fragment } from "react";

interface Item {
  id: string | number;
  [key: string]: any;
}

interface Column {
  path: string;
  label: string;
  content: (row: Item, path: string) => React.ReactNode;
}

interface TableBodyComponentProps {
  items: Item[];
  columns: Column[];
}

const TableBody: React.FC<TableBodyComponentProps> = ({ items, columns }) => {
  let count = 0;

  return (
    <tbody>
      {items.map((row) => (
        <tr key={row.id} className="odd:bg-slate-200">
          {columns.map((column) => (
            <Fragment key={count++}>
              {column?.content(row, column.path)}
            </Fragment>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
