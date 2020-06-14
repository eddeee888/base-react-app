import React, { ErrorInfo } from "react";
import Error500 from "common/components/Error500";

interface State {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });
  }

  render(): React.ReactNode {
    const { children } = this.props;
    const { error } = this.state;
    if (error) {
      console.error(error);
      return <Error500 />;
    }

    return children;
  }
}

export default ErrorBoundary;
