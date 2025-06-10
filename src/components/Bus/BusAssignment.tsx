import { Button } from 'antd';
import { useModalStore } from '../../store/useModalStore';
import BusAssignFromModal from '../modal-content/BusFormModals/BusAssignFromModal';

import '../../styles/BusStyle.css';

const BusAssignment = () => {
    const { openModal } = useModalStore();

    const handleClick = () => {
        openModal(<BusAssignFromModal />, 'Assign Bus');
    };

    return (
        <Button type="primary" className="custom-btn" onClick={handleClick}>
            Assign Bus
        </Button>
    );
};

export default BusAssignment;
