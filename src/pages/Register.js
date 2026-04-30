import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
  
    fetch(`http://localhost:5000/users?email=${email}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setMessage("Имейлът вече е регистриран");
          setMessageType("danger");
          setTimeout(() => setMessage(""), 3000);
        } else {
          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
          })
            .then(res => res.json())
            .then(() => {
              setMessage("Регистрацията е успешна!");
              setMessageType("success");
              setTimeout(() => {
                setMessage("");
                navigate("/login");
              }, 2000);
            });
        }
      });
  };
  

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Регистрация</h2>
      {message && (
        <div className={`alert alert-${messageType} alert-dismissible fade show`} role="alert">
            {message}
            </div>
        )}

      <form onSubmit={handleRegister}>
        <div className="mb-3">
            <label className="form-label">Име</label>
            <input
            type="text"
            className="form-control"
            placeholder="Въведи име"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
        </div>


        <div className="mb-3">
          <label className="form-label">Имейл</label>
          <input
            type="email"
            className="form-control"
            placeholder="Въведи имейл"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
  
        <div className="mb-3">
          <label className="form-label">Парола</label>
          <input
            type="password"
            className="form-control"
            placeholder="Въведи парола"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
  
        <button type="submit" className="btn btn-success w-100">
          Регистрирай се
        </button>
      </form>
    </div>
  );
  
}

export default Register;
