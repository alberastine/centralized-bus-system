import { useEffect, useMemo, useState } from 'react';
import { Table, type TableProps, Input, Space, Button, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { useBusStore } from '../../store/useBusStore';
import type { Buses } from '../../types';
import BusViewDetails from './BusViewDetails';

const BusList = ({
    // setActiveWidget,
    // setSelectedBusId,
    onBusCountChange,
}: {
    setActiveWidget: (key: number) => void;
    setSelectedBusId: (id: string) => void;
    onBusCountChange?: (count: number) => void;
}) => {
    const { busDetails = [], fetchBusData } = useBusStore();

    const [filteredInfo, setFilteredInfo] = useState<
        Record<string, React.Key[] | null>
    >({});
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState<string>('');

    useEffect(() => {
        fetchBusData();
    }, [fetchBusData]);

    useEffect(() => {
        if (onBusCountChange) {
            onBusCountChange(busDetails.length);
        }
    }, [busDetails, onBusCountChange]);

    const handleSearch = (
        selectedKeys: string[],
        confirm: () => void,
        dataIndex: keyof Buses
    ) => {
        confirm();
        setSearchText(selectedKeys[0] ?? '');
        setSearchedColumn(String(dataIndex));
        setFilteredInfo((prev) => ({
            ...prev,
            [String(dataIndex)]: selectedKeys[0] ? [selectedKeys[0]] : null,
        }));
    };

    const handleReset = (clearFilters?: () => void) => {
        clearFilters?.();
        setSearchText('');
        setFilteredInfo((prev) => ({ ...prev, plate_number: null }));
    };

    const handleTableChange: TableProps<Buses>['onChange'] = (
        _pagination,
        filters
    ) => {
        setFilteredInfo(filters as Record<string, React.Key[] | null>);
    };

    const filteredData = useMemo(() => {
        let data = Array.isArray(busDetails) ? busDetails.slice() : [];

        const statusFilter = filteredInfo.status as string[] | null;
        if (statusFilter && statusFilter.length > 0) {
            const normalized = statusFilter.map((s) =>
                String(s).toLowerCase().trim()
            );
            data = data.filter((rec) =>
                normalized.includes(
                    String(rec.status ?? '')
                        .toLowerCase()
                        .trim()
                )
            );
        }

        const plateFilter =
            (filteredInfo.plate_number as string[] | null) ?? null;
        if (plateFilter && plateFilter.length > 0) {
            const q = String(plateFilter[0]).toLowerCase().trim();
            data = data.filter((rec) =>
                String(rec.plate_number ?? '')
                    .toLowerCase()
                    .includes(q)
            );
        } else if (searchText && searchedColumn === 'plate_number') {
            const q = searchText.toLowerCase().trim();
            data = data.filter((rec) =>
                String(rec.plate_number ?? '')
                    .toLowerCase()
                    .includes(q)
            );
        }

        return data;
    }, [busDetails, filteredInfo, searchText, searchedColumn]);

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
            filteredValue: filteredInfo.status || null,
            onFilter: (value, record) =>
                String(record.status ?? '')
                    .toLowerCase()
                    .trim() === String(value).toLowerCase().trim(),
            render: (status: Buses['status']) => {
                const s = String(status ?? '')
                    .toLowerCase()
                    .trim();
                let color: string;
                if (s === 'active') color = 'green';
                else if (s === 'inactive') color = 'volcano';
                else if (s === 'under maintenance') color = 'geekblue';
                else color = 'default';
                return (
                    <Tag color={color}>
                        {String(status ?? '').toUpperCase()}
                    </Tag>
                );
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
                        value={selectedKeys?.[0] as string}
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
                            onClick={() => {
                                handleReset(clearFilters);
                                setFilteredInfo((prev) => ({
                                    ...prev,
                                    plate_number: null,
                                }));
                                confirm?.();
                            }}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            filteredValue:
                (filteredInfo.plate_number as React.Key[] | null) ??
                (searchText && searchedColumn === 'plate_number'
                    ? [searchText]
                    : null),
            onFilter: (value, record) =>
                String(record.plate_number ?? '')
                    .toLowerCase()
                    .includes(String(value).toLowerCase()),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_text, record) => (
                <Space size="middle">
                    <BusViewDetails busId={record.bus_id} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Table
                dataSource={filteredData}
                columns={busColumns}
                scroll={{ y: 55 * 9 }}
                pagination={false}
                rowKey="bus_id"
                size="small"
                //Desable this for now

                // onRow={(record) => ({
                //     onClick: () => {
                //         setActiveWidget(4);
                //         setSelectedBusId(record.bus_id);
                //     },
                //     style: { cursor: 'pointer' },
                // })}
                onChange={handleTableChange}
            />
        </div>
    );
};

export default BusList;
