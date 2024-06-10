import { BellFill } from 'react-bootstrap-icons';
import './Notification.css';
import { Link } from 'react-router-dom';

const Notification = ({ notifications, setShowNotificationModal }) => {
    // const { message, show, link } = notification;
    function hideNotification() {
        document.querySelector('.notification-container').style.display = 'none';
    }
    console.log(notifications)
    return (
        <>
            <div className="notification-container border rounded">
                {notifications ? notifications.map((notification, index) =>
                    <div key={index}>
                        <span className="font-bold d-flex text-sm gap-2 align-items-center"><BellFill color='blue' />You have recieved a notification.</span>
                        <span className="text-sm text-secondary pl-6">{notification?.message}</span>
                        {notification?.link && <Link className="font-bold text-sm ml-2" to={notification?.link}>Check it out</Link>}
                    </div>
                ) : 'No notifications'}
                <button className="btn-close" aria-label="Close" onClick={() => setShowNotificationModal(false)}></button>
            </div>

        </>
    )
}

export default Notification