import { React, useEffect, useState } from "react";
import AppLayout from "../../layout/AppLayout";
import { Breadcrumb } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { CustomToaster, Notify } from "../../shared/CustomToaster";
import { useParams } from "react-router-dom";
import TicketService from "../../api/TicketServices";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./id.css";

export default function TicketDetail(props) {
  const { id } = useParams();
  const [inputs, setInputs] = useState({
    _id: "",
    title: "",
    status: "",
    description: "",
  });
  const fetchTicket = async () => {
    try {
      const result = await TicketService.get(id);
      if (result.success === true && result.ticket) {
        setInputs(result.ticket);
      }
    } catch (error) {}
  };

  const updateTicket = async (e) => {
    e.preventDefault();
    try {
      const res = await TicketService.update(inputs);
      if (res.success === true) {
        await Notify(res.message, "success");
        fetchTicket();
      }
    } catch (error) {}
  };

  const handleChange = (e) => {
    return setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchTicket();
  }, []);
  return (
    <AppLayout>
      <Breadcrumb>
        <LinkContainer to="/dashboard">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </LinkContainer>
        <LinkContainer to="/tickets">
          <Breadcrumb.Item>Tickets</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>{inputs.title}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="card-content">
        <div className="card">
          <div className="card-body">
            <Form onSubmit={updateTicket}>
              <Form.Group className="mb-3 form-group">
                <Form.Label>Title</Form.Label>
                <Form.Control required type="text" name="title" value={inputs.title} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3 form-group">
                <Form.Label>Status</Form.Label>
                <Form.Select required type="select" name="status" onChange={handleChange}>
                  <option>Select One</option>
                  <option value="unassigned" selected={inputs.status === "unassigned"}>
                    Unassigned
                  </option>
                  <option value="awaiting-feedback" selected={inputs.status === "awaiting-feedback"}>
                    Awaiting Feedback
                  </option>
                  <option value="complete" selected={inputs.status === "complete"}>
                    Complete
                  </option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 form-group">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" placeholder="Leave a comment here" name="description" value={inputs.description} style={{ height: "100px" }} onChange={handleChange} />
              </Form.Group>
              <Button className="form-control mt-3 button" type="submit">
                Update
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <CustomToaster />
    </AppLayout>
  );
}
