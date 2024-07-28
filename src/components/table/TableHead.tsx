interface Item {
  id: string | number;
  [key: string]: any;
}

interface Column {
  path: string;
  label: string;
  content: (row: Item, path: string) => React.ReactNode;
}

interface TableHeadComponentProps {
  columns: Column[];
}

const TableHead: React.FC<TableHeadComponentProps> = ({ columns }) => {
  // const handleSort = ({ path, sort }) => {
  //   if (!sort) return true;

  //   if (sorting.path === path) {
  //     if (sorting.order === "asc") {
  //       onSort({ path, order: "desc" });
  //     } else {
  //       onSort({ path, order: "asc" });
  //     }
  //   } else {
  //     onSort({ path, order: "asc" });
  //   }
  // };

  return (
    <thead className="bg-slate-50">
      <tr>
        {columns.map((column) => (
          <th key={column.label} className="p-2">
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
