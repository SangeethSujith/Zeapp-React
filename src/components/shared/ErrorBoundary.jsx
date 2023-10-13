import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error or perform any error handling tasks
    console.error(error);
    console.error(errorInfo);

    // Set hasError to true
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      // Render fallback UI for the error case
      return <div>Something went wrong. Please try again later.</div>;
    }

    // Render the children if there are no errors
    return children;
  }
}

export default ErrorBoundary;
