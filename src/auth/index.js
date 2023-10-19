import { Navigate } from 'react-router-dom';

export default function Auth({ children }) {
    if (!localStorage.todoApp_accessToken) {
        return <Navigate to="/login" />;
    }

    return children;
}
