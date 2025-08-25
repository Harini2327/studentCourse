import React, { useEffect, useState } from 'react';
import { getCourses, addCourse, updateCourse, deleteCourse } from '../services/courseService';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({ courseName: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    getCourses()
      .then((res) => setCourses(res.data))
      .catch(console.error);
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateCourse(editingId, formData).then(() => {
        loadCourses();
        resetForm();
      });
    } else {
      addCourse(formData).then(() => {
        loadCourses();
        resetForm();
      });
    }
  };

  const editCourse = (course) => {
    setFormData(course);
    setEditingId(course.id);
  };

  const deleteCrs = (id) => {
    deleteCourse(id).then(() => loadCourses());
  };

  const resetForm = () => {
    setFormData({ courseName: '', description: '' });
    setEditingId(null);
  };

  return (
    <div>
      <h2>Course Management</h2>
      <form onSubmit={handleSubmit}>
        <input name="courseName" placeholder="Course Name" value={formData.courseName} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <table border="1" style={{ marginTop: 20 }}>
        <thead>
          <tr><th>Course Name</th><th>Description</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {courses.map(c => (
            <tr key={c.id}>
              <td>{c.courseName}</td>
              <td>{c.description}</td>
              <td>
                <button onClick={() => editCourse(c)}>Edit</button>
                <button onClick={() => deleteCrs(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseManagement;
