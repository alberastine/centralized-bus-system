import { Modal } from 'antd';

type GlobalModalProps = {
    open: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
};

const GlobalModal = ({
    open,
    onClose,
    title,
    subtitle,
    children,
    footer = null,
}: GlobalModalProps) => {
    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={footer}
            centered
            title={
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {title && (
                        <h3
                            style={{
                                marginBottom: '0',
                                fontWeight: 600,
                            }}
                        >
                            {title}
                        </h3>
                    )}
                    {subtitle && (
                        <p
                            style={{
                                marginBottom: '16px',
                                marginTop: '0',
                                color: '#666',
                                fontWeight: 400,
                                fontSize: '14px',
                            }}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>
            }
        >
            {children}
        </Modal>
    );
};

export default GlobalModal;
