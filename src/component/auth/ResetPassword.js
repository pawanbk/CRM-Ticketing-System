import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ArrowLeftCircleFill } from "react-bootstrap-icons";
import { CustomToaster, Notify } from "../../shared/CustomToaster.tsx";
import CustomAlert from "../../shared/CustomAlert.tsx";
import axios from "axios";
import AuthLayout from "../../layout/AuthLayout";

export default function Reset() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  const [inputs, setInputs] = useState({
    email: "",
    pin: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    await axios
      .patch("http://localhost:3001/v1/user/reset-password", inputs)
      .then((result) => {
        setIsLoading(false);
        if (result.status === 200) {
          navigate("/");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response.status === 400) {
          console.log(error.response);
          Notify(error.response.data.message, "error");
        }
      });
  };

  return (
    <AuthLayout>
      <div className="container">
        <Card>
          <Card.Body>
            <Card.Title className="mb-3 d-flex gap-3">
              <ArrowLeftCircleFill className="icon" onClick={() => navigate(-1)} />
              Reset Password
            </Card.Title>
            <CustomAlert variant="success" message={state.message} />
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 form-group">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" name="email" placeholder="doe@gmail.com" value={inputs.email} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3 form-group">
                <Form.Label>Pin</Form.Label>
                <Form.Control required type="text" name="pin" value={inputs.pin} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3 form-group">
                <Form.Label>New Password</Form.Label>
                <Form.Control required type="password" name="password" value={inputs.password} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3 form-group">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control required type="password" name="confirmPassword" value={inputs.confirmPassword} onChange={handleChange} />
              </Form.Group>
              <Button className="form-control mt-3 button" type="submit" disabled={isLoading && "disabled"}>
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <CustomToaster />
      </div>
    </AuthLayout>
  );
}
