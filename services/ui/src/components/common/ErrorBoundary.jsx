import React, { Component } from 'react';

export const ERROR_TYPES = {
  DEFAULT: 'Something went wrong.We are working on it.Please check with Admin.',
  APP_LEVEL: 'Something went wrong.Please check with Admin',
  COMPONENT_LEVEL: 'Something went wrong.Please try again later',
};

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // log error to an error reporting service
    console.debug('error ', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children, type } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      // eslint-disable-next-line react/react-in-jsx-scope
      return <h4>{type}</h4>;
    }

    return children;
  }
}

export default ErrorBoundary;
