import React from 'react';
import ContactListItemContainer from './ContactListItemContainer';

const ContactList = ({ contacts, name }) => {
    return (
        <div>
            <h3>{name}'s Contacts</h3>
            <div>
                {contacts.map(contact => (<ContactListItemContainer key={contact} id={contact} />))}
            </div>
        </div>
    );
};

export default ContactList;