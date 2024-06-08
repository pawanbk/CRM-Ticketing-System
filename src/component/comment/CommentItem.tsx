import React, { useState } from "react"
import CommentInput from "./CommentInput.jsx"
import { useParams } from "react-router-dom";
import moment from "moment";
import TicketService from "../../api/TicketServices.js";
import { capitalize } from "lodash";
import io from "socket.io-client";
import "./CommentItem.css";
import { useAuthStore } from "../../store.tsx";

const socket = io("http://localhost:3001");

const CommentItem = ({ comment, fetchTicket, eventEditClicked }) => {
    const { id } = useParams();
    const secondsInDay = 24 * 60 * 60;
    const timeDifference = Math.abs(new Date().getTime() - new Date(comment.createdAt).getTime()) / 1000;

    const [isReplying, setIsReplying] = useState(false);
    const [showChildNodes, setShowChildNodes] = useState(false);

    const [replyInput, setReplyInput] = useState("");
    const { user } = useAuthStore();

    const addReplies = async () => {
        const res = await TicketService.reply(id, comment._id, replyInput)
        if (res.data.success === true) {
            setReplyInput('')
            setIsReplying(false)
            fetchTicket();
            socket.emit("reply-created", { type: 'reply', message: `${user.username} replied to your comment.`, user: user?.id || "", ticketId: id, replyTo: comment?.author?._id, link: `/tickets/edit/${id}` });
        }
    }
    return (
        <div className="p-1">
            <div className="d-flex justify-between">
                <div className="d-flex gap-3">
                    <div className="profileInitials rounded-circle d-flex justify-content-center align-items-center">{capitalize(comment.author?.firstName).slice(0, 1) + capitalize(comment.author?.lastName).slice(0, 1)}</div>
                    <div className="d-flex flex-column gap-1">
                        <span className="text-color-primary">{user._id === comment.author._id ? 'You' : capitalize(comment.author?.firstName)}</span>
                        <div className="comment-content">
                            <span style={{ wordBreak: 'break-word' }}>{comment?.content}</span>
                        </div>
                        <div className="pb-1">
                            <span className="text-sm mr-1">
                                {timeDifference > secondsInDay ?
                                    moment(comment?.createdAt).format('DD-MM-YY h:mm a')
                                    : capitalize(moment(comment?.createdAt).fromNow(true)) + ' ago'}
                            </span>
                            {user._id !== comment.author._id ? <button className="btn-small" onClick={() => setIsReplying(true)}>Reply</button> : <button className="btn-small" onClick={() => eventEditClicked(comment)}>Edit</button>}
                            {comment.replies?.length > 0 && (showChildNodes ?
                                <button className="btn-small mx-2" onClick={() => setShowChildNodes(false)}>Hide Replies</button>
                                : <button className="btn-small mx-2" onClick={() => setShowChildNodes(true)}>View Replies</button>)
                            }
                        </div>
                    </div>
                </div>

            </div>



            {
                showChildNodes && comment.replies?.map((comment) =>
                    <div className="p-2 mb-1 border-top">
                        <CommentItem key={comment.id} comment={comment} fetchTicket={fetchTicket} eventEditClicked={eventEditClicked} />
                    </div>
                )
            }

            {
                (isReplying) &&
                <CommentInput
                    commentInput={replyInput}
                    change={(e) => setReplyInput(e.target.value)}
                    addComment={addReplies}
                    cancelBtn={true}
                    hideCommentInput={() => setIsReplying(false)} />
            }
        </div >
    )
}

export default CommentItem