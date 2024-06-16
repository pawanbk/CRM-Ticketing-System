import { BellFill } from 'react-bootstrap-icons';
import './Notification.css';
import { Link } from 'react-router-dom';

const Notification = ({ notifications, setShowNotificationModal }) => {
    return (
        <>
            <div className="notification-container border rounded">
                {notifications.length ? notifications.map((notification, index) =>
                    <div key={index} className="mb-3">
                        <span className="font-bold d-flex text-sm gap-2 align-items-center"><BellFill color='blue' /><Link className="font-bold text-sm ml-2 text-decoration-none text-dark" to={notification?.link}>{notification?.message}</Link></span>
                    </div>
                ) : 'No notifications'}
                <button className="btn-close" aria-label="Close" onClick={() => setShowNotificationModal(false)}></button>
            </div>

        </>
    )
}

export default Notification