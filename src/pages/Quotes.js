import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newQuote, setNewQuote] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      alert("Моля, влез в акаунта си.");
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetch("http://localhost:5000/quotes")
      .then(res => res.json())
      .then(data => setQuotes(data));
  }, []);

  const handleAddQuote = (e) => {
    e.preventDefault();

    const newEntry = {
      text: newQuote,
      userEmail: user.email,
      userName: user.name
    };

    setSuccessMessage("Цитатът е добавен успешно!");
    setTimeout(() => setSuccessMessage(""), 3000);


    fetch("http://localhost:5000/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry),
    })
      .then(res => res.json())
      .then(data => {
        setQuotes([...quotes, data]);
        setNewQuote("");
      });
  };

  const myQuotes = quotes.filter(q => q.userEmail === user.email);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Цитати</h2>
  
      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
            {successMessage}
            </div>
        )}

      <form onSubmit={handleAddQuote} className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Нов цитат"
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Добави</button>
      </form>

      <h2 className="mb-4">Потърси в цитати</h2>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Търси в цитатите..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
  
      <ul className="list-group">
        {quotes
          .filter(q =>
            searchTerm === "" || q.text.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((q) => (
            <li key={q.id} className="list-group-item">
              "{q.text}" – <i>{q.userName || q.userEmail}</i>
            </li>
          ))}
      </ul>
    </div>
  );
  
  
}

export default Quotes;
