import React from "react";
import { useEffect, useState } from "react";
import AppLayout from "../layout/AppLayout";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { LinkContainer } from "react-router-bootstrap";
import TicketItem from "../component/TicketItem";
import "./TicketList.css";
import { Button } from "react-bootstrap";
import AddTicket from "../component/AddTicket";
import TicketService from "../api/TicketServices";
import { PlusCircle } from "react-bootstrap-icons";
import { CustomToaster, Notify } from "../shared/CustomToaster.tsx";
import { FormSelect, Form } from "react-bootstrap";
import { ITicket } from "../shared/interface";

export default function TicketList() {
  const [modalShow, setModalShow] = useState(false);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [selectedFilter, setSelectedFilter] = useState({
    status: "all",
    title: "",
  });

  const columns = ["Title", "Status", "Description", "Created At"];

  const fetchTickets = async () => {
    try {
      const data = await TicketService.getAll(selectedFilter);
      const tickets: ITicket[] = data.tickets;
      setTickets(tickets);
    } catch (error) {
      console.log(error);
    }
  };

  const addFilters = async (e) => {
    setSelectedFilter({ ...selectedFilter, [e.target.name]: e.target.value });
  };

  const notification = (message, status) => {
    Notify(message, status);
  };
  useEffect(() => {
    fetchTickets();
  }, [selectedFilter]);

  return (
    <AppLayout>
      <Breadcrumb className="d-flex justify-center">
        <LinkContainer to="/dashboard">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>Tickets</Breadcrumb.Item>
        <Breadcrumb.Item active>List</Breadcrumb.Item>
      </Breadcrumb>
      <div className="content">
        <div className="topbar d-flex flex-column mb-3 gap-2">
          <div className="d-flex justify-content-between">
            <Form.Control placeholder="Search.." onChange={addFilters} name="title" value={selectedFilter?.title} />
            <Button className="customBtn" onClick={() => setModalShow(true)}>
              ADD
              <PlusCircle />
            </Button>
          </div>
          <div className="d-flex flex-column gap-2">
            <div className="filters">Filter by</div>
            <Form.Label>Status</Form.Label>
            <FormSelect style={{ width: "20%" }} name="status" value={selectedFilter.status} onChange={addFilters}>
              <option value="all">All</option>
              <option value="unassigned">Unassigned</option>
              <option value="awaiting-feedback">Awaiting Feedback</option>
              <option value="complete">Complete</option>
            </FormSelect>
          </div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tickets?.map((ticket) => (
              <TicketItem key={ticket._id} ticket={ticket} loadTickets={() => fetchTickets()} toaster={notification} />
            ))}
          </tbody>
        </table>
        <AddTicket show={modalShow} onHide={() => setModalShow(false)} loadTickets={() => fetchTickets()} toaster={notification} />
        <CustomToaster />
      </div>
    </AppLayout>
  );
}
