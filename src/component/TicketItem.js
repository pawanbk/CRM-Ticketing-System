import { dateFormat } from "../utils/Auth";

export default function TicketItem({ tickets }) {
  const data = tickets;
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Created At",
      selector: (row) => dateFormat(row.createdAt),
      sortable: true,
    },
  ];
  return "";
}
