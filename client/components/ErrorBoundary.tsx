import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary] 🔴 Caught error:", error);
    console.error("[ErrorBoundary] 📍 Component stack:", errorInfo.componentStack);
    
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <Card className="max-w-2xl w-full shadow-2xl">
            <CardHeader className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-10 h-10 text-red-500 flex-shrink-0" />
                <div>
                  <CardTitle className="text-2xl text-red-900 dark:text-red-100">
                    Something Went Wrong
                  </CardTitle>
                  <CardDescription className="text-red-700 dark:text-red-300">
                    The application encountered an unexpected error
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {/* Error Message */}
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2 flex items-center gap-2">
                  <span>🔍</span> Error Details:
                </h3>
                <p className="text-sm text-red-800 dark:text-red-200 font-mono break-words">
                  {this.state.error?.toString()}
                </p>
              </div>

              {/* Technical Details */}
              {this.state.errorInfo && (
                <details className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border border-gray-300 dark:border-gray-700">
                  <summary className="cursor-pointer font-semibold text-gray-900 dark:text-gray-100 mb-2 hover:text-blue-600">
                    📋 Technical Details (for developers)
                  </summary>
                  <pre className="text-xs overflow-auto max-h-64 text-gray-700 dark:text-gray-300 mt-2 p-3 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}

              {/* Common Solutions */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  💡 Try these solutions:
                </h3>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
                  <li>Reload the application using the button below</li>
                  <li>Clear your browser cache (Ctrl+Shift+Delete)</li>
                  <li>Check your internet connection</li>
                  <li>Try accessing the site in incognito/private mode</li>
                  <li>If the problem persists, contact support</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  onClick={this.handleReset} 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reload Application
                </Button>
                <Button 
                  onClick={this.handleGoHome} 
                  variant="outline" 
                  className="flex-1"
                  size="lg"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go to Homepage
                </Button>
              </div>

              {/* Footer */}
              <div className="text-sm text-gray-600 dark:text-gray-400 text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <p>
                  <strong>Error ID:</strong> {Date.now().toString(36)}
                </p>
                <p className="mt-1">
                  If this problem continues, please screenshot this page and contact support.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
