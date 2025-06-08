import { create } from 'zustand';
import { supabase } from '../services/supabaseClient';
import type { Drivers, TripHistory } from '../types';

interface DriverState {
    drivers: Drivers[];
    tripHistory: TripHistory[];
    loading: boolean;
    fetchDriverDataById: (driverId: string) => Promise<void>;
    fetchDriverData: () => Promise<void>;
}

export const useDriverStore = create<DriverState>((set) => ({
    drivers: [],
    tripHistory: [],
    loading: false,

    fetchDriverDataById: async (driverId: string) => {
        set({ loading: true });

        const [{ data: drivers }, { data: tripHistory }] = await Promise.all([
            supabase.from('drivers').select('*').eq('driver_id', driverId),
            supabase.from('trip_history').select('*').eq('driver_id', driverId),
        ]);

        set({
            drivers: drivers || [],
            tripHistory: tripHistory || [],
            loading: false,
        });
    },

    fetchDriverData: async () => {
        set({ loading: true });

        const [{ data: drivers }, { data: trips }] = await Promise.all([
            supabase.from('drivers').select('*'),
            supabase.from('trip_history').select('*'),
        ]);

        set({
            drivers: drivers || [],
            tripHistory: trips || [],
            loading: false,
        });
    },
}));
