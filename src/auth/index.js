import { Navigate } from 'react-router-dom';

export default function Auth({ children }) {
    // console.log(typeof JSON.parse(localStorage.getItem('auth_authenticated')));
    if (JSON.parse(localStorage.getItem('auth_authenticated')) !== true) {
        return <Navigate to="/login" />;
    }

    return children;
}
