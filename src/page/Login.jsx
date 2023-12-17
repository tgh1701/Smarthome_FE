import styled from "styled-components";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

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
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            sx={{ marginTop: "20px" }}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Error>{error}</Error>}
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "grey",
              fontWeight: "600",
              width: "40%",
              height: "40px",
              padding: "15px 20px",
              border: "none",
              marginBottom: "20px",
              marginTop: "20px",
            }}
            type="submit"
          >
            LOG IN
          </Button>
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
