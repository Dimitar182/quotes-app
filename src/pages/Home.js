import { Link } from "react-router-dom";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Добре дошъл в приложението за цитати!</h1>

      {user ? (
        <>
          <p className="lead">Радваме се, че отново си тук, <strong>{user?.name ?? user?.email}</strong>!</p>
          <p>Можеш да:</p>
          <ul>
            <li><Link to="/quotes">Виж всички цитати</Link></li>
            <li><Link to="/profile">Виж и управлявай твоите цитати</Link></li>
          </ul>
        </>
      ) : (
        <>
          <p className="lead">Регистрирай се или влез, за да започнеш да добавяш цитати.</p>
          <Link to="/login" className="btn btn-primary me-2">Вход</Link>
          <Link to="/register" className="btn btn-secondary">Регистрация</Link>
        </>
      )}
    </div>
  );
}

export default Home;
