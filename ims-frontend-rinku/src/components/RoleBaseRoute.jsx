import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleBasedRoute = ({ children, allowedRoles, userRoles }) => {
    const hasAccess = allowedRoles.some(role => userRoles.includes(role));

    return hasAccess ? children : <Navigate to="/unauthorized" />;
};

export default RoleBasedRoute;