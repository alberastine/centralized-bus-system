export interface Buses {
    status: 'active' | 'inactive' | 'under maintenance';
    bus_id: string;
    bus_number: string;
    route_number: string;
    plate_number: string;
    assigned_driver?: string;
    assigned_conductor?: string;
}

export interface BusPermitStatus {
    bus_id: string;
    has_cpc: boolean;
    has_garage_accreditation: boolean;
    has_conductor_permit: boolean;
    has_mvr: boolean;
    has_emission_test: boolean;
    has_roadworthiness: boolean;
    has_ctpl: boolean;
    has_ppai: boolean;
    has_mayors_permit: boolean;
    has_barangay_clearance: boolean;
}

export interface Drivers {
    driver_id: string;
    full_name: string;
    license_no: string;
    status: boolean;
}

export interface Conductors {
    conductor_id: string;
    full_name: string;
    license_no: string;
    status: boolean;
}

export interface TripHistory {
    trip_id: string;
    bus_id: string;
    driver_id: string;
    conductor_id: string;
    trips: number;
    trip_date: string;
    remitted: number;
}

export interface UserInfo {
    full_name?: string;
    email?: string;
    username?: string;
    password?: string;
    role?: 'admin' | 'driver' | 'conductor';
}
