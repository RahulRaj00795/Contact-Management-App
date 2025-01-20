import React from "react";
import "./ContactCard.css";
import photo from '../assets/profile-photo.jpg'
import pencil from '../assets/pencil.svg'
import bin from '../assets/recycle-bin-2.svg'
const ContactCard = ({ contact, onEdit, onDelete }) => {
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit"
        });
    };

    const formateDat = (timestam) => {

        const date = new Date(timestam * 1000); // Convert to milliseconds

        // Format as mm/dd/yyyy
        const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
        return formattedDate;
    }




    if (!contact) {
        // return <div className="contact-car">Select a contact to display</div>;
        return <div className="contact-card">
            <div className="card-header">
                <h3>Contact Card</h3>
                <img
                    src={photo}
                    //"https://via.placeholder.com/150"
                    alt="Contact"
                    className="contact-pic"
                />
            </div>
            <div className="card-content">
                <p><strong>Name:</strong> </p>
                <p><strong>Address:</strong></p>
                <p><strong>Number:</strong> </p>
                <p><strong>Created On:</strong></p>

                <p><strong>Contact Status:</strong></p>
                <p><strong>Notes:</strong> </p>
                <div className="card-footer">
                    <p><strong>Check-in:</strong></p>

                    <div className="card-footer-i">    <img src={bin} alt="Edit" className="edit-icon" onClick={() => onDelete(contact)} />
                        <img src={pencil} alt="Edit" className="edit-icon" onClick={() => onEdit(contact)} />
                    </div>

                </div>
            </div>

        </div >
    }

    return (
        <div className="contact-card">
            <div className="card-header">
                <h3>Contact Card</h3>
                <img
                    src={
                        contact.contact_pic
                            ? `https://demobackend-staging.web2.99cloudhosting.com${contact.contact_pic}`
                            : photo
                        //: "https://via.placeholder.com/150"
                    }
                    alt="Contact"
                    className="contact-pic"
                />
            </div>
            <div className="card-content">
                <p><strong>Name:</strong> {contact.contact_name}</p>
                <p><strong>Address:</strong> {contact.contact_address}</p>
                <p><strong>Number:</strong> {contact.contact_number}</p>
                <p><strong>Created On:</strong> {formatDate(contact.created_on)}</p>

                <p><strong>Contact Status:</strong> {contact.contact_status}</p>
                <p><strong>Notes:</strong> {contact.contact_notes}</p>
                <div className="card-footer">
                    <p><strong>Check-in:</strong> {formateDat(contact.created_on)} 7:51 AM</p>

                    <div className="card-footer-i">    <img src={bin} alt="Edit" className="edit-icon" onClick={() => onDelete(contact)} />
                        <img src={pencil} alt="Edit" className="edit-icon" onClick={() => onEdit(contact)} />
                    </div>

                </div>
            </div>

        </div>
    );
};

export default ContactCard;
