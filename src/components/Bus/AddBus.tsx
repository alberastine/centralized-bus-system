import { Button } from 'antd';
import { useModalStore } from '../../store/useModalStore';
import AddBusFormModal from '../modal-content/BusFormModals/AddBusFormModal';

import '../../styles/BusStyle.css';

import { IoMdAdd } from 'react-icons/io';

const AddBus = () => {
    const { openModal } = useModalStore();

    const handleClick = () => {
        openModal(
            <AddBusFormModal />,
            'Add New Bus',
            'Add a new bus to your fleet management system.'
        );
    };

    return (
        <Button
            type="primary"
            className="custom-btn"
            onClick={handleClick}
            icon={<IoMdAdd />}
            style={{ backgroundColor: '#001529' }}
        >
            Add Bus
        </Button>
    );
};

export default AddBus;
