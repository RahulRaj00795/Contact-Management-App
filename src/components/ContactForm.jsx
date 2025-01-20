import React, { useEffect, useState } from "react";
import axios from "axios";
import './ContactForm.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import camera from '../assets/icons8-camera-50.png';
const ContactForm = ({ isUpdate, initialData, getData, setIsUpdating, setSelectedContact, contacts }) => {
    const [formData, setFormData] = useState({
        contact_name: "",
        contact_address: "",
        contact_number: "",
        contact_email: "",
        contact_city: "",
        contact_state: "",
        contact_status: "",
        contact_notes: "",
        created_on: "",
        contact_id: initialData?.id || "",
    });
    const [profilePic, setProfilePic] = useState(null);

    // Populate form data only if isUpdate is true
    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                created_on: initialData.created_on
                    ? new Date(initialData.created_on * 1000).toLocaleDateString('en-CA')
                    : "",
            });

            console.log(initialData);
            console.log(setFormData);
        } else {
            setFormData({
                contact_name: "",
                contact_address: "",
                contact_number: "",
                contact_email: "",
                contact_city: "",
                contact_state: "",
                contact_status: "",
                contact_notes: "",
                created_on: "",

            }); // Clear form when not updating
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, contact_state: "" });
    };

    const handleFileChange = (e) => {
        setProfilePic(e.target.files[0]);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isUpdate
                ? "https://demobackend-staging.web2.99cloudhosting.com/user/update_contact_details"
                : "https://demobackend-staging.web2.99cloudhosting.com/user/add_contact";


            const payload = {
                contact_address: formData.contact_address,
                contact_city: formData.contact_city || "",
                contact_email: formData.contact_email || "",
                contact_id: formData.id || "", // Required for updates
                contact_name: formData.contact_name,
                contact_notes: formData.contact_notes || "",
                contact_number: formData.contact_number,
                contact_state: formData.contact_state || "",
                contact_status: formData.contact_status || "inactive",
            };

            console.log("ppppppppppppppppp", payload);

            const sendData = isUpdate ? payload : formData;
            console.log("send Data", sendData)
            console.log("ccccccccc", formData)

            const addContactResponse = await axios.post(endpoint, sendData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (addContactResponse.data.apiresponse.code !== "0000") {
                console.error("Failed to process contact:", addContactResponse.data.apiresponse.message);
                return;
            }

            const contactId = addContactResponse.data.record?.id || formData.id;

            if (profilePic) {
                const formDataPic = new FormData();
                formDataPic.append("contact_id", contactId);
                formDataPic.append("photo", profilePic);

                const addPicResponse = await axios.post(
                    "https://demobackend-staging.web2.99cloudhosting.com/profile_pic/add_contact_pic",
                    formDataPic,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                if (addPicResponse.data.apiresponse.code !== "0000") {
                    console.error("Failed to add profile picture:", addPicResponse.data.apiresponse.message);
                }
            }

            toast(isUpdate ? "Contact updated successfully!" : "Contact added successfully!");

            // onSubmit();
            await getData();

            setFormData({
                contact_name: "",
                contact_address: "",
                contact_number: "",
                contact_email: "",
                contact_city: "",
                contact_state: "",
                contact_status: "",
                contact_notes: "",
                created_on: "",

            });
            setSelectedContact(null);
            setProfilePic(null);
            setIsUpdating(false);
            await getData();
            document.getElementById("profile-pic").value = "";
        } catch (error) {
            console.error("Error during submission:", error.message || error);
        }
    };



    return (
        <form className="contact-form" onSubmit={handleSubmit}>

            <h3>{isUpdate ? "Update Contact" : "Add New Contact Card"}</h3>
            <div className="form-group">
                <div className="flex">
                    <label>
                        Name:
                        <input
                            type="text"
                            name="contact_name"

                            value={formData.contact_name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Address:
                        <input
                            type="text"
                            name="contact_address"

                            value={formData.contact_address}
                            onChange={handleChange}
                            required
                        />
                    </label>


                </div>
                <div className="flex">

                    <label>
                        Number:
                        <input
                            type="text"
                            name="contact_number"

                            value={formData.contact_number}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Created On:
                        <input
                            type="date"
                            name="created_on"
                            value={formData.created_on}
                            onChange={handleChange}


                            required
                        />
                    </label>
                </div>

                <div className="flex">
                    <label>
                        Contact Status:
                        <select
                            name="contact_status"
                            value={formData.contact_status}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled></option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </label>
                    <label>
                        Notes:
                        <input
                            type="text"
                            name="contact_notes"

                            value={formData.contact_notes}
                            onChange={handleChange}
                        />
                    </label>
                </div>



                <div className="flex1 choos">

                    <div className="">
                        <label htmlFor="profile-pic" className="custom-file-upload">
                            Attachment File:
                            <div className="icon-c file-upload-wrapper">
                                <div className="upload-icon"><img src={camera} className="icon-cam" alt="upload" /></div>
                                <div className="upload-text">
                                    <p>Upload File</p>
                                    <small>Size: 600x150px, JPG, SVG, PNG; Max: 200Kb</small>
                                </div>
                                <div className="choose">Choose file</div>
                            </div>
                        </label>
                        <input
                            type="file"
                            id="profile-pic"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="file-input"
                            style={{
                                border: "none",
                                display: "none",
                            }}
                        />
                    </div>
                    <button type="submit" className="choose-file-button">
                        {isUpdate ? "Update" : "Submit"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ContactForm;
