import { Link } from "react-router-dom";
import { dateFormat } from "../utils/Auth";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { truncate } from "lodash";

import TicketService from "../api/TicketServices";

export default function TicketItem({ ticket, loadTickets, toaster }) {
  const [className, setClassName] = useState(ticket.status);

  const handleChange = async (e) => {
    const { value } = e.target;
    try {
      const res = await TicketService.update({ _id: ticket._id, status: value });
      if (res.success) {
        loadTickets();
        setClassName(value);
        toaster(res.message, "success");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr className={className}>
      <td>
        <Link to={"edit/" + ticket._id}>{ticket.title}</Link>
      </td>
      <td>
        <Form.Select name="status" value={ticket.status} onChange={handleChange}>
          <option value="unassigned">Unassigned</option>
          <option value="awaiting-feedback">Awaiting Feedback</option>
          <option value="complete">Complete</option>
        </Form.Select>
      </td>
      <td>{truncate(ticket.description)}</td>
      <td>{dateFormat(ticket.createdAt)}</td>
    </tr>
  );
}
