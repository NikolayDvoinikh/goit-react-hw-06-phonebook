import { useState } from 'react';
import PropTypes from 'prop-types';
import { initState } from 'data/initState';
import css from './ContactForm.module.css';

const ContactForm = ({ onSubmit }) => {
  const [contact, setContact] = useState({ ...initState });

  const { name, number } = contact;

  const handleName = ({ target }) => {
    const { name, value } = target;
    setContact(prevContact => {
      return { ...prevContact, [name]: value };
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit({ ...contact });
    setContact({ ...initState });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label htmlFor="name" className={css.label}>
        Name
        <input
          className={css.input}
          onChange={handleName}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label htmlFor="number" className={css.label}>
        Number
        <input
          className={css.input}
          onChange={handleName}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={css.btnSubmit} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
