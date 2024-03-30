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
      const response = await TicketService.create(inputs);
      if (response && response.success === true) {
        setIsLoading(false);
        setInputs({
          title: "",
          description: "",
        });
        await props.loadTickets();
        props.onHide();
        props.toaster(response.message, "success");
      }
    } catch (error) {
      Promise.reject(error.message);
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add New Ticket</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3 form-group">
            <Form.Label>Title</Form.Label>
            <Form.Control required type="text" name="title" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3 form-group">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" type="text" name="description" onChange={handleChange} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" className="customBtn" disabled={isLoading && "disabled"}>
            {isLoading ? "Adding..." : "ADD"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
