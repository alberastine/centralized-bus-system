export interface Buses {
    status: boolean;
    bus_id: string;
    bus_number: string;
    route_number: string;
    assigned_driver?: string;
    assigned_conductor?: string;
}

export interface Drivers {
    id: string;
    full_name: string;
    license_no: string;
    status: boolean;
}

export interface Conductors {
    id: string;
    full_name: string;
    license_no: string;
    status: boolean;
}
