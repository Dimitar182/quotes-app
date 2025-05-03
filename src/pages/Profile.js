import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [myQuotes, setMyQuotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetch(`http://localhost:5000/quotes?userEmail=${user.email}`)
      .then(res => res.json())
      .then(data => setMyQuotes(data));
  }, [user.email]);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/quotes/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setMyQuotes(myQuotes.filter(q => q.id !== id));
      });

      setMessage("Цитатът беше успешно обновен/изтрит!");
      setTimeout(() => setMessage(""), 3000);
  };

  const saveEdit = (id) => {
    fetch(`http://localhost:5000/quotes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: editedText })
    })
      .then(res => res.json())
      .then(updated => {
        setMyQuotes(myQuotes.map(q => (q.id === id ? updated : q)));
        setEditingId(null);
        setEditedText("");
      });

      setMessage("Цитатът беше успешно обновен/изтрит!");
      setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Моите цитати</h2>

      {message && (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
            {message}
            </div>
        )}
  
      {myQuotes.length === 0 ? (
        <div className="alert alert-info">Все още нямаш добавени цитати.</div>
      ) : (
        <ul className="list-group">
          {myQuotes.map((q) => (
            <li
              key={q.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {editingId === q.id ? (
                <div className="w-100 d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control me-2"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <button
                    onClick={() => saveEdit(q.id)}
                    className="btn btn-success btn-sm me-2"
                  >
                    💾
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="btn btn-secondary btn-sm"
                  >
                    Отказ
                  </button>
                </div>
              ) : (
                <>
                  <span>"{q.text}"</span>
                  <div>
                    <button
                      onClick={() => {
                        setEditingId(q.id);
                        setEditedText(q.text);
                      }}
                      className="btn btn-warning btn-sm me-2"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(q.id)}
                      className="btn btn-danger btn-sm"
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
  
}

export default Profile;
