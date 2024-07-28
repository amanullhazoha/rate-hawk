export default function GlobalPagination({
  page,
  total_element,
  handlePagination,
}: {
  page: number;
  total_element: number;
  handlePagination: (value: number) => void;
}) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white py-3">
      <div className="flex flex-1 justify-between items-center sm:hidden">
        <button
          type="button"
          disabled={page <= 1 ? true : false}
          onClick={() => handlePagination(page - 1)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>

        <div>
          <p className="text-sm text-gray-700 text-center">
            Showing <span className="font-medium">{8 * (page - 1)}</span> to{" "}
            <span className="font-medium">
              {page * 8 >= total_element ? total_element : page * 8}
            </span>{" "}
            of <span className="font-medium">{total_element}</span> results
          </p>
        </div>

        <button
          type="button"
          onClick={() => handlePagination(page + 1)}
          disabled={page * 8 >= total_element ? true : false}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{8 * (page - 1)}</span> to{" "}
            <span className="font-medium">
              {page * 8 >= total_element ? total_element : page * 8}
            </span>{" "}
            of <span className="font-medium">{total_element}</span> results
          </p>
        </div>

        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
            <button
              type="button"
              disabled={page <= 1 ? true : false}
              onClick={() => handlePagination(page - 1)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span>Previous</span>
            </button>

            <button
              type="button"
              onClick={() => handlePagination(page + 1)}
              disabled={page * 8 >= total_element ? true : false}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span>Next</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
