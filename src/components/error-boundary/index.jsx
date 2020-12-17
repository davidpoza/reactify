import React from "react";
import PropType from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false
    };
    this.onClick = this.onClick.bind(this);
  }

  static getDerivedStateFromError() {
    return {
      error: true
    };
  }

  onClick() {
    this.props.onReset();
    this.setState({ error: false });
  }

  render() {
    const { error } = this.state;
    const { message, children, onReset } = this.props;
    if (error === true) {
      return (
        <div>
          <h1>{message}</h1>
          {
            onReset &&
            <button onClick={this.onClick}>Retry</button>
          }
        </div>
      );
    }
    return children;
  }
}

ErrorBoundary.propType = {
  message: PropType.string,
  onReset: PropType.func,
};

export default ErrorBoundary;