import { useEffect } from 'react';
import { FaBus, FaMapMarkerAlt, FaHistory, FaEdit } from 'react-icons/fa';
import { FaRegTrashCan } from 'react-icons/fa6';
import { Tabs, Card, Badge, Input, Button, Modal, message, Spin } from 'antd';
import type { Buses } from '../../../types';
import { useBusStore } from '../../../store/useBusStore';
import { useModalStore } from '../../../store/useModalStore';
import { useDriverStore } from '../../../store/useDriverStore';
import { useConductorStore } from '../../../store/useConductorStore';

const { TextArea } = Input;

const BusViewDetailsModal = ({ busId }: { busId: string }) => {
    const { drivers, fetchDriverData } = useDriverStore();
    const { conductors, fetchConductorData } = useConductorStore();
    const {
        selectedBus,
        isLoadingBus,
        busAssignments,
        fetchBusDataById,
        fetchBusAssignmentsByBusId,
        deleteBusById,
    } = useBusStore();

    const { closeModal } = useModalStore();

    useEffect(() => {
        if (busId) {
            fetchBusDataById(busId);
            fetchBusAssignmentsByBusId(busId);
        }

        if (!drivers.length) {
            fetchDriverData();
        }

        if (!conductors.length) {
            fetchConductorData();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        busId,
        fetchBusDataById,
        fetchBusAssignmentsByBusId,
        fetchDriverData,
        fetchConductorData,
    ]);

    if (isLoadingBus) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <Spin size="large" />
                <p style={{ marginTop: '1rem' }}>Fetching bus details...</p>
            </div>
        );
    }

    if (!selectedBus) {
        return <p style={{ textAlign: 'center' }}>No bus details found.</p>;
    }

    const assignment = busAssignments.find(
        (a) => String(a.bus_id) === String(selectedBus?.bus_id)
    );
    const driver = drivers.find(
        (d) => String(d.driver_id) === String(assignment?.driver_id)
    );
    const conductor = conductors.find(
        (c) => String(c.conductor_id) === String(assignment?.conductor_id)
    );

    const handleDeleteBus = (bus: Buses) => {
        Modal.confirm({
            title: 'Delete Bus',
            content: `Are you sure you want to delete bus ${bus.bus_number}?`,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            cancelButtonProps: { type: 'primary' },
            async onOk() {
                try {
                    await deleteBusById(bus.bus_id);
                    message.success(
                        `Bus ${bus.bus_number} deleted successfully.`
                    );
                    closeModal();
                } catch (error) {
                    console.error('Error deleting bus:', error);
                    message.error('Failed to delete bus. Please try again.');
                }
            },
        });
    };

    const tabItems = [
        {
            key: 'overview',
            label: 'Overview',
            children: (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '16px',
                    }}
                >
                    <div>
                        <label
                            style={{
                                fontSize: '12px',
                                fontWeight: 500,
                                color: '#888',
                            }}
                        >
                            Bus Model
                        </label>
                        <p style={{ fontSize: '14px' }}>Mercedes Sprinter</p>
                    </div>
                    <div>
                        <label
                            style={{
                                fontSize: '12px',
                                fontWeight: 500,
                                color: '#888',
                            }}
                        >
                            Capacity
                        </label>
                        <p style={{ fontSize: '14px' }}>45 passengers</p>
                    </div>
                    <div>
                        <label
                            style={{
                                fontSize: '12px',
                                fontWeight: 500,
                                color: '#888',
                            }}
                        >
                            Status
                        </label>
                        <div>
                            <Badge
                                status="success"
                                text={selectedBus.status || 'Active'}
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            style={{
                                fontSize: '12px',
                                fontWeight: 500,
                                color: '#888',
                            }}
                        >
                            Current Route
                        </label>
                        <p
                            style={{
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                            }}
                        >
                            <FaMapMarkerAlt style={{ color: 'red' }} /> Downtown
                            - Airport
                        </p>
                    </div>
                    <div>
                        <label
                            style={{
                                fontSize: '12px',
                                fontWeight: 500,
                                color: '#888',
                            }}
                        >
                            Assigned Driver
                        </label>
                        <p style={{ fontSize: '14px' }}>
                            {driver?.full_name || 'No driver assigned'}
                        </p>
                    </div>
                    <div>
                        <label
                            style={{
                                fontSize: '12px',
                                fontWeight: 500,
                                color: '#888',
                            }}
                        >
                            Assigned Conductor
                        </label>
                        <p style={{ fontSize: '14px' }}>
                            {conductor?.full_name || 'No conductor assigned'}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            key: 'performance',
            label: 'Performance',
            children: (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: '16px',
                    }}
                >
                    <Card
                        styles={{ body: { padding: 12 } }}
                        style={{ transition: 'box-shadow 0.2s' }}
                    >
                        <p style={{ fontSize: '12px', marginBottom: '8px' }}>
                            Total Trips
                        </p>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>
                            250
                        </h2>
                    </Card>
                    <Card
                        styles={{ body: { padding: 12 } }}
                        style={{ transition: 'box-shadow 0.2s' }}
                    >
                        <p style={{ fontSize: '12px', marginBottom: '8px' }}>
                            Total Income
                        </p>
                        <h2
                            style={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                                color: 'green',
                            }}
                        >
                            ₱500,000
                        </h2>
                    </Card>
                    <Card
                        styles={{ body: { padding: 12 } }}
                        style={{ transition: 'box-shadow 0.2s' }}
                    >
                        <p style={{ fontSize: '12px', marginBottom: '8px' }}>
                            Avg. per Trip
                        </p>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>
                            ₱2000
                        </h2>
                    </Card>
                </div>
            ),
        },
        {
            key: 'maintenance',
            label: 'Maintenance',
            children: (
                <div>
                    <div style={{ marginBottom: '16px' }}>
                        <label
                            style={{
                                fontSize: '12px',
                                fontWeight: 500,
                                color: '#888',
                            }}
                        >
                            Last Maintenance
                        </label>
                        <p
                            style={{
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                            }}
                        >
                            <FaHistory /> January 15, 2025
                        </p>
                    </div>
                    <div>
                        <label
                            style={{
                                fontSize: '12px',
                                fontWeight: 500,
                                color: '#888',
                            }}
                        >
                            Maintenance Notes
                        </label>
                        <TextArea
                            placeholder="Add maintenance notes or schedule upcoming repairs..."
                            rows={4}
                        />
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div key={selectedBus.bus_id}>
                <h3
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '0',
                    }}
                >
                    <FaBus style={{ fontSize: '20px', color: '#1677ff' }} />{' '}
                    {selectedBus.route_number} - {selectedBus.plate_number}
                </h3>
                <p
                    style={{
                        marginBottom: '16px',
                        marginTop: '0',
                        color: '#666',
                    }}
                >
                    Detailed information and performance metrics
                </p>
            </div>

            <Tabs defaultActiveKey="overview" items={tabItems} />

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 8,
                    marginTop: 16,
                }}
            >
                <Button
                    color="danger"
                    variant="dashed"
                    icon={<FaRegTrashCan size={16} />}
                    onClick={() => handleDeleteBus(selectedBus)}
                >
                    Delete Bus
                </Button>
                <Button type="primary" icon={<FaEdit size={16} />}>
                    Edit Bus Details
                </Button>
            </div>
        </div>
    );
};

export default BusViewDetailsModal;
