import { Typography } from 'antd';

import ConductorList from '../../components/Conductor/ConductorList';

const { Title } = Typography;

const ConductorsPage = () => {
    return (
        <div>
            <Title level={4} style={{ margin: '0 0 1rem 0' }}>
                Conductors
            </Title>
            <ConductorList />
        </div>
    );
};

export default ConductorsPage;
