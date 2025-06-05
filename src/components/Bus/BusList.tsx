import { useEffect, useState } from 'react';
import { Table, Skeleton } from 'antd';
import { supabase } from '../../services/supabaseClient';
import type { Buses } from '../../types';

const BusList = ({
    setActiveWidget,
}: {
    setActiveWidget: (key: number) => void;
}) => {
    const [buses, setBuses] = useState<Buses[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedBusId, setSelectedBusId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data: busData } = await supabase.from('buses').select('*');
            setBuses(busData || []);

            setLoading(false);
        };

        fetchData();
    }, []);

    const busColumns = [
        {
            title: 'Route Number',
            dataIndex: 'route_number',
            key: 'route_number',
        },
        {
            title: 'Bus Number',
            dataIndex: 'bus_number',
            key: 'bus_number',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    useEffect(() => {
        if (selectedBusId) {
            setActiveWidget(5);
            console.log(`Selected bus ID: ${selectedBusId}`);
        }
    }, [selectedBusId, setActiveWidget]);

    return (
        <div>
            {loading ? (
                <Skeleton active paragraph={{ rows: 4 }} />
            ) : (
                <Table
                    dataSource={buses}
                    columns={busColumns}
                    pagination={false}
                    rowKey="bus_id"
                    size="small"
                    onRow={(record) => ({
                        onClick: () => {
                            setSelectedBusId(record.bus_id);
                            console.log(`Bus clicked: ${record.bus_id}`);
                        },
                    })}
                />
            )}
        </div>
    );
};

export default BusList;
