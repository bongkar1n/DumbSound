import React from "react";
import { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Login from "./Login";
import "../styles/LoginAndReg.css";
import { API } from "../config/api";

function Register(props) {
  // Register
  const [registerShow, setRegisterShow] = useState(props.isOpen);
  const handleClose = () => setRegisterShow(false);

  // Login
  const [loginShow, setLoginShow] = useState(false);
  const handleClickLogin = () => {
    setRegisterShow(!registerShow);
    setLoginShow(!loginShow);
    // setTimeout(() => {
    //   setLoginShow(!loginShow);
    // }, 500);
  };

  const [message, setMessage] = useState("");
  const [, setRegister] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    gender: "",
    phone: "",
    address: "",
  });

  const { email, password, fullName, gender, phone, address } = form;

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeOption = (e) => {
    console.log(e.target.value);
    setForm({
      ...form,
      gender: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify({ ...form });
      const response = await API.post("/register", body, config);

      if (response.data.status === "Validation Failed") {
        setMessage(response.data.message);
        setRegister("fail");
      } else if (response.data.status === "Failed") {
        setMessage(response.data.message);
        setRegister("fail");
      } else if (response.data.status === "success") {
        setMessage("Data Successfully Registered");
        setRegister("success");
        setTimeout(() => {
          handleClickLogin();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loginShow ? <Login isOpen={true} /> : null}
      <Modal
        show={registerShow}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter "
        centered
        className="modal-show"
      >
        <Modal.Header className="border-0 modal-header">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="color-white"
            style={{ color: "white" }}
          >
            Register
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form onSubmit={handleOnSubmit} className="ms-3 me-3">
            {message && (
              <div class="alert alert-danger" role="alert">
                {message}
              </div>
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                className="bg-dark text-light"
                onChange={handleOnChange}
                value={email}
                name="email"
                type="email"
                placeholder="Email"
                bordered
                style={{ height: "50px" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                className="bg-dark text-light"
                onChange={handleOnChange}
                value={password}
                name="password"
                type="password"
                placeholder="Password"
                bordered
                style={{ height: "50px" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="text">
              <Form.Control
                className="bg-dark text-light"
                onChange={handleOnChange}
                value={fullName}
                name="fullName"
                type="text"
                placeholder="fullname"
                bordered
                style={{ height: "50px" }}
              />
            </Form.Group>
            <Form.Row className="align-items-center">
              <Col xs="auto" className="my-1">
                <Form.Label
                  className="mr-sm-2"
                  htmlFor="inlineFormCustomSelect"
                  srOnly
                >
                  Preference
                </Form.Label>
                <Form.Control
                  as="select"
                  onChange={handleOnChangeOption}
                  className="mr-sm-2 mb-3 bg-dark text-light"
                  id="inlineFormCustomSelect"
                  custom
                  style={{ height: "50px", width: "465px" }}
                >
                  <option value="0">Gender</option>
                  <option value="Male" name="Male">
                    Male
                  </option>
                  <option value="Female" name="Female">
                    Female
                  </option>
                </Form.Control>
              </Col>
              {/* <Col xs="auto" className="my-1">
                <Form.Check
                  type="checkbox"
                  id="customControlAutosizing"
                  label="Remember my preference"
                  custom
                />
              </Col> */}
              {/* <Col xs="auto" className="my-1">
                <Button type="submit">Submit</Button>
              </Col> */}
            </Form.Row>
            <Form.Group className="mb-3" controlId="text">
              <Form.Control
                className="bg-dark text-light"
                onChange={handleOnChange}
                value={phone}
                name="phone"
                type="number"
                placeholder="phone"
                bordered
                style={{ height: "50px" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="text">
              <Form.Control
                className="bg-dark text-light"
                onChange={handleOnChange}
                value={address}
                name="address"
                type="text"
                placeholder="address"
                bordered
                style={{ height: "50px" }}
              />
            </Form.Group>
            <Button className="button-form-login" type="submit">
              Register
            </Button>

            <br />

            <h6 className="text-center mt-4 text-light ">
              Dont have an account? Klik{" "}
              <span className="here-to-register" onClick={handleClickLogin}>
                Here
              </span>
            </h6>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Register;
