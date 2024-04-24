import { useState } from "react"
import CommentInput from "./CommentInput"
import { useParams } from "react-router-dom";
import moment from "moment";
import TicketService from "../../api/TicketServices";
import { capitalize } from "lodash";

const CommentItem = ({comment, fetchTicket}) => {
    const { id } = useParams();
    const secondsInDay = 24*60*60;
    const timeDifference = Math.abs(new Date() - new Date(comment.createdAt)) / 1000;

    const [isReplying, setIsReplying] = useState(false);
    const [showChildNodes, setShowChildNodes] = useState(false);

    const [replyInput, setReplyInput] = useState("");
  
    const addReplies = async ()=>{
        const res = await TicketService.reply(id, comment._id, replyInput )
        if(res.data.success === true){
            setReplyInput('')
            setIsReplying(false)
            fetchTicket();
        }
      
    }

    return(
        <div className="p-1">
            <span className="text-primary">{capitalize(comment.author?.firstName)}</span>
            <div className="d-flex justify-between">
                <span>{comment?.content}</span>
                {timeDifference > secondsInDay ? 
                moment(comment?.createdAt).format('DD-MM-YY h:mm a') 
                : moment(comment?.createdAt).fromNow(true)} 
            </div>
        
            <div className="px-2">
                <button className="btn-small" onClick={()=>setIsReplying(true)}>Reply</button>
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