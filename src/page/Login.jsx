import styled from "styled-components";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Wrapper = styled.div`
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 400px;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  padding: 15px 20px;
  border: none;
  margin-bottom: 20px;
  margin-top: 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  margin-top: 20px;
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const refreshPage = () => {
    window.location.reload();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        navigate("/");
        refreshPage();
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLinkClick = (to) => {
    if (to === "/signup") {
      navigate(to);
      refreshPage();
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>LOG IN</Title>
        <Form onSubmit={handleLogin}>
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Error>{error}</Error>}
          <Button type="submit">LOG IN</Button>
          <Link
            to="/signup"
            style={{ color: "black", textDecoration: "none" }}
            onClick={() => handleLinkClick("/")}
          >
            Create a new account!
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;