import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { useEffect, useState, type JSX } from 'react';
import { supabase } from './services/supabaseClient';
import { type Session } from '@supabase/supabase-js';
import Login from './scenes/Login/Login';
import Dashboard from './scenes/Dashboard/Dashboard';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
            setLoading(false);
        };

        getSession();

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => setSession(session)
        );

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);

    if (loading) return null;

    if (!session) return <Navigate to="/" replace />;

    return children;
};

const App: React.FC = () => {
    return (
        <Router future={{ v7_relativeSplatPath: true }}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
