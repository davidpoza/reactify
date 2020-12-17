import React from "react";
import PropType from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false
    };
  }

  static getDerivedStateFromError() {
    return {
      error: true
    };
  }

  render() {
    const { error } = this.state;
    const { message, children } = this.props;
    if (error === true) {
      return (
        <div>
          <h1>{message}</h1>
        </div>
      );
    }
    return children;
  }
}

ErrorBoundary.propType = {
  message: PropType.string,
};

export default ErrorBoundary;