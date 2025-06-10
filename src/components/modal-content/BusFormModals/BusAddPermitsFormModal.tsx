import { Button, Checkbox, Divider, Form } from 'antd';
import { useEffect, useState } from 'react';
import { useModalStore } from '../../../store/useModalStore';
import { useBusStore } from '../../../store/useBusStore';
import type { BusPermitStatus } from '../../../types';

const mapPermitStatusToFormValues = (permit: BusPermitStatus) => {
    return {
        ltfrb_permits: [
            permit.has_cpc && 'cpc',
            permit.has_garage_accreditation && 'garage_accreditation',
            permit.has_conductor_permit && 'conductor_permit',
        ].filter(Boolean),
        lto_permits: [
            permit.has_mvr && 'mvr',
            permit.has_emission_test && 'emission_test',
            permit.has_roadworthiness && 'roadworthiness',
        ].filter(Boolean),
        insurance_permits: [
            permit.has_ctpl && 'ctpl',
            permit.has_ppai && 'ppai',
        ].filter(Boolean),
        lgu_permits: [
            permit.has_mayors_permit && 'mayors_permit',
            permit.has_barangay_clearance && 'barangay_clearance',
        ].filter(Boolean),
    };
};

const BusAddPermitsFormModal = ({ busId }: { busId: string }) => {
    const [form] = Form.useForm();
    const { closeModal } = useModalStore();
    const { busPermitStatus, fetchBusDataById } = useBusStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPermitStatus = async () => {
            setLoading(true);
            await fetchBusDataById(busId);
            setLoading(false);
        };
        loadPermitStatus();
    }, [busId, fetchBusDataById]);

    useEffect(() => {
        const permitData = busPermitStatus.find(
            (p) => Number(p.bus_id) === Number(busId)
        );

        if (permitData) {
            const mappedValues = mapPermitStatusToFormValues(permitData);
            form.setFieldsValue(mappedValues);
        } else {
            console.warn('No permit data found for busId', busId);
        }
    }, [busPermitStatus, busId, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            console.log('Form Submitted Values:', values);
            form.resetFields();
            closeModal();
        } catch (err) {
            console.log('Validation failed:', err);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        closeModal();
    };

    return (
        <Form
            form={form}
            layout="vertical"
            style={{ overflow: 'auto', maxHeight: '50vh' }}
        >
            <Divider orientation="left">LTFRB Requirements</Divider>
            <Form.Item name="ltfrb_permits">
                <Checkbox.Group
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Checkbox value="cpc">
                        Certificate of Public Convenience (CPC)
                    </Checkbox>
                    <Checkbox value="garage_accreditation">
                        Garage Accreditation Certificate
                    </Checkbox>
                    <Checkbox value="conductor_permit">
                        Conductor's Permit
                    </Checkbox>
                </Checkbox.Group>
            </Form.Item>

            <Divider orientation="left">LTO Requirements</Divider>
            <Form.Item name="lto_permits">
                <Checkbox.Group
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Checkbox value="mvr">
                        Motor Vehicle Registration (MVR)
                    </Checkbox>
                    <Checkbox value="emission_test">
                        Emission Test Certificate
                    </Checkbox>
                    <Checkbox value="roadworthiness">
                        Roadworthiness Inspection Certificate (MVIS)
                    </Checkbox>
                </Checkbox.Group>
            </Form.Item>

            <Divider orientation="left">Insurance Requirements</Divider>
            <Form.Item name="insurance_permits">
                <Checkbox.Group
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Checkbox value="ctpl">
                        Compulsory Third-Party Liability (CTPL)
                    </Checkbox>
                    <Checkbox value="ppai">
                        Passenger Personal Accident Insurance (PPAI)
                    </Checkbox>
                </Checkbox.Group>
            </Form.Item>

            <Divider orientation="left">Local Government Requirements</Divider>
            <Form.Item name="lgu_permits">
                <Checkbox.Group
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Checkbox value="mayors_permit">
                        Mayor’s Permit / Business Permit
                    </Checkbox>
                    <Checkbox value="barangay_clearance">
                        Barangay Clearance
                    </Checkbox>
                </Checkbox.Group>
            </Form.Item>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 8,
                    marginTop: 16,
                }}
            >
                <Button className="custom-btn" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button
                    className="custom-btn"
                    type="primary"
                    onClick={handleSubmit}
                    loading={loading}
                >
                    Submit
                </Button>
            </div>
        </Form>
    );
};

export default BusAddPermitsFormModal;
