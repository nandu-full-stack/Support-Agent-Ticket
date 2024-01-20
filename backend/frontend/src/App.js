import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import "./App.css"
import Agent from './pages/agentPage/Agent';
import Ticket from './pages/ticketPage/Ticket';


function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Agent />} />
          <Route path="/createTicket" element={<Ticket />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
