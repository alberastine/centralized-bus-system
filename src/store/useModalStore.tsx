import { create } from 'zustand';

type ModalStore = {
    isModalOpen: boolean;
    modalContent: React.ReactNode;
    modalTitle: string;
    modalOnClose?: () => void;
    openModal: (
        content: React.ReactNode,
        title?: string,
        onClose?: () => void
    ) => void;
    closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    modalContent: null,
    modalTitle: '',
    modalOnClose: undefined,
    openModal: (content, title = '', onClose) =>
        set({
            isModalOpen: true,
            modalContent: content,
            modalTitle: title,
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
