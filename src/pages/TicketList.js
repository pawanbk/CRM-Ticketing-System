import { useEffect, useState } from "react";
import AppLayout from "../layout/AppLayout";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { LinkContainer } from "react-router-bootstrap";
import TicketItem from "../component/TicketItem";
import "./TicketList.css";
import Search from "../component/Search";
import { Button } from "react-bootstrap";
import AddTicket from "../component/AddTicket";
import { axiosInstance } from "../config/axios";

export default function TicketList() {
  const [modalShow, setModalShow] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    try {
      axiosInstance
        .get("ticket/all")
        .then((res) => {
          if (res.data.success === true) setTickets(res.data.tickets);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    } catch (error) {
      return Promise.reject(error.message);
    }
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
      <div>
        <div className="search-box d-flex">
          <Search className="search-box" keyup={search} />
          <Button className="customBtn" onClick={() => setModalShow(true)}>
            ADD
          </Button>
        </div>
        <TicketItem tickets={tickets} />
      </div>
      <AddTicket show={modalShow} onHide={() => setModalShow(false)} />
    </AppLayout>
  );
}
