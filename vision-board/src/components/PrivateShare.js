import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function PrivateShareModal({ goalId, onClose }) {
  const [emails, setEmails] = useState('');

  const handleShare = async () => {
    try {
      await axios.post(`/api/goals/${goalId}/share/private`, { sharedWith: emails.split(',') });
      onClose();
    } catch (error) {
      toast.error('Error sharing goal');
    }
  };

  return (
    <div className="modal">
      <h4>Share with specific people</h4>
      <input
        type="text"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
        placeholder="Enter emails separated by commas"
      />
      <button onClick={handleShare}>Share</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default PrivateShareModal;
