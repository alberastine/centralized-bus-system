import { Button } from 'antd';
import { useModalStore } from '../../store/useModalStore';
import BusViewDetailsModal from '../modal-content/BusFormModals/BusViewDetailsModal';

import { FaEye } from 'react-icons/fa';

const BusViewDetails = ({
    busId,
}: {
    busId: string;
}) => {
    const { openModal } = useModalStore();
    const handleClick = () => {
        openModal(<BusViewDetailsModal busId={busId}/>);
    };
    return (
        <Button icon={<FaEye />} type="primary" onClick={handleClick}>
            View
        </Button>
    );
};

export default BusViewDetails;
