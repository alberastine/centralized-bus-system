import BusList from '../../components/Bus/BusList';
import AddBus from '../../components/Bus/AddBus';
import { useState } from 'react';
import BusSummaryCards from '../../components/Bus/BusSummaryCards';
import { Button, Dropdown, Input, Space, type MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import AddRoute from '../../components/Bus/AddRoute';

const { Search } = Input;

const items: MenuProps['items'] = [
    {
        key: '1',
        label: 'Avtive',
    },
    {
        key: '2',
        label: 'In Repair',
    },
    {
        key: '3',
        label: 'On Trip',
    },
];

const BusesPage = ({
    setActiveWidget,
    setSelectedBusId,
}: {
    setActiveWidget: (key: number) => void;
    setSelectedBusId: (id: string) => void;
}) => {
    const [busCount, setBusCount] = useState(0);

    return (
        <div className="bus-page-container" style={{ minHeight: '70vh' }}>
            <BusSummaryCards busCount={busCount} />
            <div
                style={{
                    padding: '1.5rem',
                    background: '#fff',
                    marginTop: 16,
                    borderRadius: 8,
                    marginBottom: '1rem',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.5rem',
                    }}
                >
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Search
                            placeholder="input search text"
                            allowClear
                            // onSearch={onSearch}
                            style={{ width: 300 }}
                        />
                        <Dropdown
                            menu={{
                                items,
                                selectable: true,
                                defaultSelectedKeys: ['3'],
                            }}
                        >
                            <Button>
                                <Space>
                                    All Statuss
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>

                        <AddRoute />
                    </div>
                    <AddBus />
                </div>
                <BusList
                    setActiveWidget={setActiveWidget}
                    setSelectedBusId={setSelectedBusId}
                    onBusCountChange={setBusCount}
                />
            </div>
        </div>
    );
};

export default BusesPage;
