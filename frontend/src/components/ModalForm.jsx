import Form from "./Form";
import styles from "./ModalForm.module.css";

const ModalForm = ({
    title = "",
    onSubmit,
    primaryButton = { text: "Submit", isLoading: false },
    secondaryButton = { text: "", onClick: null },
    isOpen,
    error,
    children
}) => {
    if (!isOpen) return null;

    return (
        <div className={styles["modal-form"]}>
            <Form
                title={title}
                onSubmit={onSubmit}
                primaryButton={primaryButton}
                secondaryButton={secondaryButton}
                error={error}
            >
                {children}
            </Form>
        </div>
    );
};

export default ModalForm;
