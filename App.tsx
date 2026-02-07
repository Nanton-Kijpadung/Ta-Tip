
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import HostLayout from './components/HostLayout';
import HostClassList from './components/HostClassList';
import HostClassDetail from './components/HostClassDetail';
import HostUserSummary from './components/HostUserSummary';
import ParticipantPortal from './components/ParticipantPortal';
import HostReports from './components/HostReports';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/participant/*" element={<ParticipantPortal />} />
        <Route path="/host" element={<HostLayout />}>
          <Route index element={<HostClassList />} />
          <Route path="class/:classId" element={<HostClassDetail />} />
          <Route path="user/:userId" element={<HostUserSummary />} />
          <Route path="reports" element={<HostReports />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
