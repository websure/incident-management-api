import React, { useEffect } from 'react';
import ErrorBoundary, {
  ERROR_TYPES,
} from './components/common/ErrorBoundary.jsx';
// /import StoreProvider from './store/ContextManagement';
import Routes from './Routes';
import AppStoreProvider from './store/AppStore';

const App = () => (
  <div className="App">
    <AppStoreProvider>
      <ErrorBoundary type={ERROR_TYPES.DEFAULT}>
        <Routes />
      </ErrorBoundary>
    </AppStoreProvider>
  </div>
);

export default App;
