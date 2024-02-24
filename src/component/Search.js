import { Form } from "react-bootstrap";

export default function Search({ keyup }) {
  return <Form.Control placeholder="Search.." onChange={keyup} />;
}
