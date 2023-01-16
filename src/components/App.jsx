import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { nanoid } from 'nanoid';
import { Section, Title } from './App.styled';
import Form from './Form';
import ContactsList from './ContactsList';
import Filter from './Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addNewContact = data => {
    const { contacts } = this.state;
    const newContact = {
      id: nanoid(),
      ...data,
    };
    contacts.some(({ name }) => name === data.name)
      ? toast.error(`${data.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, newContact],
        }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const currentContacts = this.getContacts();
    return (
      <>
        <div>
          <Toaster />
        </div>
        <Section>
          <Title>Phonebook</Title>
          <Form addNewContact={this.addNewContact} />
        </Section>
        <Section>
          <Title>Contacts</Title>
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactsList
            contacts={currentContacts}
            deleteContact={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}
