import { useEffect, useState } from 'react';
import { Table, Skeleton } from 'antd';
import { supabase } from '../../services/supabaseClient';
import type { Conductors } from '../../types';

const ConductorList = () => {
    const [conductors, setConductors] = useState<Conductors[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data: conductorData } = await supabase
                .from('conductors')
                .select('*');
            setConductors(conductorData || []);
            setLoading(false);
        };

        fetchData();
    }, []);

    const conductorColumns = [
        {
            title: 'Name',
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];
    return (
        <div>
            {loading ? (
                <Skeleton active paragraph={{ rows: 4 }} />
            ) : (
                <Table
                    dataSource={conductors}
                    columns={conductorColumns}
                    pagination={false}
                    rowKey="conductor_id"
                    size="small"
                />
            )}
        </div>
    );
};

export default ConductorList;
