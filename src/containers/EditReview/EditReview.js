import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useHistory, useParams } from "react-router-dom";

import LoaderButton from "../../components/LoaderButton/LoaderButton";
import Form from "react-bootstrap/Form";
import { onError } from "../../libs/errorLib";

export default function EditPage() {
  const { id } = useParams();
  const history = useHistory();

  const [description, setDescription] = useState("");
  const [contentTitle, setContentTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [contentType, setContentType] = useState("Movie");
  const [isLoading, setIsLoading] = useState(false);
  const [didFail, setDidFail] = useState(false);

  useEffect(() => {
    function loadReview() {
      return API.get("reviews", `/reviews/${id}`);
    }

    async function onLoad() {
      try {
        const { review } = await loadReview();
        setContentType(review.contentType);
        setDescription(review.description);
        setContentTitle(review.contentTitle);
        setRating(review.rating);
      } catch (e) {
        onError(e);
      }
    }

    onLoad()
  }, [id]);

  function validateForm() {
    return description.length > 0 && contentTitle.length > 0;
  };

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    setDidFail(false);
    try {
      await editReview({ rating, contentType, description });
      history.push("/");
    } catch (e) {
      setDidFail(true);
      onError(e);
    }

    setIsLoading(false);
  };

  function editReview(details) {
    return API.put("reviews", `/reviews/${id}`, {
      body: details
    });
  }

  return (
    <div className="NewReview">
      <Form onSubmit={handleSubmit}>
        <h1>{contentTitle}</h1>
        <Form.Group controlId="rating">
          <Form.Label>Rating: {rating}</Form.Label>
          <Form.Control type="range" min="0" max="10" step="0.5" value={rating} onChange={(e) => setRating(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="contentType">
          <Form.Control
            as="select"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option>Movie</option>
            <option>TV Show</option>
          </Form.Control>  
        </Form.Group>
        <Form.Group size="sm" controlId="description">
          <Form.Label>description</Form.Label>
          <Form.Control
            value={description}
            as="textarea"
            onChange={(e) => setDescription(e.target.value)}
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
          Submit
        </LoaderButton>
      </Form>
      { didFail && (<div>Failed to submit review. Check console for error.</div>)}
    </div>
  );
};