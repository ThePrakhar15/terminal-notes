import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
e.preventDefault();
    if (name.trim() === '') {
      setError("Name is required");
      return;
    }
    if (email.trim() === '') {
      setError("Email is required");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email")
      return;
    }
    if (password.trim() === '') {
      setError("Password is required")
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 character");
      return;
    }
    setError("");
    try {
const response = await api.post("/auth/register",{
  name,
  email,
  password
});
console.log(response.data.message);
alert("Registration succesful!")
navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <p>{error}</p>
        <label htmlFor="name">Name: </label>
        <input type="text" placeholder='Enter you name' id='name' value={name} onChange={(e) => {
          setName(e.target.value);
        }} />

        <label htmlFor="email">Email</label>
        <input type='email' placeholder='Enter your email' id='email' value={email} onChange={(e) => {
          setEmail(e.target.value)
        }} />

        <label htmlFor='password'>Password</label>
        <input type="password" placeholder='Enter you password' id='password' value={password} onChange={(e) => {
          setPassword(e.target.value)
        }} />

        <button type='Submit'>Register</button>
      </form>
    </div>
  )
}

export default Register