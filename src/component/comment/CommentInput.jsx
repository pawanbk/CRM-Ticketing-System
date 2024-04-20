import { Form } from "react-bootstrap"
import './CommentInput.css'

const CommentInput = (props) => {
    return(
    <div className="comment-input">
        <Form.Control 
            className="w-100"
            as="textarea" placeholder="comment here..." 
            name="commentInput" 
            value={props.commentInput} 
            onChange={props.change}></Form.Control>
            <div className="float-right  my-1">
                {props.cancelBtn && 
                <button className="btn btn-sm btn-secondary" onClick={props.hideCommentInput}>Cancel</button>}
            
                <button className="btn btn-sm btn-primary mx-1" onClick={props.addComment}>Comment</button>
            </div>
            
    </div>
    )
}

export default CommentInput