import { toast } from 'react-toastify';

function Notification({ type, message }) {
  if (type === 'success') {
    toast.success(message);
  } else if (type === 'error') {
    toast.error(message);
  } else {
    toast.info(message);
  }

  return null; 
}

export default Notification;
