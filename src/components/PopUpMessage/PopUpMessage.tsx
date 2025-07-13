import { Component } from 'react';

import './PopUpMessageStyles.scss';

interface PopUpMessageProps {
  message: string;
  onClose: () => void;
}

class PopUpMessage extends Component<PopUpMessageProps> {
  componentDidMount() {
    setTimeout(this.props.onClose, 3000);
  }

  render() {
    return <div className="pop-up-message">{this.props.message}</div>;
  }
}

export default PopUpMessage;
