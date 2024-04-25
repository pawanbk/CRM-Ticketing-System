import { useState, useEffect } from "react"
import CommentInput from "./CommentInput"
import { useParams } from "react-router-dom";
import moment from "moment";
import TicketService from "../../api/TicketServices";
import { capitalize } from "lodash";
import io from "socket.io-client";
import { useAuthStore } from "../../store.tsx";

const socket = io("http://localhost:3001");


const CommentItem = ({comment, fetchTicket}) => {
    const { id } = useParams();
    const secondsInDay = 24*60*60;
    const timeDifference = Math.abs(new Date() - new Date(comment.createdAt)) / 1000;

    const [isReplying, setIsReplying] = useState(false);
    const [showChildNodes, setShowChildNodes] = useState(false);

    const [replyInput, setReplyInput] = useState("");
    const {user} = useAuthStore();
  
    const addReplies = async ()=>{
        const res = await TicketService.reply(id, comment._id, replyInput )
        if(res.data.success === true){
            setReplyInput('')
            setIsReplying(false)
            fetchTicket();
            socket.emit("reply-created", {type: 'reply', message: `${comment.author.firstName} replied to your comment.`, user: user?.id || "", ticketId: id, replyTo:comment?.author?._id, link: `/tickets/edit/${id}`});
        }
    }
    return(
        <div className="p-1">
            <span className="text-primary">{user.id === comment.author._id ? 'You': capitalize(comment.author?.firstName)}</span>
            <div className="d-flex justify-between">
                <span>{comment?.content}</span>
                {timeDifference > secondsInDay ? 
                moment(comment?.createdAt).format('DD-MM-YY h:mm a') 
                : moment(comment?.createdAt).fromNow(true)} 
            </div>
        
            <div className="px-2">
                {user.id !== comment.author._id ? <button className="btn-small" onClick={()=>setIsReplying(true)}>Reply</button> : <button className="btn-small" >Edit</button>} 
                { comment.replies?.length > 0 && (showChildNodes ? 
                <button className="btn-small mx-2" onClick={()=>setShowChildNodes(false)}>Hide Replies</button> 
                :<button className="btn-small mx-2" onClick={()=>setShowChildNodes(true)}>View Replies</button>)
                }
            </div>
            
            {showChildNodes && comment.replies?.map((comment) =>
                <div className="p-2 mb-1 border-start border-dark">
                    <CommentItem key={comment.id} comment={comment} fetchTicket={fetchTicket}/>
                </div>
            )}

            {(isReplying)&& 
                <CommentInput 
                    commentInput={replyInput} 
                    change = {(e) => setReplyInput(e.target.value)} 
                    addComment={addReplies} 
                    cancelBtn={true} 
                    hideCommentInput={() => setIsReplying(false)}/>
            }
        </div>
    )
}

export default CommentItem