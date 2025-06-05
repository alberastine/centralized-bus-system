export interface Buses {
    status: boolean;
    bus_id: string;
    bus_number: string;
    route_number: string;
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
    conducror_id: string;
    full_name: string;
    license_no: string;
    status: boolean;
}
