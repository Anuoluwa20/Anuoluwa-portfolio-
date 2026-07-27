import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress unhandled errors/rejections originating from third-party browser extensions (e.g. MetaMask, Wallet extensions)
if (typeof window !== 'undefined') {
  const isExtensionError = (err: any) => {
    if (!err) return false;
    let str = '';
    try {
      if (typeof err === 'string') {
        str = err;
      } else if (err instanceof Error) {
        str = `${err.name} ${err.message} ${err.stack || ''}`;
      } else if (typeof err === 'object') {
        str = `${err.message || ''} ${err.code || ''} ${err.reason || ''} ${err.filename || ''} ${err.type || ''} ${JSON.stringify(err)}`;
      } else {
        str = String(err);
      }
    } catch {
      str = String(err);
    }
    const lower = str.toLowerCase();
    return (
      lower.includes('metamask') ||
      lower.includes('ethereum') ||
      lower.includes('wallet') ||
      lower.includes('web3') ||
      lower.includes('failed to connect') ||
      lower.includes('user rejected') ||
      lower.includes('eip-1193') ||
      lower.includes('eip6963') ||
      lower.includes('injected') ||
      lower.includes('provider') ||
      lower.includes('coinbase') ||
      lower.includes('phantom')
    );
  };

  // Intercept console.error and console.warn for extension noise
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    if (args.some((arg) => isExtensionError(arg))) {
      return;
    }
    originalConsoleError.apply(console, args);
  };

  const originalConsoleWarn = console.warn;
  console.warn = (...args: any[]) => {
    if (args.some((arg) => isExtensionError(arg))) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };

  // Handle window.onerror
  const originalOnError = window.onerror;
  window.onerror = (message, source, lineno, colno, error) => {
    if (isExtensionError(message) || isExtensionError(error) || isExtensionError(source)) {
      return true; // Prevents error from bubbling up
    }
    if (originalOnError) {
      return originalOnError(message, source, lineno, colno, error);
    }
    return false;
  };

  // Handle window.onunhandledrejection
  const originalOnUnhandledRejection = window.onunhandledrejection;
  window.onunhandledrejection = (event: PromiseRejectionEvent) => {
    if (isExtensionError(event.reason) || isExtensionError(event.promise)) {
      event.preventDefault();
      return true;
    }
    if (originalOnUnhandledRejection) {
      return originalOnUnhandledRejection.call(window, event);
    }
  };

  window.addEventListener(
    'unhandledrejection',
    (event) => {
      if (isExtensionError(event.reason) || isExtensionError(event.promise)) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }
    },
    true
  );

  window.addEventListener(
    'error',
    (event) => {
      if (
        isExtensionError(event.message) ||
        isExtensionError(event.error) ||
        isExtensionError(event.filename)
      ) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }
    },
    true
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

