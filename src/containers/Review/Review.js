import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { BsFillStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { onError } from "../../libs/errorLib";

export default function Review() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    function loadReview() {
      return API.get("reviews", `/reviews/${id}`)
    }
  
    async function onLoad() {
      try {
        const review = await loadReview();
        const { description, rating, title } = review;
        console.log('HERRE');
        setTitle(title);
        setDescription(description);
        setRating(rating);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
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

  return (
    <div className="Review">
      <h1>{title}</h1>
      <br />
      <div>{rating}</div>
      <div>
        {renderStars()}
      </div>
      <br />
      <div>{description}</div>
    </div>
  );
};