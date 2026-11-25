
"use client";

import { useState } from "react";

type Student = {
  name: string;
  id: string;
  course: string;
};

export default function StudentManager() {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [course, setCourse] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const resetForm = () => {
    setName("");
    setStudentId("");
    setCourse("");
    setEditingId(null);
  };

  const addStudent = () => {
    if (!name.trim() || !studentId.trim() || !course.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (!editingId && students.some((s) => s.id === studentId.trim())) {
      alert("Student ID already exists.");
      return;
    }

    if (editingId) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === editingId
            ? { name: name.trim(), id: s.id, course: course.trim() }
            : s
        )
      );
    } else {
      setStudents((prev) => [
        ...prev,
        { name: name.trim(), id: studentId.trim(), course: course.trim() },
      ]);
    }

    resetForm();
  };

  const editStudent = (student: Student) => {
    setName(student.name);
    setStudentId(student.id);
    setCourse(student.course);
    setEditingId(student.id);
  };

  const deleteStudent = (id: string) => {
    if (!confirm("Delete this student?")) return;

    setStudents((prev) => prev.filter((s) => s.id !== id));

    if (editingId === id) resetForm();
  };

  const filteredStudents = students.filter((s) =>
    `${s.name} ${s.id} ${s.course}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const inputStyle: React.CSSProperties = {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    cursor: "pointer",
    background: "#f5f5f5",
    color: "#222",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "30px 20px",
        background: "#f5f5f5",
        color: "#222",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "auto" }}>
        <header style={{ marginBottom: "25px" }}>
          <h1 style={{ fontSize: "26px", marginBottom: "8px" }}>
            Student Profile Management
          </h1>
          <p>Manage student records.</p>
          <p>
            <strong>Total Students:</strong> {students.length}
          </p>
        </header>

        <section
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>
            {editingId ? "Edit Student" : "Add New Student"}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
            }}
          >
            <div>
              <label>Student Name</label>
              <input
                style={inputStyle}
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label>Student ID / SRN</label>
              <input
                style={inputStyle}
                placeholder="Enter student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                disabled={!!editingId}
              />
            </div>

            <div>
              <label>Course</label>
              <input
                style={inputStyle}
                placeholder="Enter course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
            <button style={buttonStyle} onClick={addStudent}>
              {editingId ? "Update Student" : "Add Student"}
            </button>

            {editingId && (
              <button style={buttonStyle} onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </section>

        <section
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            padding: "20px",
          }}
        >
          <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>
            Student Records
          </h2>

          <input
            style={{ ...inputStyle, marginBottom: "15px" }}
            placeholder="Search name, ID or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
              }}
            >
              <thead>
                <tr>
                  {["Student ID", "Name", "Course", "Actions"].map((heading) => (
                    <th
                      key={heading}
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #ccc",
                        background: "#f1f1f1",
                      }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      style={{ padding: "20px", textAlign: "center" }}
                    >
                      {students.length === 0
                        ? "No students added yet."
                        : "No matching students found."}
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                        {student.id}
                      </td>
                      <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                        {student.name}
                      </td>
                      <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                        {student.course}
                      </td>
                      <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                        <button
                          style={{ ...buttonStyle, marginRight: "8px" }}
                          onClick={() => editStudent(student)}
                        >
                          Edit
                        </button>

                        <button
                          style={buttonStyle}
                          onClick={() => deleteStudent(student.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <footer style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>
          Student Profile Management System
        </footer>
      </div>
    </main>
  );
}
