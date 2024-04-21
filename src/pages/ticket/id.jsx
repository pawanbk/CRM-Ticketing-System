import { React, useEffect, useState } from "react";
import AppLayout from "../../layout/AppLayout";
import { Breadcrumb } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { CustomToaster, Notify } from "../../shared/CustomToaster.tsx";
import { useParams } from "react-router-dom";
import TicketService from "../../api/TicketServices";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./id.css";
import CommentInput from "../../component/comment/CommentInput";
import CommentItem from "../../component/comment/CommentItem";


export default function TicketDetail(props) {
  const { id } = useParams();
  const [ticket, setTicket] = useState({
    _id: "",
    title: "",
    status: "",
    description: "",
    comments:[]
  });

  const [commentInput, setCommentInput] = useState("");

  const addComment = async() =>{
    try{
      const res = await TicketService.comment(id,commentInput);
      if(res.success === true) {
        setTicket(await res.ticket)
      }
    }catch(error){

    }
    setCommentInput('')
  }

  const fetchTicket = async () => {
    try {
      const result = await TicketService.get(id);
      if (result.success === true && result.ticket) {
        setTicket(result.ticket);
      }
    } catch (error) {
      console.log(error)
    }
  };

  const updateTicket = async (e) => {
    e.preventDefault();
    try {
      const res = await TicketService.update(ticket);
      if (res.success === true) {
        await Notify(res.message, "success");
        fetchTicket();
      }
    } catch (error) {}
  };

  const handleChange = (e) => {
    return setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchTicket();
  }, []);
  return (
    <AppLayout>
      <Breadcrumb className="d-flex justify-center">
        <LinkContainer to="/dashboard">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </LinkContainer>
        <LinkContainer to="/tickets">
          <Breadcrumb.Item>Tickets</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>{ticket.title}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="edit-form border rounded">
            <Form onSubmit={updateTicket}>
              <Form.Group className="mb-3 form-group">
                <Form.Label>Title</Form.Label>
                <Form.Control required type="text" name="title" value={ticket.title} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3 form-group">
                <Form.Label>Status</Form.Label>
                <Form.Select required type="select" name="status" onChange={handleChange}>
                  <option>Select One</option>
                  <option value="unassigned" selected={ticket.status === "unassigned"}>
                    Unassigned
                  </option>
                  <option value="awaiting-feedback" selected={ticket.status === "awaiting-feedback"}>
                    Awaiting Feedback
                  </option>
                  <option value="complete" selected={ticket.status === "complete"}>
                    Complete
                  </option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 form-group">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" placeholder="Leave a comment here" name="description" value={ticket.description} style={{ height: "100px" }} onChange={handleChange} />
              </Form.Group>
              <Button className="form-control mt-3 button" type="submit">
                Update
              </Button>
            </Form>
      </div>
      <div className="comment-box d-flex flex-column gap-2 border-start rounded">
        <CommentInput commentInput={commentInput} change ={(e)=> setCommentInput(e.target.value)} addComment={addComment}/>
        {ticket.comments && ticket.comments.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)).map((comment) =>
        <div className="rounded comment-item">
            <CommentItem comment={comment} />
        </div>
        )}
        
      </div>  
     
      <CustomToaster />
      
    </AppLayout>
  );
}
