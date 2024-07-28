import TableHead from "./TableHead";
import TableBody from "./TableBody";

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
  className?: string;
}

const Table: React.FC<TableBodyComponentProps> = ({
  items,
  columns,
  className,
}) => {
  return (
    <div className="bg-white shadow-sm rounded-sm px-3 py-4 mt-8 overflow-hidden">
      <div className=" w-full overflow-hidden overflow-x-auto">
        <table className={`${className}`}>
          <TableHead columns={columns} />
          <TableBody items={items} columns={columns} />
        </table>
      </div>
    </div>
  );
};

export default Table;
