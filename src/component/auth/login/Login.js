import React, { useState } from "react";
import "./Login.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginFail, loginLoading, loginSuccess } from "./LoginSlice";
import { userLogin } from "../../../api/userApi";
import { userInfo } from "../../../pages/UserActions";
import CustomAlert from "../../../shared/CustomAlert";

export default function Login({ setActiveForm }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.login);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "password") {
      e.target.value.length > 0 ? setShowEye(true) : setShowEye(false);
    }
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginLoading());
    try {
      const res = await userLogin(inputs);
      if (res?.status === "success") {
        dispatch(loginSuccess());
        dispatch(userInfo());
        navigate("/dashboard");
      }
    } catch (error) {
      if (error?.data) return dispatch(loginFail(error.data.message));
      return dispatch(loginFail("Something went wrong!"));
    }
  };

  const togglePass = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };
  return (
    <Form onSubmit={onSubmit}>
      {error && <CustomAlert variant="danger" error={error} />}
      <Form.Group className="mb-3 form-group">
        <Form.Label>Username</Form.Label>
        <Form.Control required type="email" name="email" placeholder="doe@gmail.com" value={inputs.email} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3 form-group">
        <Form.Label>Password</Form.Label>
        <div className="inner-addon">
          <Form.Control required type={showPassword ? "text" : "password"} name="password" value={inputs.password} onChange={handleChange} />
          {showEye && (showPassword ? <EyeSlashFill onClick={togglePass} className="eye-icon form-control-feedback" /> : <EyeFill onClick={togglePass} className="eye-icon form-control-feedback" />)}
        </div>
      </Form.Group>
      <Form.Check label="Remember me" />
      <Button className="form-control mt-3 button" type="submit" disabled={isLoading && "disabled"}>
        {isLoading ? "Loading ..." : "Login"}
      </Button>
      <div className="mt-3 d-flex flex-column align-items-end" style={{ width: "100%" }}>
        <Button variant="link" onClick={() => setActiveForm("register")}>
          Sign up?
        </Button>
        <Button variant="link" href="/forget-password">
          Forget Password?
        </Button>
      </div>
    </Form>
  );
}
