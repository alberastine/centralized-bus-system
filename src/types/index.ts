export interface Buses {
    status: boolean;
    bus_id: string;
    bus_number: string;
    route_number: string;
    plate_number: string;
    assigned_driver?: string;
    assigned_conductor?: string;
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
