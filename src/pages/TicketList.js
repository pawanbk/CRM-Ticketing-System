import { useEffect, useState } from "react";
import AppLayout from "../layout/AppLayout";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { LinkContainer } from "react-router-bootstrap";
import TicketItem from "../component/TicketItem";
import "./TicketList.css";
import Search from "../component/search/Search";
import { Button } from "react-bootstrap";
import AddTicket from "../component/AddTicket";
import axiosInstance from "../config/axios";
import TicketService from "../api/TicketServices";
import { PlusCircle } from "react-bootstrap-icons";
import { CustomToaster, Notify } from "../shared/CustomToaster";

export default function TicketList() {
  const [modalShow, setModalShow] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const columns = ["Title", "Status", "Description", "Created At"];

  const fetchTickets = async () => {
    try {
      const data = await TicketService.getAll();
      const tickets = await data.tickets;
      setTickets(tickets);
    } catch (error) {
      console.log(error);
    }
  };

  const notification = (message, status) => {
    Notify(message, status);
  };
  useEffect(() => {
    fetchTickets();
  }, []);

  const search = async (e) => {
    const query = e.target.value;
    await axiosInstance.get(`ticket/search/${query}`).then((res) => {
      if (res.data?.success === true) setFilteredTickets(res.data.filtered);
    });
  };
  return (
    <AppLayout>
      <Breadcrumb>
        <LinkContainer to="/dashboard">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>Tickets</Breadcrumb.Item>
        <Breadcrumb.Item active>List</Breadcrumb.Item>
      </Breadcrumb>
      <div className="content">
        <div className="topbar d-flex justify-content-around">
          <Search keyup={search} />
          <Button className="customBtn" onClick={() => setModalShow(true)}>
            ADD
            <PlusCircle />
          </Button>
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
              <TicketItem key={ticket._id} ticket={ticket} />
            ))}
          </tbody>
        </table>
      </div>
      <AddTicket show={modalShow} onHide={() => setModalShow(false)} loadTickets={() => fetchTickets()} toaster={notification} />
      <CustomToaster />
    </AppLayout>
  );
}
