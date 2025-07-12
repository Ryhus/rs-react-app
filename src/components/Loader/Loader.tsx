import { Component } from 'react';

import './LoaderStyles.scss';

class Loader extends Component {
  render(): React.ReactNode {
    return (
      <div className="loader-wrapper">
        <div className="dog-walk" />
      </div>
    );
  }
}

export default Loader;
