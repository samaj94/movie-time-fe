import React, { useState } from "react";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import MovieSearchItem from "../../components/MovieSearchItem/MovieSearchItem";
import './NewReview.css';

import Form from "react-bootstrap/Form";
import { useFormFields } from "../../libs/hooksLib";
import searchMovies from "../../api/searchMovie";

export default function NewReview() {
  const history = useHistory();

  const [titleResults, setTitleResults] = useState([]);
  const [showTitleSearch, setShowTitleSearch] = useState(true);
  const [contentObj, setContentObj] = useState({});
  const [fields, handleFieldChange] = useFormFields({
    description: "",
    contentTitle: "",
    rating: 0,
    contentType: "Movie"
  })
  const [isLoading, setIsLoading] = useState(false);
  const [didFail, setDidFail] = useState(false);

  function validateForm() {
    return fields.description.length > 0 && fields.contentTitle.length > 0;
  };

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    setDidFail(false);
    const info = {
      ...fields,
      poster: contentObj.Poster,
      contentTitle: contentObj.Title,
      imdbId: contentObj.imdbID
    };

    try {
      await createReview(info);
      history.push("/");
    } catch (e) {
      setDidFail(true);
      console.log('Error', e);
    }

    setIsLoading(false);
  };

  function createReview(info) {
    return API.post("reviews", "/reviews", {
      body: info
    });
  }

  async function handleTitleSearch(event) {
    event.preventDefault();
    try {
      const results = await searchMovies(event.target[0].value);
      setTitleResults(results);
    } catch (e) {
      console.log('Error', e);
    }
  }

  function contentClicked(item) {
    setContentObj(item);
    setShowTitleSearch(false);
  }

  return (
    <div className="NewReview">
      {showTitleSearch ? (
        <>
          <Form onSubmit={handleTitleSearch}>
            <Form.Group size="sm" controlId="contentTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  value={fields.contentTitle}
                  onChange={handleFieldChange}
                />
              </Form.Group>
              <LoaderButton
                block
                type="submit"
                size="med"
                isLoading={isLoading}
              >
              Search
            </LoaderButton>
          </Form>
          { titleResults.length > 0 && (
            <ul className="MovieResults">
              {titleResults.map((t) => <button onClick={() => contentClicked(t)}><MovieSearchItem {...t} /></button>)}
              </ul>
            )}
        </>
        ) : (
          <div>
            <MovieSearchItem {...contentObj} />
            <Button onClick={() => setShowTitleSearch(true)}>
              Change
            </Button>
          </div>
        )
      }
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="rating">
          <Form.Label>Rating: <span className="rating-item">{fields.rating}</span></Form.Label>
          <Form.Control type="range" min="0" max="10" step="0.5" value={fields.rating} onChange={handleFieldChange} />
        </Form.Group>
        <Form.Group controlId="contentType">
          <Form.Label>type</Form.Label>
          <Form.Control
            as="select"
            value={fields.contentType}
            onChange={handleFieldChange}
          >
            <option>Movie</option>
            <option>TV Show</option>
          </Form.Control>  
        </Form.Group>
        <Form.Group size="sm" controlId="description">
          <Form.Label>Description</Form.Label>
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