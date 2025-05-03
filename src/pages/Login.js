import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    fetch(`http://localhost:5000/users?email=${email}&password=${password}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
            localStorage.setItem("user", JSON.stringify(data[0]));
          setUser(data[0]);
          setMessage("Успешен вход!");
          setMessageType("success");
          setTimeout(() => {
            setMessage("");
            navigate("/home");
        }, 2000);
        } else {
            setMessage("Грешен имейл или парола");
            setMessageType("danger");
            setTimeout(() => setMessage(""), 3000);
        }
      });
  };
  

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Вход</h2>
      {message && (
        <div className={`alert alert-${messageType} alert-dismissible fade show`} role="alert">
            {message}
            </div>
        )}

      <form onSubmit={handleLogin}>
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
  
        <button type="submit" className="btn btn-primary w-100">
          Вход
        </button>
      </form>
    </div>
  );
  
}

export default Login;
