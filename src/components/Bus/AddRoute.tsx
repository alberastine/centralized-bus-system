import { Button } from 'antd';
import { useModalStore } from '../../store/useModalStore';
import AddRouteFormModal from '../modal-content/RoutFormModal/AddRouteFormModal';

import { IoMdAdd } from 'react-icons/io';

const AddRoute = () => {
    const { openModal } = useModalStore();

    const handleClick = async () => {
        openModal(
            <AddRouteFormModal />,
            'Add New Route',
            'Add a new route to your fleet management system.'
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
            Add Route
        </Button>
    );
};

export default AddRoute;
