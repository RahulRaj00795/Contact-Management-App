import React from "react";
import "./ContactList.css";
import bin from '../assets/bin.svg'
import photo from '../assets/profile-photo.jpg'

const ContactList = ({ contacts, onSelect, handleDelete, }) => {
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",

        });
    };

    return (
        <div className="contact-container">
            <table className="contact-table">
                <thead>
                    <tr>
                        <th><input type="checkbox" name="select" /></th>
                        <th>Contact Pic</th>
                        <th>Name & Address</th>
                        <th>Number</th>
                        <th>Created On</th>
                        <th>Contact Status</th>
                        <th>Notes</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id} onClick={() => onSelect(contact)}>
                            <td><input type="checkbox" name="select" /></td>
                            <td>
                                <img
                                    src={
                                        contact.contact_pic_available
                                            ? `https://demobackend-staging.web2.99cloudhosting.com${contact.contact_pic}`
                                            : photo
                                        // : "https://via.placeholder.com/50"
                                    }
                                    alt="Contact"
                                    className="contact-pic"
                                />
                            </td>
                            <td>
                                <div className="contact-details">
                                    <span className="contact-name">{contact.contact_name}</span>
                                    <br />
                                    <span className="contact-address">
                                        {contact.contact_address}, {contact.contact_city || ""}{" "}
                                        {contact.contact_state || ""}
                                    </span>
                                </div>
                            </td>
                            <td>{contact.contact_number}</td>
                            <td>{formatDate(contact.created_on)}</td>

                            <td className={`status ${contact.contact_status.toLowerCase()}`}>
                                {contact.contact_status}
                            </td>
                            <td>{contact.contact_notes}</td>
                            <td>
                                <img src={bin} alt="Edit" className="delete-button" onClick={(e) => {

                                    handleDelete(contact);
                                }} />

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactList;

