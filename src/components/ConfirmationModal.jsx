import React from "react";

const ConfirmationModal = ({ name, onConfirm, onCancel }) => {
    return (
        <div className="modal">
            <p>Are you sure you want to delete the record of {name}?</p>
            <button onClick={onConfirm}>Delete</button>
            <button onClick={onCancel}>No, Cancel</button>
        </div>
    );
};

export default ConfirmationModal;
