import React, { useState, useEffect } from 'react';
import {api} from '../services/api';


const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });
  
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', description: '' });

  const currentUser = (() => {
    const saved = localStorage.getItem('user');
    if (saved && saved !== "undefined") {
      try {
        return JSON.parse(saved);
      } catch (e) { return {}; }
    }
    return {};
  })();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.getCourses();
      setCourses(res.data.data);
    } catch (err) {
      console.error("Failed to fetch courses");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
   await api.createCourse(formData);   
      
    setFormData({ title: '', description: '' });
    fetchCourses();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this course?")) {
     await api.deleteCourse(id)
      fetchCourses();
    }
  };

  const startEdit = (course) => {
    setEditingId(course.id);
    setEditData({ title: course.title, description: course.description });
  };

  const handleUpdate = async (id) => {
    await api.updateCourse(id, editData);
    setEditingId(null);
    fetchCourses();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8 bg-blue-50 p-4 rounded-lg shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-blue-800">Available Courses</h1>
        <p className="text-sm text-blue-600">
            Logged in as: <strong>{currentUser.username || 'Unknown'}</strong>
          </p>
        </div>
        <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold">
          Total: {courses.length}
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Post a New Course</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <input 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-200 outline-none" 
            placeholder="Course Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
          <textarea 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-200 outline-none" 
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition font-medium">
            Post Course
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {courses.map(course => (
          <div key={course.id} className="border p-5 rounded-lg shadow-sm bg-white">
            
            {editingId === course.id ? (
              <div className="space-y-3">
                <input 
                  className="w-full border p-2 rounded"
                  value={editData.title}
                  onChange={(e) => setEditData({...editData, title: e.target.value})}
                />
                <textarea 
                  className="w-full border p-2 rounded"
                  value={editData.description}
                  onChange={(e) => setEditData({...editData, description: e.target.value})}
                />
                <div className="flex space-x-2">
                  <button onClick={() => handleUpdate(course.id)} className="bg-blue-600 text-white px-4 py-1 rounded">Save</button>
                  <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-4 py-1 rounded">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                  <p className="text-gray-600 mt-1 whitespace-pre-wrap">{course.description}</p>
                  <p className="text-sm text-gray-400 mt-3 italic">Posted by: {course.username}</p>
                </div>

                {(course.user_id == (currentUser.id || currentUser.user_id)) && (
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => startEdit(course)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(course.id)} 
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;