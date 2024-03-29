import { Form } from "react-bootstrap";

export default function Search({ keyup, name, value }) {
  return <Form.Control placeholder="Search.." onChange={keyup} name={name} value={value} />;
}
