import { useCallback, useEffect, useState } from "react";

export default function useModal(initialState = false) {
    const [isOpen, setIsOpen] = useState(initialState);

    const open = useCallback(() => {
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggle = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    // ESC key handling
    useEffect(() => {
        if (!isOpen) return;

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                close();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, close]);

    return {
        isOpen,
        open,
        close,
        toggle,
    };
}
