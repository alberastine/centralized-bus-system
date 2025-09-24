import { useEffect, useState } from 'react';

import {
    Table,
    Skeleton,
    type TableProps,
    Input,
    Space,
    Button,
    Tag,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { useBusStore } from '../../store/useBusStore';
import type { Buses } from '../../types';


const BusList = ({
    setActiveWidget,
    setSelectedBusId,
}: {
    setActiveWidget: (key: number) => void;
    setSelectedBusId: (id: string) => void;
}) => {
    const { busDetails, fetchBusData, loading } =
        useBusStore();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    useEffect(() => {
        fetchBusData();
    }, [fetchBusData]);

    const handleSearch = (
        selectedKeys: string[],
        confirm: () => void,
        dataIndex: keyof Buses
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters?: () => void) => {
        clearFilters?.();
        setSearchText('');
    };

    const busColumns: TableProps<Buses>['columns'] = [
        {
            title: 'Route Number',
            dataIndex: 'route_number',
            key: 'route_number',
            sorter: (a, b) => a.route_number.localeCompare(b.route_number),
        },
        {
            title: 'Bus Number',
            dataIndex: 'bus_number',
            key: 'bus_number',
            sorter: (a, b) => a.bus_number.localeCompare(b.bus_number),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Active', value: 'active' },
                { text: 'Inactive', value: 'inactive' },
                { text: 'Under Maintenance', value: 'under maintenance' },
            ],
            render: (status: Buses['status']) => {
                let color: string;
                switch (status) {
                    case 'active':
                        color = 'green';
                        break;
                    case 'inactive':
                        color = 'volcano';
                        break;
                    case 'under maintenance':
                        color = 'geekblue';
                        break;
                    default:
                        color = 'default';
                }
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Plate Number',
            dataIndex: 'plate_number',
            key: 'plate_number',
            sorter: (a, b) => a.plate_number.localeCompare(b.plate_number),
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Search Plate Number"
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSelectedKeys(value ? [value] : []);
                            if (!value) {
                                handleReset(clearFilters);
                            }
                        }}
                        onPressEnter={() =>
                            handleSearch(
                                selectedKeys as string[],
                                confirm,
                                'plate_number'
                            )
                        }
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() =>
                                handleSearch(
                                    selectedKeys as string[],
                                    confirm,
                                    'plate_number'
                                )
                            }
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => handleReset(clearFilters)}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            onFilter: (value, record) =>
                record.plate_number
                    .toLowerCase()
                    .includes((value as string).toLowerCase()),
            filteredValue:
                searchText && searchedColumn === 'plate_number'
                    ? [searchText]
                    : null,
        },
    ];


    return (
        <div>
            {loading ? (
                <Skeleton active paragraph={{ rows: 4 }} />
            ) : (
                <>
                    {console.log('Bus details in table:', busDetails)}
                    <Table
                        dataSource={busDetails}
                        columns={busColumns}
                        scroll={{ y: 55 * 9 }}
                        pagination={false}
                        rowKey="bus_id"
                        size="small"
                        onRow={(record) => ({
                            onClick: () => {
                                setActiveWidget(4);
                                setSelectedBusId(record.bus_id);
                            },
                        })}
                    />
                </>
            )}
        </div>
    );
};

export default BusList;
