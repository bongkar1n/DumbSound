import React, { useState } from "react";
import { Form, Image, Container, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { AiOutlinePaperClip } from "react-icons/ai";
import dumbsound from "../images/DUMBSOUND.svg";
import "../styles/Payment.css";
import { API } from "../config/api";

function PaymentMusic() {
  let history = useHistory();
  const [form, setForm] = useState({
    rekNo: "",
  });
  const [preview, setPreview] = useState();
  const [message, setMessage] = useState();

  const { rekNo } = form;

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
    if (e.target.type === "file") {
      const url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleOnSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("rekNo", form.rekNo);
      formData.set("imageFile", form.image, form.image.name);
      console.log(form);

      const response = await API.post("/payment", formData, config);
      console.log(response);
      if (response.status == 200) {
        setMessage("Pembayaran Berhasil, Mohon Menunggu Konfirmasi Admin");
      }

      // const goRefresh = () => history.go(0);

      setPreview();
      setForm({
        rekNo: "",
      });
      setTimeout(() => {
        history.go(0);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(form);
  console.log(preview);

  return (
    <div>
      <div className="button-payment-page">
        {message && (
          <div class="alert alert-success message-success-music" role="alert">
            {message}
          </div>
        )}
        <div
          style={{
            textAlign: "center",
            color: "white",
          }}
        >
          <p className="premium">Premium</p>
          <p className="text-desc">
            Bayar sekarang dan nikmati streaming music yang kekinian dari{" "}
            <Image
              src={dumbsound}
              style={{ height: "30px", marginBottom: "8px" }}
            />
          </p>
          <p className="rek-number">
            <Image
              src={dumbsound}
              style={{ height: "30px", marginBottom: "8px" }}
            />{" "}
            : 0981312323
          </p>
        </div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleOnSubmit();
          }}
        >
          <Form.Control
            size="lg"
            type="text"
            placeholder="Input your account number"
            className="input-acc-no mb-3 bg-dark text-light mt-3"
            name="rekNo"
            required
            onChange={onChange}
          />

          {/* <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Large file input example</Form.Label>
            <Form.Control type="file" size="lg" />
          </Form.Group> */}

          <label className="label-input">
            Attach your proof
            <AiOutlinePaperClip size="2em" />
            <input type="file" name="image" onChange={onChange} />
          </label>
          {preview && (
            <div className="container-proof">
              <img src={preview} className="proof-preview" alt="preview-pict" />
            </div>
          )}

          <Container className="button-container-artist">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="button-submit-artist mb-5"
            >
              Send
            </Button>
          </Container>
        </Form>
      </div>
    </div>
  );
}

export default PaymentMusic;
