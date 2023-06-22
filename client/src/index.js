import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { UserProvider } from './components/UserContext';
import { InventoryProvider } from './components/InventoryContext';

ReactDOM.render(
    <InventoryProvider>
    <UserProvider>
      <App />
    </UserProvider>
    </InventoryProvider>,
  document.getElementById('root')
);
