import React, { useEffect, useState } from 'react';
import { getStudents, addStudent, updateStudent, deleteStudent } from '../services/studentService';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    getStudents()
      .then((res) => setStudents(res.data))
      .catch(console.error);
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateStudent(editingId, formData).then(() => {
        loadStudents();
        resetForm();
      });
    } else {
      addStudent(formData).then(() => {
        loadStudents();
        resetForm();
      });
    }
  };

  const editStudent = (student) => {
    setFormData(student);
    setEditingId(student.id);
  };

  const deleteStud = (id) => {
    deleteStudent(id).then(() => loadStudents());
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '' });
    setEditingId(null);
  };

  return (
    <div>
      <h2>Student Management</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required type="email" />
        <input name="password" placeholder="Password" value={formData.password} onChange={handleChange} required type="password" />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <table border="1" style={{ marginTop: 20 }}>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>
                <button onClick={() => editStudent(s)}>Edit</button>
                <button onClick={() => deleteStud(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentManagement;
