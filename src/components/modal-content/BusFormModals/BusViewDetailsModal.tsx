import { useBusStore } from '../../../store/useBusStore';
import { useEffect } from 'react';

import { FaBus, FaMapMarkerAlt, FaHistory, FaEdit } from 'react-icons/fa';
import { FaRegTrashCan } from 'react-icons/fa6';
import {
    Tabs,
    Card,
    Badge,
    Input,
    Button,
    Tooltip,
    Modal,
    message,
    Spin,
} from 'antd';
import type { Buses } from '../../../types';
import { useModalStore } from '../../../store/useModalStore';

const { TabPane } = Tabs;
const { TextArea } = Input;

const BusViewDetailsModal = ({ busId }: { busId: string }) => {
    const { selectedBus, isLoadingBus, fetchBusDataById, deleteBusById } =
        useBusStore();
    const { closeModal } = useModalStore();

    useEffect(() => {
        if (busId) fetchBusDataById(busId);
    }, [busId, fetchBusDataById]);

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

    const handleDeleteBus = (bus: Buses) => {
        Modal.confirm({
            title: 'Delete Bus',
            content: `Are you sure you want to delete bus ${bus.bus_number}?`,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
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

            <Tabs defaultActiveKey="overview">
                {/* Overview Tab */}
                <TabPane tab="Overview" key="overview">
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
                            <p style={{ fontSize: '14px' }}>
                                Mercedes Sprinter
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
                                <FaMapMarkerAlt style={{ color: 'red' }} />{' '}
                                Downtown - Airport
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
                            <p style={{ fontSize: '14px' }}>John Doe</p>
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
                            <p style={{ fontSize: '14px' }}>Jane Smith</p>
                        </div>
                    </div>
                </TabPane>

                {/* Performance Tab */}
                <TabPane tab="Performance" key="performance">
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr',
                            gap: '16px',
                        }}
                    >
                        <Card>
                            <p
                                style={{
                                    fontSize: '12px',
                                    marginBottom: '8px',
                                }}
                            >
                                Total Trips
                            </p>
                            <h2
                                style={{ fontSize: '24px', fontWeight: 'bold' }}
                            >
                                250
                            </h2>
                        </Card>
                        <Card>
                            <p
                                style={{
                                    fontSize: '12px',
                                    marginBottom: '8px',
                                }}
                            >
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
                        <Card>
                            <p
                                style={{
                                    fontSize: '12px',
                                    marginBottom: '8px',
                                }}
                            >
                                Avg. per Trip
                            </p>
                            <h2
                                style={{ fontSize: '24px', fontWeight: 'bold' }}
                            >
                                ₱2000
                            </h2>
                        </Card>
                    </div>
                </TabPane>

                {/* Maintenance Tab */}
                <TabPane tab="Maintenance" key="maintenance">
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
                </TabPane>
            </Tabs>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 8,
                    marginTop: 16,
                }}
            >
                <Tooltip title="Delete Bus" color="red">
                    <Button
                        color="danger"
                        variant="dashed"
                        icon={<FaRegTrashCan size={16} />}
                        onClick={() => handleDeleteBus(selectedBus)}
                    >
                        Delete
                    </Button>
                </Tooltip>
                <Button type="primary" icon={<FaEdit size={16} />}>
                    Edit
                </Button>
            </div>
        </div>
    );
};

export default BusViewDetailsModal;
