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
import HomePage from './scenes/HomePage/HomePage';
import { useModalStore } from './store/useModalStore';
import GlobalModal from './components/GlobalModal';

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
    const { isModalOpen, closeModal, modalContent, modalTitle } =
        useModalStore();
    return (
        <Router future={{ v7_relativeSplatPath: true }}>
            <GlobalModal
                open={isModalOpen}
                onClose={closeModal}
                title={modalTitle}
            >
                {modalContent}
            </GlobalModal>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
