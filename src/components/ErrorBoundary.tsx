"use client"

import React, { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the whole app
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo
    })
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 bg-gradient-to-br from-teal-50 via-indigo-50 to-emerald-50">
          <Card className="max-w-2xl w-full">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="p-2 sm:p-3 bg-red-100 rounded-full shrink-0">
                  <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-xl sm:text-2xl break-words">Something went wrong</CardTitle>
                  <CardDescription className="text-sm break-words">
                    We encountered an unexpected error. Don't worry, your data is safe.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-xs sm:text-sm break-words overflow-hidden">
                  <strong>Error:</strong> {this.state.error?.message || 'An unknown error occurred'}
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  This error has been logged. You can try the following:
                </p>
                <ul className="text-xs sm:text-sm text-muted-foreground space-y-2 list-disc list-inside break-words">
                  <li>Click the button below to try again</li>
                  <li>Refresh the page</li>
                  <li>Clear your browser cache and reload</li>
                  <li>Try using a different browser</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button onClick={this.handleReset} className="gap-2 min-h-[44px] w-full sm:w-auto">
                  <RefreshCcw className="h-4 w-4" />
                  <span className="text-sm sm:text-base">Try Again</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="gap-2 min-h-[44px] w-full sm:w-auto"
                >
                  <span className="text-sm sm:text-base">Reload Page</span>
                </Button>
              </div>

              {/* Show error details in development */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground">
                    Error Details (Development Only)
                  </summary>
                  <div className="mt-2 p-3 sm:p-4 bg-gray-100 rounded-md overflow-auto max-h-64">
                    <pre className="text-xs text-gray-800 whitespace-pre-wrap break-words overflow-hidden">
                      {this.state.error.toString()}
                      {'\n\n'}
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </div>
                </details>
              )}

              <Alert className="border-blue-200 bg-blue-50">
                <AlertDescription className="text-xs sm:text-sm text-blue-900 break-words">
                  <strong>Need help?</strong> If you continue to experience issues, 
                  please report this on our GitHub repository with the error message above.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
