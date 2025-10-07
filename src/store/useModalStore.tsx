import { create } from 'zustand';

type ModalStore = {
    isModalOpen: boolean;
    modalContent: React.ReactNode;
    modalTitle: React.ReactNode;
    modalSubtitle?: React.ReactNode;
    modalOnClose?: () => void;
    openModal: (
        content: React.ReactNode,
        title?: React.ReactNode,
        subtitle?: React.ReactNode,
        onClose?: () => void
    ) => void;
    closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    modalContent: null,
    modalTitle: null,
    modalSubtitle: null,
    modalOnClose: undefined,
    openModal: (content, title = '', subtitle = '', onClose) =>
        set({
            isModalOpen: true,
            modalContent: content,
            modalTitle: title,
            modalSubtitle: subtitle,
            modalOnClose: onClose,
        }),
    closeModal: () =>
        set({
            isModalOpen: false,
            modalContent: null,
            modalTitle: '',
            modalOnClose: undefined,
        }),
}));
