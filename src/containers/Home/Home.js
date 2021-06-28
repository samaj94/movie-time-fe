import React, { useEffect, useState } from "react";
import "./Home.css";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../../libs/contextLib";
import { onError } from "../../libs/errorLib";
import { API } from "aws-amplify";
import ReviewListItem from '../../components/ReviewListItem';

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

  function renderReviews() {
    return (
      <div className="review">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Movie Reviews</h2>
        <ListGroup>{!isLoading && <ReviewListItem reviews={reviews} />}</ListGroup>
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