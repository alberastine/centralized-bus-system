import { Typography } from 'antd';
import BusList from '../../components/Bus/BusList';

const { Title } = Typography;
const BusesPage = ({
    setActiveWidget,
}: {
    setActiveWidget: (key: number) => void;
}) => {
    return (
        <div>
            <Title level={4} style={{ margin: '0 0 1rem 0' }}>
                Buses
            </Title>
            <BusList setActiveWidget={setActiveWidget} />
        </div>
    );
};

export default BusesPage;
