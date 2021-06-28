import React, { useEffect, useState } from "react";
import "./Home.css";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../../libs/contextLib";
import { onError } from "../../libs/errorLib";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { BsPencilSquare } from "react-icons/bs";

export default function Home() {
  const { isAuthenticated } = useAppContext();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) return;
      console.log('HERE');
      try {
        const reviews = await loadReviews();
        setReviews(reviews);
      } catch(e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadReviews() {
    return API.get('reviews', '/reviews');
  }

  function renderReviewsList(reviews) {
    let options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return (
      <>
        <LinkContainer to="/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold add-review">Write a new review</span>
          </ListGroup.Item>
        </LinkContainer>
        {
          reviews.map(({ reviewId, contentTitle, createdAt, rating }) => (
            <LinkContainer key={reviewId} to={`/reviews/${reviewId}`}>
              <ListGroup.Item action className="flex-group">
                <div>
                  <span className="content-title">
                    {contentTitle}
                  </span>
                  <br />
                  <span className="text-muted italic">
                    {new Date(createdAt).toLocaleString('en-US', options)}
                  </span>
                </div>
                <div className="flex-rating">{rating}</div>
              </ListGroup.Item>
            </LinkContainer>
          ))
        }
      </>
    );
  };

  function renderReviews() {
    return (
      <div className="review">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Movie Reviews</h2>
        <ListGroup>{!isLoading && renderReviewsList(reviews)}</ListGroup>
      </div>
    )
  };

  function renderLanding() {
    return (
      <div className="lander">
        <h1>Movie Time</h1>
        <p className="text-muted">What do you think?</p>
      </div>
    );
  };

  return (
    <div className="Home">
      { isAuthenticated ? renderReviews() : renderLanding() }
    </div>
  );
}