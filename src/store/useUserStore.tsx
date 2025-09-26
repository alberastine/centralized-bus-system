import { create } from 'zustand';
import { supabase } from '../services/supabaseClient';
import type { UserInfo } from '../types';

interface UserState {
    userInfo: UserInfo | null;
    loading: boolean;
    fetchUser: () => Promise<void>;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    userInfo: null,
    loading: false,

    fetchUser: async () => {
        set({ loading: true });

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (user) {
            const { data: admin, error } = await supabase
                .from('admins')
                .select('full_name, email')
                .eq('email', user.email)
                .single();

            if (error) {
                console.error('Error fetching admin data:', error);
            }

            set({
                userInfo: {
                    full_name: admin?.full_name ?? undefined,
                    email: admin?.email ?? user.email ?? undefined,
                },
                loading: false,
            });
        } else {
            set({ loading: false });
        }
    },

    clearUser: () => set({ userInfo: null }),
}));
