import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import ContactList from "./components/ContactList";
import ContactCard from "./components/ContactCard";
import ContactForm from "./components/ContactForm";
import ConfirmationModal from "./components/ConfirmationModal";
import { ToastContainer } from 'react-toastify';
import "./App.css";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showModal, setShowModal] = useState(false);


  // Fetch all contacts from the server
  const fetchContacts = async () => {
    try {
      const response = await axios.get(
        "https://demobackend-staging.web2.99cloudhosting.com/user/list_contacts"
      );
      setContacts(response.data.record || []);
      console.log(response.data.record)
    } catch (error) {
      console.error("Error fetching contacts:", error.message || error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (contactId) => {
    if (!contactId) {
      console.error("Invalid contact ID for deletion");
      return;
    }

    try {
      const response = await axios.post(
        "https://demobackend-staging.web2.99cloudhosting.com/user/delete_contact",
        { contact_id: contactId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.apiresponse.code === "0000") {
        await fetchContacts();

        setShowModal(false);
        setSelectedContact(null);
        setIsUpdating(false);

      } else {
        console.error("Error deleting contact:", response.data.apiresponse.message);
      }
    } catch (error) {
      console.error("Error during delete operation:", error.message || error);
    }
  };

  // Handle edit action
  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsUpdating(true);
  };

  return (
    <div className="app">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      // transition={Bounce}
      />
      <Sidebar />
      <div className="main-content">
        <div className="top">
          <div className="left">
            <ContactCard
              contact={selectedContact}
              onEdit={handleEdit}
              onDelete={() => setShowModal(true)}
            />
          </div>
          <div className="right">
            <ContactForm
              getData={fetchContacts}
              // onSubmit={handleAddOrUpdate}
              initialData={isUpdating ? selectedContact : null}
              isUpdate={isUpdating}
              setIsUpdating={setIsUpdating}
              setSelectedContact={setSelectedContact}

            />
          </div>
        </div>
        <ContactList
          contacts={contacts}
          onSelect={setSelectedContact}
          handleDelete={(contact) => setShowModal(contact)}

        />
        {showModal && selectedContact && (
          <ConfirmationModal
            name={selectedContact.contact_name}
            onConfirm={() => handleDelete(selectedContact.id)}
            onCancel={() => {
              setShowModal(false)

            }
            }
          />
        )}
      </div>
    </div>
  );
};

export default App;

