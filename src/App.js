import React from 'react';
import { useRoutes } from 'react-router-dom';
import Intro from './components/Intro.js';
import UserDashboard from './user/user-dashboard.js';
import AgentDashboard from './agent/agent-dashboard.js';
import Properties from './agent/properties.js';
import SearchResults from './user/SearchResult.js';
import Analytics from './agent/Analytics.js';
import GroupForum from './pages/forum.js';
import PrivateChat from './pages/privatechat.js';
import Settings from './settings.js';
import AgentSettings from './agent/agentsettings.js';
import Notifications from './notifications.js';
import PrivateRoute from './PrivateRoute.js';
import EditInformation from './EditInformation.js';

const AppRoutes = () => {
  return useRoutes([
    {
      path: "/agent-dashboard",
      element: <PrivateRoute roles={['agent']} />, 
      children: [
        { path: "", element: <AgentDashboard /> },
        { path: "properties", element: <Properties /> },
        { path: "analytics", element: <Analytics /> },
        { path: "mysettings", element: <AgentSettings /> },
      ]
    },
    {
      path: "/user-dashboard",
      element: <PrivateRoute roles={['user']} />, 
      children: [
        { path: "", element: <UserDashboard /> },
        { path: "settings", element: <Settings /> },
        { path: "edit-information", element: <EditInformation /> },
      ]
    },
    { path: "/", element: <Intro /> },
    { path: "/search", element: <SearchResults /> },
    { path: "/forum", element: <GroupForum /> },
    { path: "/chats", element: <PrivateChat /> },
    { path: "/notifications", element: <Notifications /> },
  ]);
};

function App() {
  return <AppRoutes />;
}

export default App;
