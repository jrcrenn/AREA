import React from "react";
import Form from "react-bootstrap/Form";

function MyForm(props) {
  return (
    <Form>
      <Form.Group controlId={props.id}>
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
          type={props.type}
          placeholder={props.placeholder}
          onChange={e => props.value(e.target.value)}
        />
        {props.message.length > 0 ? (
          <Form.Text className="text-muted">{props.message}</Form.Text>
        ) : null}
      </Form.Group>
    </Form>
  );
}

export default MyForm;
