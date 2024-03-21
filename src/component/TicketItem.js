import { dateFormat } from "../utils/Auth";

export default function TicketItem({ ticket }) {
  return (
    <tr>
      <td>{ticket.title}</td>
      <td>{ticket.status}</td>
      <td>{ticket.description}</td>
      <td>{dateFormat(ticket.createdAt)}</td>
    </tr>
  );
}
