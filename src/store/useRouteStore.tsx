import { create } from 'zustand';
import { supabase } from '../services/supabaseClient';
import type { Route } from '../types';

interface RouteState {
    routes: Route[];
    isLoadingRoutes: boolean;
    fetchRoutes: () => Promise<void>;
    addRoute: (route: Omit<Route, 'id'>) => Promise<void>;
    getRouteByNumber: (routeNumber: string) => Route | undefined;
}

export const useRouteStore = create<RouteState>((set, get) => ({
    routes: [],
    isLoadingRoutes: false,

    fetchRoutes: async () => {
        set({ isLoadingRoutes: true });

        const [{ data: routes }] = await Promise.all([
            supabase.from('routes').select('*'),
        ]);

        set({
            routes: routes || [],
            isLoadingRoutes: false,
        });
    },

    addRoute: async (route) => {
        const { data, error } = await supabase
            .from('routes')
            .insert([route])
            .select();
        if (error) {
            console.error('Failed to add route:', error);
            throw error;
        }
        if (data) {
            set((state) => ({ routes: [...state.routes, ...data] }));
        }
    },

    getRouteByNumber: (routeNumber) => {
        return get().routes.find(
            (r) => r.route_number.toLowerCase() === routeNumber.toLowerCase()
        );
    },
}));
