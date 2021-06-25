import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { BsFillStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { useParams, Link } from "react-router-dom";
import { onError } from "../../libs/errorLib";

export default function Review() {
  const { id } = useParams();
  const [contentTitle, setContentTitle] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadReview() {
      return API.get("reviews", `/reviews/${id}`)
    }
  
    async function onLoad() {
      try {
        setLoading(false);
        const data = await loadReview();
        const { review, content } = data;

        setContentTitle(review.contentTitle);
        setDescription(review.description);
        setRating(review.rating);
        setPoster(content.poster);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
    setLoading(false);
  }, [id]);

  function renderStars() {
    const final = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      final.push(<BsFillStarFill />);
    }

    if (rating % 1 !== 0) {
      final.push(<BsStarHalf />);
    }

    for (let i = Math.ceil(rating); i < 10; i++) {
      final.push(<BsStar />);
    }

    return(final);
  }

  return loading ? <div /> : (
    <div className="Review">
      <img src={poster} />
      <h1>{contentTitle}</h1>
      <br />
      <div>{rating}</div>
      <div>
        {renderStars()}
      </div>
      <br />
      <div>{description}</div>
      <Link to={`/reviews/edit/${id}`}>Edit</Link>
    </div>
  );
};