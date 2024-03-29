import { Link } from "react-router-dom";
import { dateFormat } from "../utils/Auth";
import { useEffect, useState, useCallback } from "react";
import { Form } from "react-bootstrap";
import TicketService from "../api/TicketServices";

export default function TicketItem({ ticket, loadTickets, toaster }) {
  const [className, setClassName] = useState("");

  const handleChange = async (e) => {
    const { value } = e.target;
    try {
      const res = await TicketService.updateTicket({ _id: ticket._id, status: value });
      if (res.success) {
        loadTickets();
        setBackground(value);
        toaster(res.message, "success");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setBackground = useCallback((status) => {
    switch (status) {
      case "complete":
        setClassName("rowHighlightSuccess");
        break;
      case "awaiting-feedback":
        setClassName("rowHighlightSuccessAwaiting");
        break;
      default:
        setClassName("rowHighlightSuccessUnassigned");
    }
  }, []);

  useEffect(() => {
    setBackground(ticket.status);
  }, [ticket.status, setBackground]);

  return (
    <tr className={className}>
      <td>{ticket.title}</td>
      <td>
        <Form.Select name="status" value={ticket.status} onChange={handleChange}>
          <option value="unassigned">Unassigned</option>
          <option value="awaiting-feedback">Awaiting Feedback</option>
          <option value="complete">Complete</option>
        </Form.Select>
      </td>
      <td>{ticket.description}</td>
      <td>{dateFormat(ticket.createdAt)}</td>
      <td>
        <Link to={"edit/" + ticket._id}>EDIT</Link>
      </td>
    </tr>
  );
}
