// import { Component } from 'react';
import { useState, useEffect } from 'react';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import css from './app.module.css';

export const App = () => {
  const [contacts, setContact] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('My-Contacts'));
    return contacts ? contacts : [];
  });

  const [filter, setFilter] = useState('');

  const handleChange = ({ target }) => {
    setFilter(target.value);
  };

  const formSubmitHandler = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    if (
      contacts.filter(
        person => person.name.toLowerCase() === name.toLowerCase()
      ).length
    ) {
      return alert(`${name} is already in contacts`);
    }
    setContact(prevContacts => [contact, ...prevContacts]);
  };

  const filterByName = () => {
    const filteredContacts = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
    return filteredContacts;
  };

  const deleteContact = event => {
    const id = event.currentTarget.id;
    const updateList = contacts.filter(contact => contact.id !== id);
    setContact(updateList);
  };

  useEffect(() => {
    localStorage.setItem('My-Contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filtered = filterByName();
  return (
    <div
      style={{
        height: '100vh',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2 className={css.title}>Contacts</h2>
      <Filter filter={filter} handleChange={handleChange} />
      <ContactList list={filtered} deleteContact={deleteContact} />
    </div>
  );
};
