import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import TextareaAutosize from 'react-textarea-autosize';
import TicketService from "../../../api/TicketServices";
import { CheckCircle } from "react-bootstrap-icons";
import './style.css'
import { useState } from "react";

const EditComment = ({show, setShow, comment, fetchTicket}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [commentInput, setCommentInput] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setCommentInput(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const {ticketId, _id} = comment;
        const res = await TicketService.editComment(ticketId, _id, commentInput)
        if (res.data.success === true) {
            setIsLoading(false);
            setSuccess(true);
            fetchTicket();
        }
    }

    useEffect(() => {
        setCommentInput(comment.content);
    }, [comment])

    return (
      <>
        {
            show &&
            <div className="background">
                <div className="custom-modal">
                    {
                        success &&
                        <div className="d-flex flex-column justify-content-center align-items-center mb-2">
                            <CheckCircle style={{marginRight:'10px', fontSize:'20px', color:'green'}}></CheckCircle>
                            Success
                        </div>
                    }
                    <span className="btn-close" onClick={() => setShow(false)}></span>
                    <TextareaAutosize
                        className="w-100 p-2 border rounded mt-1"
                        value={commentInput}
                        onChange={handleChange}
                    />
                    <Button type="submit" className="customBtn mt-1 float-right" disabled={isLoading} onClick={handleSubmit}>
                        {isLoading ? "Updating..." : "Save"}
                    </Button>
                </div>
            </div>
        }
      </>
    )
}

export default EditComment