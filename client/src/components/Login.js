import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Register from "./Register";
import "../styles/LoginAndReg.css";
import { API, setAuthToken } from "../config/api";
import { UserContext } from "../context/UseContext";
import { useHistory } from "react-router-dom";

function Login(props) {
  let history = useHistory();
  const [message, setMessage] = useState("");
  const [, dispatch] = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;

  const handleOnChangeLogin = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmitLogin = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify({
        email,
        password,
      });

      const response = await API.post("/login", body, config);

      setMessage(response.data.message);

      console.log(response);
      setAuthToken(response.data.data.user.token);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data.user,
      });
      history.push("/play");
    } catch (error) {
      console.log(error);
    }
  };

  const [loginShow, setLoginShow] = useState(props.isOpen);
  const handleClose = () => setLoginShow(false);

  // Register

  const [registerShow, setRegisterShow] = useState(false);
  const handleClickRegister = () => {
    setLoginShow(!loginShow);
    setRegisterShow(!registerShow);
  };

  return (
    <div>
      {registerShow ? <Register isOpen={true} /> : null}
      <Modal
        show={loginShow}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter "
        centered
        className="modal-show"
      >
        <Modal.Header className="border-0 modal-header">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="modal-title"
          >
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form className="ms-3 me-3" onSubmit={handleOnSubmitLogin}>
            {message && (
              <div class="alert alert-danger" role="alert">
                {message}
              </div>
            )}
            <Form.Group className="mb-4 " controlId="formBasicEmail">
              <Form.Control
                className="bg-dark text-light"
                style={{ height: "50px" }}
                required
                onChange={handleOnChangeLogin}
                name="email"
                value={email}
                type="email"
                placeholder="Email"
                bordered
                // className="form-input-email"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Control
                className="bg-dark text-light"
                style={{ height: "50px" }}
                required
                onChange={handleOnChangeLogin}
                name="password"
                value={password}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button
              className="button-form-login mb-3"
              type="submit"
              style={{ height: "50px" }}
            >
              Login
            </Button>

            <br />

            <h6 className="text-center mt-2 text-light ">
              Dont have an account? Klik{" "}
              <span className="here-to-register" onClick={handleClickRegister}>
                Here
              </span>
            </h6>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Login;
