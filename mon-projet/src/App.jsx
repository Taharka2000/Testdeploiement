import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://testdeploiement-vs43.vercel.app/api/contacts";

function App() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", email: "", dob: "", phone: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}`).then((res) => setContacts(res.data));
  }, []);

  const handleChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    if (newContact.name && newContact.email) {
      const res = await axios.post(API_URL, newContact);
      setContacts([...contacts, res.data]);
      setNewContact({ name: "", email: "", dob: "", phone: "" });
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setContacts(contacts.filter((contact) => contact._id !== id));
  };

  const handleEdit = (contact) => {
    setEditingId(contact._id);
    setNewContact(contact);
  };

  const handleUpdate = async () => {
    const res = await axios.put(`${API_URL}/${editingId}`, newContact);
    setContacts(contacts.map((c) => (c._id === editingId ? res.data : c)));
    setNewContact({ name: "", email: "", dob: "", phone: "" });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Gestion des Contacts</h2>

        <div className="mb-4">
          <input type="text" name="name" placeholder="Nom" value={newContact.name} onChange={handleChange} className="border p-2 m-1 rounded w-full" />
          <input type="email" name="email" placeholder="Email" value={newContact.email} onChange={handleChange} className="border p-2 m-1 rounded w-full" />
          <input type="date" name="dob" value={newContact.dob} onChange={handleChange} className="border p-2 m-1 rounded w-full" />
          <input type="text" name="phone" placeholder="Téléphone" value={newContact.phone} onChange={handleChange} className="border p-2 m-1 rounded w-full" />

          {editingId ? (
            <button onClick={handleUpdate} className="bg-yellow-500 text-white px-4 py-2 mt-2 rounded">Modifier</button>
          ) : (
            <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">Ajouter</button>
          )}
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Nom</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Date de naissance</th>
              <th className="border p-2">Téléphone</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id} className="border">
                <td className="border p-2">{contact.name}</td>
                <td className="border p-2">{contact.email}</td>
                <td className="border p-2">{contact.dob}</td>
                <td className="border p-2">{contact.phone}</td>
                <td className="border p-2">
                  <button onClick={() => handleEdit(contact)} className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded">Modifier</button>
                  <button onClick={() => handleDelete(contact._id)} className="bg-red-500 text-white px-2 py-1 rounded">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
