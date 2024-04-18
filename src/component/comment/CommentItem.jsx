import { useState } from "react"
import CommentInput from "./CommentInput"
import Moment from "react-moment";
import { useParams } from "react-router-dom";

const CommentItem = ({comment,setComments}) => {
    const { id } = useParams();
    const [isReplying, setIsReplying] = useState(false);
    const [showChildNodes, setShowChildNodes] = useState(false);

    const [replies, setReplies] = useState(comment.comments);

    const [replyInput, setReplyInput] = useState("");
  
    const addReplies = ()=>{
        setReplies((prev)=>[{id:'', comment:replyInput, comments:[]}, ...prev])
        setReplyInput('')
        setIsReplying(false)
    }
    return(
    <div className="p-1">
        <div className="d-flex justify-between">
            <span>{comment?.message}</span>
            <Moment fromNow>{new Date(comment.createdAt)} </Moment>

        </div>
      
        <div className="px-2">
            <button className="btn-small" onClick={()=>setIsReplying(true)}>Reply</button>
            
            { replies && replies.length > 0 && (showChildNodes ? <button className="btn-small mx-2" onClick={()=>setShowChildNodes(false)}>Hide all</button> :<button className="btn-small mx-2" onClick={()=>setShowChildNodes(true)}>View all</button>)}
        </div>
        
        {showChildNodes && replies && replies.map((comment) =>
            <div className="pl-1 border-start border-dark">
                <CommentItem comment={comment} setComments={setComments}/>
            </div>
        )}
        {isReplying && 
            <CommentInput commentInput={replyInput} change = {(e) => setReplyInput(e.target.value)} addComment={addReplies} cancelBtn={true} hideCommentInput={() => setIsReplying(false)}/>
        }
    </div>
    )
}

export default CommentItem