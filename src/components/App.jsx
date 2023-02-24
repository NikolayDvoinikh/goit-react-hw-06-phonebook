import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';

import { useSelector, useDispatch } from 'react-redux';

import { addContact, deleteContact } from 'Redux/contacts/contacts-actions';
import { setFilter } from 'Redux/filter/filter-actions';
import { getContactList } from 'Redux/contacts/contacts-selectors';
import { getFilter } from 'Redux/filter/filter-selectors';

import css from './app.module.css';

export const App = () => {
  const contacts = useSelector(getContactList);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  const formSubmitHandler = ({ name, number }) => {
    if (
      contacts.filter(
        person => person.name.toLowerCase() === name.toLowerCase()
      ).length
    ) {
      return alert(`${name} is already in contacts`);
    }
    console.log(addContact({ name, number }));
    dispatch(addContact({ name, number }));
  };

  const filterByName = () => {
    const filteredContacts = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
    return filteredContacts;
  };

  const removeContact = id => {
    dispatch(deleteContact(id));
    console.log(deleteContact(id));
  };

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
      <ContactList list={filtered} deleteContact={removeContact} />
    </div>
  );
};
