import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Notes from './Components/Notes'
import store from './dataSource/store'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Notes />
      </div>
    </Provider>
  );
}

export default App;
