import React, { useState } from "react";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";

import LoaderButton from "../../components/LoaderButton/LoaderButton";
import Form from "react-bootstrap/Form";
import { useFormFields } from "../../libs/hooksLib";

export default function NewReview() {
  const history = useHistory();

  const [fields, handleFieldChange] = useFormFields({
    description: "",
    title: "",
    rating: 0,
    type: "Movie"
  })
  const [isLoading, setIsLoading] = useState(false);
  const [didFail, setDidFail] = useState(false);

  function validateForm() {
    return fields.description.length > 0 && fields.title.length > 0;
  };

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    setDidFail(false);
    try {
      await createNote({ fields });
      history.push("/");
    } catch (e) {
      setDidFail(true);
      console.log('Error', e);
    }

    setIsLoading(false);
  };

  function createNote(note) {
    return API.post("reviews", "/reviews", {
      body: fields
    });
  }

  return (
    <div className="NewReview">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="sm" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            autoFocus
            type="text"             
            value={fields.title}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="rating">
          <Form.Label>Rating: {fields.rating}</Form.Label>
          <Form.Control type="range" min="0" max="10" step="0.5" value={fields.rating} onChange={handleFieldChange} />
        </Form.Group>
        <Form.Group controlId="type">
          <Form.Control
            as="select"
            value={fields.type}
            onChange={handleFieldChange}
          >
            <option>Movie</option>
            <option>TV Show</option>
          </Form.Control>  
        </Form.Group>
        <Form.Group size="sm" controlId="description">
          <Form.Control
            value={fields.description}
            as="textarea"
            onChange={handleFieldChange}
          />
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </Form>
      { didFail && (<div>Failed to submit review. Check console for error.</div>)}
    </div>
  );
};