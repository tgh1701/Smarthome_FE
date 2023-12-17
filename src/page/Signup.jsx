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

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const refreshPage = () => {
    window.location.reload();
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        navigate("/login");
        refreshPage();
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleLinkClick = (to) => {
    if (to === "/login") {
      navigate(to);
      refreshPage();
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN UP</Title>
        <Form onSubmit={handleSignup}>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            sx={{ marginTop: "20px" }}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            sx={{ marginTop: "20px" }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            sx={{ marginTop: "20px" }}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
            SIGN UP
          </Button>
        </Form>
        <Link
          to="/login"
          style={{ color: "black", textDecoration: "none" }}
          onClick={() => handleLinkClick("/")}
        >
          Already have account?
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Signup;
