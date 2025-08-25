import React, { useEffect, useState } from 'react';
import { getEnrollmentsByStudent, enrollCourse, unregisterCourse } from '../services/enrollmentService';
import { getCourses } from '../services/courseService';

const MyCourses = ({ studentId }) => {
  const [enrollments, setEnrollments] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);

  useEffect(() => {
    loadEnrollments();
    loadCourses();
  }, [studentId]);

  const loadEnrollments = () => {
    getEnrollmentsByStudent(studentId)
      .then(res => setEnrollments(res.data))
      .catch(console.error);
  };

  const loadCourses = () => {
    getCourses()
      .then(res => setAvailableCourses(res.data))
      .catch(console.error);
  };

  const isEnrolled = (courseId) => enrollments.some(e => e.course.id === courseId);

  const handleEnroll = (courseId) => {
    if (!isEnrolled(courseId)) {
      enrollCourse({ student: { id: studentId }, course: { id: courseId } })
        .then(() => loadEnrollments())
        .catch(console.error);
    }
  };

  const handleUnregister = (enrollmentId) => {
    unregisterCourse(enrollmentId)
      .then(() => loadEnrollments())
      .catch(console.error);
  };

  return (
    <div>
      <h2>My Courses</h2>
      <h3>Enrolled Courses</h3>
      <ul>
        {enrollments.map(e => (
          <li key={e.id}>
            {e.course.courseName}
            <button onClick={() => handleUnregister(e.id)}>Unregister</button>
          </li>
        ))}
      </ul>

      <h3>Available Courses</h3>
      <ul>
        {availableCourses.map(c => (
          <li key={c.id}>
            {c.courseName}
            {!isEnrolled(c.id) && <button onClick={() => handleEnroll(c.id)}>Register</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCourses;
