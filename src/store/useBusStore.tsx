import { create } from 'zustand';
import { supabase } from '../services/supabaseClient';
import type { Buses, BusPermitStatus, TripHistory } from '../types';

interface BusState {
    busDetails: Buses[];
    tripHistory: TripHistory[];
    busPermitStatus: BusPermitStatus[];
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
    busPermitStatus: [],
    loading: false,
    nextBusNumber: '',

    fetchBusData: async () => {
        set({ loading: true });

        const [{ data: buses }, { data: trips }, { data: permits }] =
            await Promise.all([
                supabase.from('buses').select('*'),
                supabase.from('trip_history').select('*'),
                supabase.from('bus_permit_status').select('*'),
            ]);

        set({
            busDetails: buses || [],
            tripHistory: trips || [],
            busPermitStatus: permits || [],
            loading: false,
        });
    },

    fetchBusDataById: async (busId: string) => {
        set({ loading: true });

        const [
            { data: busDetails },
            { data: tripHistory },
            { data: busPermitStatus },
        ] = await Promise.all([
            supabase.from('buses').select('*').eq('bus_id', busId),
            supabase.from('trip_history').select('*').eq('bus_id', busId),
            supabase.from('bus_permit_status').select('*').eq('bus_id', busId),
        ]);

        set({
            busDetails: busDetails || [],
            tripHistory: tripHistory || [],
            busPermitStatus: busPermitStatus || [],
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
        const { data: busData, error: busError } = await supabase
            .from('buses')
            .insert([bus])
            .select();

        if (busError) {
            console.error('Failed to add bus:', busError);
            throw busError;
        }

        const newBus = busData?.[0];
        if (!newBus) return;

        const defaultPermit: BusPermitStatus = {
            bus_id: newBus.bus_id,
            has_cpc: false,
            has_garage_accreditation: false,
            has_conductor_permit: false,
            has_mvr: false,
            has_emission_test: false,
            has_roadworthiness: false,
            has_ctpl: false,
            has_ppai: false,
            has_mayors_permit: false,
            has_barangay_clearance: false,
        };

        const { error: permitError } = await supabase
            .from('bus_permit_status')
            .insert([defaultPermit]);

        if (permitError) {
            console.error('Failed to add bus permit status:', permitError);
            throw permitError;
        }

        set((state) => ({
            busDetails: [...state.busDetails, newBus],
            busPermitStatus: [...state.busPermitStatus, defaultPermit],
        }));

        get().fetchBusData();
        get().fetchNextBusNumber();
    },
}));
