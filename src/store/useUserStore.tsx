import { create } from 'zustand';
import { supabase } from '../services/supabaseClient';
import type { UserInfo } from '../types';

interface UserState {
    userInfo: UserInfo | null;
    loading: boolean; // only for first mount
    refreshing: boolean; //  session refresh
    fetchUser: (isRefresh?: boolean) => Promise<void>;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    userInfo: null,
    loading: false,
    refreshing: false,

    fetchUser: async (isRefresh = false) => {
        set({ [isRefresh ? 'refreshing' : 'loading']: true });

        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) return;

            const { data: admin } = await supabase
                .from('admins')
                .select('full_name, email')
                .eq('email', user.email)
                .single();

            set({
                userInfo: {
                    full_name: admin?.full_name ?? undefined,
                    email: admin?.email ?? user.email ?? undefined,
                },
            });
        } catch (err) {
            console.error('Error fetching user:', err);
        } finally {
            set({ [isRefresh ? 'refreshing' : 'loading']: false });
        }
    },

    clearUser: () => set({ userInfo: null }),
}));
