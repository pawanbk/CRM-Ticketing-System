import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import TicketService from "../api/TicketServices";

export default function AddTicket(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await TicketService.createTicket(inputs);
      if (response && response.success === true) {
        setIsLoading(false);
        setInputs({
          title: "",
          description: "",
        });
        await props.loadTickets();
        props.hideModal();
        props.toaster(response.message, "success");
      }
    } catch (error) {
      Promise.reject(error.message);
    }
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" top>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add New Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 form-group">
            <Form.Label>Title</Form.Label>
            <Form.Control required type="text" name="title" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3 form-group">
            <Form.Label>Description</Form.Label>
            <Form.Control required type="text" name="description" onChange={handleChange} />
          </Form.Group>
          <Button type="submit" className="customBtn" disabled={isLoading && "disabled"}>
            {isLoading ? "Adding..." : "ADD"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
