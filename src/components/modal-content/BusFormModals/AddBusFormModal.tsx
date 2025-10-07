import { Button, Form, Input } from 'antd';
import { useModalStore } from '../../../store/useModalStore';
import { useBusStore } from '../../../store/useBusStore';
import { useEffect } from 'react';

import '../../../styles/BusStyle.css';
import { useRouteStore } from '../../../store/useRouteStore';

const AddBusFormModal = () => {
    const [form] = Form.useForm();

    const { closeModal } = useModalStore();
    const { fetchNextBusNumber, nextBusNumber, addBus } = useBusStore();
    const { fetchRoutes, getRouteByNumber } = useRouteStore();

    useEffect(() => {
        const loadBusNumber = async () => {
            await fetchNextBusNumber();
        };
        loadBusNumber();
    }, [fetchNextBusNumber]);

    useEffect(() => {
        if (nextBusNumber) {
            form.setFieldsValue({ bus_number: nextBusNumber });
        }
    }, [nextBusNumber, form]);

    useEffect(() => {
        fetchRoutes();
    }, [fetchRoutes]);

    const handleRouteNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const routeNum = e.target.value;
        const matchedRoute = getRouteByNumber(routeNum);

        if (matchedRoute) {
            form.setFieldsValue({
                route_description: matchedRoute.route_description,
            });
        } else {
            form.setFieldsValue({ route_description: '' });
        }
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            const payload = {
                ...values,
                status: values.status || 'active',
            };
            await addBus(payload);
            form.resetFields();
            closeModal();
        } catch (err) {
            console.log('Validation failed:', err);
        }
    };

    const handleCancel = () => {
        const currentBusNumber = form.getFieldValue('bus_number');
        form.resetFields();
        form.setFieldValue('bus_number', currentBusNumber);
        closeModal();
    };

    return (
        <Form
            form={form}
            layout="vertical"
            style={{ overflow: 'auto', maxHeight: '90vh' }}
            requiredMark={false}
        >
            <Form.Item
                label={
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>
                        Bus Number
                    </span>
                }
                name="bus_number"
                rules={[
                    {
                        required: true,
                        message: 'Please input the bus number!',
                    },
                ]}
            >
                <Input
                    style={{
                        color: '#666',
                        fontWeight: '400',
                    }}
                    disabled
                />
            </Form.Item>

            <Form.Item
                label={
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>
                        Plate Number
                    </span>
                }
                name="plate_number"
                rules={[
                    {
                        required: true,
                        message: 'Please input the plate number!',
                    },
                ]}
            >
                <Input placeholder="ABC-123" />
            </Form.Item>

            <Form.Item
                label={
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>
                        Bus Model
                    </span>
                }
                name="bus_model"
                rules={[
                    {
                        required: true,
                        message: 'Please input the bus model!',
                    },
                ]}
            >
                <Input placeholder="Bus Model" />
            </Form.Item>

            <Form.Item
                label={
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>
                        Route Number
                    </span>
                }
                name="route_number"
                rules={[
                    {
                        required: true,
                        message: 'Please input the route number!',
                    },
                ]}
            >
                <Input
                    placeholder="17C, 17D, 17B"
                    onChange={handleRouteNumberChange}
                />
            </Form.Item>

            <Form.Item
                label={
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>
                        Route Description
                    </span>
                }
                name="route_description"
            >
                <Input
                    placeholder="Auto-filled based on route number"
                    readOnly
                />
            </Form.Item>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 8,
                    marginTop: 16,
                }}
            >
                <Button
                    className="custom-btn"
                    color="danger"
                    variant="dashed"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button
                    className="custom-btn"
                    type="primary"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </div>
        </Form>
    );
};

export default AddBusFormModal;
