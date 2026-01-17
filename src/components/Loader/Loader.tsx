import { Component } from 'react';

import './LoaderStyles.scss';

class Loader extends Component {
  render(): React.ReactNode {
    return (
      <div className="loader-wrapper" data-testid="loader-wrapper">
        <div className="dog-walk" data-testid="dog-walk" />
      </div>
    );
  }
}

export default Loader;
