import React, { useState } from "react";
import "../styles/AddArtistForm.css";
import { Form, Button, Container } from "react-bootstrap";
import { API } from "../config/api";
function AddArtistForm() {
  const [message, setMessage] = useState();
  const [form, setForm] = useState({
    name: "",
    age: "",
    type: "",
    startCareer: "",
  });

  const { name, age, type, startCareer } = form;

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
      type: e.target.value,
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
      const response = await API.post("/artist", body, config);
      console.log(response);
      if (response.status === 200) {
        setMessage("Successfully Added Artist");
      }

      setForm({
        name: "",
        age: "",
        type: "0",
        startCareer: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(form);
  console.log(message);

  return (
    <div className="artist-form-page">
      <div className="table-container">
        <h1 className="text-add-artist"> Add Artist</h1>
        <Form onSubmit={handleOnSubmit}>
          {message && (
            <div class="alert alert-success message-success-music" role="alert">
              {message}
            </div>
          )}
          <Form.Group className="mb-3" controlId="text">
            <Form.Control
              onChange={handleOnChange}
              value={name}
              className="bg-dark text-light input-form-music"
              size="lg"
              type="text"
              name="name"
              placeholder="Name"
              bordered
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Control
              onChange={handleOnChange}
              value={age}
              className="bg-dark text-light input-form-music"
              size="lg"
              type="number"
              name="age"
              placeholder="Age"
              bordered
              required
            />
          </Form.Group>
          <Form.Control
            onChange={handleOnChangeOption}
            as="select"
            size="lg"
            className="mr-sm-2 mb-3 bg-dark text-light form-input-type-artist"
            id="inlineFormCustomSelect"
            custom
          >
            <option value="0">Type</option>
            <option value="Band" name="band">
              Band
            </option>
            <option value="Solo" name="solo">
              Solo
            </option>
          </Form.Control>
          <Form.Group className="mb-3" controlId="text">
            <Form.Control
              onChange={handleOnChange}
              value={startCareer}
              className="bg-dark text-light input-form-music"
              size="lg"
              type="number"
              name="startCareer"
              placeholder="Start a Career"
              bordered
              required
            />
          </Form.Group>
          <Container className="button-container-artist">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="button-submit-artist"
            >
              Add Artist
            </Button>
          </Container>
        </Form>
      </div>
    </div>
  );
}

export default AddArtistForm;
