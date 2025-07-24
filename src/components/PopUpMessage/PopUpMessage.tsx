import { useEffect } from 'react';

import './PopUpMessageStyles.scss';

interface PopUpMessageProps {
  message: string;
  onClose: () => void;
}

function PopUpMessage({ message, onClose }: PopUpMessageProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return <div className="pop-up-message">{message}</div>;
}

export default PopUpMessage;
