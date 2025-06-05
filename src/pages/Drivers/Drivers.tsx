import { Typography } from 'antd';

import DriverList from '../../components/Driver/DriverList';

const { Title } = Typography;

const DriversPage = () => {
    return (
        <div>
            <Title level={4} style={{ margin: '0 0 1rem 0' }}>
                Drivers
            </Title>
            <DriverList />
        </div>
    );
};

export default DriversPage;
