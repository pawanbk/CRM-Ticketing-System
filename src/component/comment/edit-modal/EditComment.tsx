import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import TextareaAutosize from 'react-textarea-autosize';
import TicketService from "../../../api/TicketServices";
import { CheckCircle } from "react-bootstrap-icons";
import './style.css'
import { useState } from "react";
import { capitalize } from "lodash";
import moment from "moment";

const EditComment = ({ show, setShow, comment, fetchTicket }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [commentInput, setCommentInput] = useState("");
    const [success, setSuccess] = useState(false);
    const secondsInDay = 24 * 60 * 60;
    const timeDifference = Math.abs(new Date().getTime() - new Date(comment.createdAt).getTime()) / 1000;

    const handleChange = (e) => {
        setCommentInput(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const { ticketId, _id } = comment;
        const res = await TicketService.editComment(ticketId, _id, commentInput)
        if (res.data.success === true) {
            setIsLoading(false);
            setSuccess(true);
            fetchTicket();
        }
    }

    useEffect(() => {
        setCommentInput(comment.content);
        return () => {
            setSuccess(false);
        }

    }, [comment])

    return (
        <>
            {
                show &&
                <div className="background">
                    <div className="custom-modal">
                        {
                            success &&
                            <div className="success-div">
                                <CheckCircle style={{ fontSize: '40px', color: 'green' }}></CheckCircle>
                                Success
                            </div>
                        }
                        <span className="btn-close" onClick={() => setShow(false)}></span>
                        <div className="d-flex gap-3 mb-2">
                            <div className="profileInitials rounded-circle d-flex justify-content-center align-items-center">{capitalize(comment.author?.firstName).slice(0, 1) + capitalize(comment.author?.lastName).slice(0, 1)}</div>
                            <span className="text-color-primary">You</span>
                        </div>

                        < TextareaAutosize
                            className="w-100 p-2 border rounded"
                            value={commentInput}
                            onChange={handleChange}
                        />
                        <div className="d-flex flex-column align-items-end">
                            <span className="text-sm mt-2 float-right">
                                Created at {timeDifference > secondsInDay ?
                                    moment(comment?.createdAt).format('DD-MM-YY h:mm a')
                                    : capitalize(moment(comment?.createdAt).fromNow(true)) + ' ago'}
                            </span>
                            <Button type="submit" className="customBtn mt-3 py-1" style={{ fontSize: '13px' }} disabled={isLoading} onClick={handleSubmit}>
                                {isLoading ? "Updating..." : "Save"}
                            </Button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default EditComment