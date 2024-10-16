// frontend/src/App.js
import React from 'react';
import { useRoutes } from 'react-router-dom';
import Intro from './components/Intro.js';
import UserDashboard from './user/user-dashboard.js';
import AgentDashboard from './agent/agent-dashboard';
import Properties from './agent/properties';
import SearchResults from './user/SearchResult.js';
import UserForum from './components/userforum.js';
import Analytics from './agent/Analytics.js';
import ForumPost from './pages/ForumPost.js';
import Forum from './pages/Forum.js';
import Chat from './pages/Chat.js';
import Messages from './pages/Messages.js';
import Settings from './settings.js';
import AgentSettings from './agent/agentsettings.js';
import Notifications from './notifications.js';
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute
import EditInformation from './EditInformation.js';

const AppRoutes = () => {
    return useRoutes([
        {
            path: "/agent-dashboard",
            element: <PrivateRoute roles={['agent']} />, // Parent route with role 'agent'
            children: [
                { path: "", element: <AgentDashboard /> }, // /agent-dashboard
                { path: "properties", element: <Properties /> }, // /agent-dashboard/properties
                { path: "analytics", element: <Analytics /> }, // /agent-dashboard/analytics
                { path: "mysettings", element: <AgentSettings /> }, // /agent-dashboard/mysettings
                // Add more nested agent routes here
            ]
        },
        {
            path: "/user-dashboard",
            element: <PrivateRoute roles={['user', 'agent']} />, // Parent route with roles 'user' and 'agent'
            children: [
                { path: "", element: <UserDashboard /> },
                { path: "settings", element: <Settings/> },
                { path: "edit-information", element: <EditInformation/> },
                 // /user-dashboard
                // Add more nested user dashboard routes here
            ]
        },
        { path: "/", element: <Intro /> },
        { path: "/search", element: <SearchResults /> },
        { path: "/user-forum", element: <UserForum /> },
        { path: "/forumpost", element: <ForumPost /> },
        { path: "/forum", element: <Forum /> },
        { path: "/chats", element: <Chat /> },
        { path: "/messages", element: <Messages /> },
        { path: "/notifications", element: <Notifications /> },
        // Add more public routes here
    ]);
};

function App() {
    return <AppRoutes />;
}

export default App;
