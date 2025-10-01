import { create } from 'zustand';
import { supabase } from '../services/supabaseClient';
import type { Buses, BusPermitStatus, TripHistory } from '../types';

interface BusState {
    busDetails: Buses[];
    tripHistory: TripHistory[];
    busPermitStatus: BusPermitStatus[];
    isLoadingBus: boolean;
    nextBusNumber: string;
    selectedBus: Buses | null;
    fetchBusData: () => Promise<void>;
    fetchBusDataById: (busId: string) => Promise<void>;
    fetchNextBusNumber: () => Promise<void>;
    addBus: (bus: Omit<Buses, 'bus_id'>) => Promise<void>;
    deleteBusById: (busId: string) => Promise<void>;
    updateBusById: (busId: string, updates: Partial<Buses>) => Promise<void>;
}

export const useBusStore = create<BusState>((set, get) => ({
    busDetails: [],
    tripHistory: [],
    busPermitStatus: [],
    isLoadingBus: false,
    nextBusNumber: '',
    selectedBus: null,

    fetchBusData: async () => {
        set({ isLoadingBus: true });

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
            isLoadingBus: false,
        });
    },

    fetchBusDataById: async (busId: string) => {
        set({ isLoadingBus: true });

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
            // busDetails: busDetails || [],
            tripHistory: tripHistory || [],
            busPermitStatus: busPermitStatus || [],
            isLoadingBus: false,
            selectedBus: busDetails?.[0] || null,
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

        // Automatically create a default permit status for the new bus
        // Might not be needed for now
        // This will be updated to boolean to varchar later on

        // const defaultPermit: BusPermitStatus = {
        //     bus_id: newBus.bus_id,
        //     has_cpc: false,
        //     has_garage_accreditation: false,
        //     has_conductor_permit: false,
        //     has_mvr: false,
        //     has_emission_test: false,
        //     has_roadworthiness: false,
        //     has_ctpl: false,
        //     has_ppai: false,
        //     has_mayors_permit: false,
        //     has_barangay_clearance: false,
        // };

        // const { error: permitError } = await supabase
        //     .from('bus_permit_status')
        //     .insert([defaultPermit]);

        // if (permitError) {
        //     console.error('Failed to add bus permit status:', permitError);
        //     throw permitError;
        // }

        set((state) => ({
            busDetails: [...state.busDetails, newBus],
            // busPermitStatus: [...state.busPermitStatus, defaultPermit],
        }));

        get().fetchBusData();
        get().fetchNextBusNumber();
    },
    deleteBusById: async (busId: string) => {
        // First delete dependent rows in bus_permit_status
        const { error: permitError } = await supabase
            .from('bus_permit_status')
            .delete()
            .eq('bus_id', busId);

        if (permitError) {
            console.error(
                'Failed to delete bus_permit_status records:',
                permitError
            );
            throw permitError;
        }

        // Then delete the bus itself
        const { error: busError } = await supabase
            .from('buses')
            .delete()
            .eq('bus_id', busId);

        if (busError) {
            console.error('Failed to delete bus:', busError);
            throw busError;
        }

        set((state) => ({
            busDetails: state.busDetails.filter((bus) => bus.bus_id !== busId),
            selectedBus:
                state.selectedBus?.bus_id === busId ? null : state.selectedBus,
        }));
    },
    updateBusById: async (busId: string, updates: Partial<Buses>) => {
        const { data: updatedBusData, error: busError } = await supabase
            .from('buses')
            .update(updates)
            .eq('bus_id', busId)
            .select();

        if (busError) {
            console.error('Failed to update bus:', busError);
            throw busError;
        }

        const updatedBus = updatedBusData?.[0];
        if (!updatedBus) return;

        set((state) => ({
            busDetails: state.busDetails.map((bus) =>
                bus.bus_id === busId ? updatedBus : bus
            ),
        }));
        if (get().selectedBus?.bus_id === busId) {
            set({ selectedBus: updatedBus });
        }
    },
}));
