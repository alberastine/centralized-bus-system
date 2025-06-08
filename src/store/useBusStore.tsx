import { create } from 'zustand';
import { supabase } from '../services/supabaseClient';
import type { Buses, TripHistory } from '../types';

interface BusState {
    busDetails: Buses[];
    tripHistory: TripHistory[];
    loading: boolean;
    fetchBusData: () => Promise<void>;
    fetchBusDataById: (busId: string) => Promise<void>;
}

export const useBusStore = create<BusState>((set) => ({
    busDetails: [],
    tripHistory: [],
    loading: false,

    fetchBusData: async () => {
        set({ loading: true });

        const [{ data: buses }, { data: trips }] = await Promise.all([
            supabase.from('buses').select('*'),
            supabase.from('trip_history').select('*'),
        ]);

        set({
            busDetails: buses || [],
            tripHistory: trips || [],
            loading: false,
        });
    },

    fetchBusDataById: async (busId: string) => {
        set({ loading: true });

        const [{ data: busDetails }, { data: tripHistory }] = await Promise.all(
            [
                supabase.from('buses').select('*').eq('bus_id', busId),
                supabase.from('trip_history').select('*').eq('bus_id', busId),
            ]
        );

        set({
            busDetails: busDetails || [],
            tripHistory: tripHistory || [],
            loading: false,
        });
    },
}));
