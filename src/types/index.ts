export interface Bus {
    bus_id: string;
    bus_number: string;
    assigned_driver?: string;
    assigned_conductor?: string;
}

export interface Driver {
    id: string;
    name: string;
    license_no: string;
    active: boolean;
}

export interface Conductor {
    id: string;
    name: string;
    license_no: string;
    active: boolean;
}