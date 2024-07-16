import Table from "@/components/table/Table";

const transactionItems = [
  {
    id: 1,
    productName: "Magic Hair Rap Bath Salon Towel",
    pricePerItem: 103,
    quantity: 2,
    totalPrice: 206,
    media: "Bank",
    status: "Completed",
    imageUrl:
      "https://i.postimg.cc/vTGcmWqp/02-A4-F9-A4-15-EB-440-D-B625-1-BD13040-EEE3.png",
  },
  {
    id: 2,
    productName: "Unilever Pureit Classic Microfibre Mesh",
    pricePerItem: 199,
    quantity: 1,
    totalPrice: 199,
    media: "Bkash",
    status: "Pending",
    imageUrl:
      "https://i.postimg.cc/vTGcmWqp/02-A4-F9-A4-15-EB-440-D-B625-1-BD13040-EEE3.png",
  },
  {
    id: 3,
    productName: "High-quality Silicone Shampoo Brush",
    pricePerItem: 105,
    quantity: 3,
    totalPrice: 315,
    media: "Cash",
    status: "Failed",
    imageUrl:
      "https://i.postimg.cc/vTGcmWqp/02-A4-F9-A4-15-EB-440-D-B625-1-BD13040-EEE3.png",
  },
  {
    id: 4,
    productName: "3PCS Double Sided Nail File",
    pricePerItem: 111,
    quantity: 1,
    totalPrice: 111,
    media: "Bank",
    status: "Completed",
    imageUrl:
      "https://i.postimg.cc/vTGcmWqp/02-A4-F9-A4-15-EB-440-D-B625-1-BD13040-EEE3.png",
  },
];

const columns = [
  {
    label: "Image",
    path: "imageUrl",
    content: (row: any) => (
      <td className="p-2">
        <img
          src={row.imageUrl}
          alt={row.productName}
          className="w-10 h-10 rounded-lg"
        />
      </td>
    ),
  },
  {
    label: "Hotel Name",
    path: "productName",
    content: (row: any) => <td className="p-2">{row.productName}</td>,
  },
  {
    label: "Price",
    path: "pricePerItem",
    content: (row: any) => <td className="p-2">{row.pricePerItem} ৳</td>,
  },
  {
    label: "Start Date",
    path: "quantity",
    content: (row: any) => <td className="p-2">{row.quantity}</td>,
  },
  {
    label: "End Date",
    path: "quantity",
    content: (row: any) => <td className="p-2">{row.quantity}</td>,
  },
  {
    label: "Created Date",
    path: "totalPrice",
    content: (row: any) => <td className="p-2">{row.totalPrice} ৳</td>,
  },
  {
    label: "User Name",
    path: "media",
    content: (row: any) => <td className="p-2">{row.media}</td>,
  },
  {
    label: "Status",
    path: "status",
    content: (row: any) => <td className="p-2">{row.status}</td>,
  },
];

const OrderListPage = () => {
  return (
    <main>
      <h2 className="text-2xl font-bold">Order List</h2>
      <div className="mt-4">
        <Table
          columns={columns}
          items={transactionItems}
          className="min-w-[1000px]"
        />
      </div>
    </main>
  );
};

export default OrderListPage;
