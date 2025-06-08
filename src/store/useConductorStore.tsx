import { create } from 'zustand';
import { supabase } from '../services/supabaseClient';
import type { Conductors, TripHistory } from '../types';

interface ConductorState {
    conductors: Conductors[];
    tripHistory: TripHistory[];
    loading: boolean;
    fetchConductorDataById: (conductorId: string) => Promise<void>;
    fetchConductorData: () => Promise<void>;
}

export const useConductorStore = create<ConductorState>((set) => ({
    conductors: [],
    tripHistory: [],
    loading: false,

    fetchConductorDataById: async (conductorId: string) => {
        set({ loading: true });

        const [{ data: conductors }, { data: tripHistory }] = await Promise.all(
            [
                supabase
                    .from('conductors')
                    .select('*')
                    .eq('conductor_id', conductorId),
                supabase
                    .from('trip_history')
                    .select('*')
                    .eq('conductor_id', conductorId),
            ]
        );

        set({
            conductors: conductors || [],
            tripHistory: tripHistory || [],
            loading: false,
        });
    },

    fetchConductorData: async () => {
        set({ loading: true });

        const [{ data: conductors }, { data: tripHistory }] = await Promise.all(
            [
                supabase.from('conductors').select('*'),
                supabase.from('trip_history').select('*'),
            ]
        );

        set({
            conductors: conductors || [],
            tripHistory: tripHistory || [],
            loading: false,
        });
    },
}));
