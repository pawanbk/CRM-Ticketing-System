import { BellFill } from 'react-bootstrap-icons';
import './Notification.css';
import { Link } from 'react-router-dom';

const Notification = ({notification}) => {
    const { message, show, link} = notification;
    function hideNotification(){
        document.querySelector('.notification-container').style.display = 'none';
    }   
    return(
        <>
        {show && 
            <div className="notification-container border rounded">
                <span className="font-bold d-flex text-sm gap-2 align-items-center"><BellFill color='blue'/>You have recieved a notification.</span>
                <span className="text-sm text-secondary pl-6">{message}</span>
                {link && <Link className="font-bold text-sm ml-2" to={link}>Check it out</Link>}
                <button className="btn-close" aria-label="Close" onClick={hideNotification}></button>
            </div>
        }

        </>
    )
}

export default Notification