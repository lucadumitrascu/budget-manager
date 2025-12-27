import { useState } from "react";

const useModalController = () => {
    const [item, setItem] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const open = (data = null) => {
        setItem(data);
        setIsOpen(true);
    };

    const close = () => {
        setItem(null);
        setIsOpen(false);
    };

    return { item, isOpen, open, close };
}

export default useModalController;
