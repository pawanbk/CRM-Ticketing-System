import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ArrowLeftCircleFill } from "react-bootstrap-icons";
import axios from "axios";
import AuthLayout from "../../layout/AuthLayout";
import CustomAlert from "../../shared/CustomAlert.tsx";
import "./Forget.css";
import LoadingAnimation from "../../shared/LoadingAnimation.tsx";

export default function Forget() {
  const API_URL = "http://localhost:3001/v1/user/reset-password";
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    setError("");
    setLoading(true);
    e.preventDefault();
    axios
      .post(API_URL, inputs)
      .then((result) => {
        if (result.status === 200) {
          setLoading(false);
          navigate("/reset-password", { state: { message: result.data.message } });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        setError(error?.response?.data?.message);
      });
  };

  return (
    <AuthLayout>
      <div className="container">
        <Card>
          <Card.Body>
            <Card.Title className="mb-3 d-flex gap-3">
              <ArrowLeftCircleFill className="icon" onClick={() => navigate(-1)} />
              Forget Password
            </Card.Title>
            {error && <CustomAlert variant="error" message={error} />}

            <Form onSubmit={submitForm}>
              <Form.Group className="mb-3 form-group">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" name="email" value={inputs.email} onChange={handleChange} />
                <Form.Text id="passwordHelpBlock" muted>
                  {" "}
                  Enter the email address you used during the registration. Then we'll email a link to this address.
                </Form.Text>
              </Form.Group>
              <Button className="form-control mt-3 button" type="submit" disabled={loading && "disabled"}>
                {loading ? <LoadingAnimation /> : "Send Link"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </AuthLayout>
  );
}
