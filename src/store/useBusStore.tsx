import { create } from 'zustand';
import { supabase } from '../services/supabaseClient';
import type { Buses, TripHistory } from '../types';

interface BusState {
    busDetails: Buses[];
    tripHistory: TripHistory[];
    loading: boolean;
    nextBusNumber: string;
    fetchBusData: () => Promise<void>;
    fetchBusDataById: (busId: string) => Promise<void>;
    fetchNextBusNumber: () => Promise<void>;
    addBus: (bus: Omit<Buses, 'bus_id'>) => Promise<void>;
}

export const useBusStore = create<BusState>((set, get) => ({
    busDetails: [],
    tripHistory: [],
    loading: false,
    nextBusNumber: '',

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

    fetchNextBusNumber: async () => {
        const { data, error } = await supabase
            .from('buses')
            .select('bus_number')
            .order('bus_number', { ascending: false })
            .limit(1);

        if (error) {
            console.error('Failed to fetch latest bus number:', error);
            set({ nextBusNumber: '01' });
            return;
        }

        let next = '01';
        if (data && data.length > 0) {
            const lastBusNumber = data[0].bus_number;
            const lastNumber = parseInt(lastBusNumber, 10);
            const currentLength = lastBusNumber.length;
            const incremented = (lastNumber + 1)
                .toString()
                .padStart(currentLength, '0');
            next = incremented;
        }

        set({ nextBusNumber: next });
    },

    addBus: async (bus) => {
        const { data, error } = await supabase
            .from('buses')
            .insert([bus])
            .select();

        if (error) {
            console.error('Failed to add bus:', error);
            throw error;
        }

        set((state) => ({
            busDetails: [...state.busDetails, ...(data || [])],
        }));

        get().fetchBusData();
        get().fetchNextBusNumber();
    },
}));
