import { LinkContainer } from "react-router-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import ListGroup from "react-bootstrap/ListGroup";

export default function renderReviewsList({reviews}) {
  let options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

  debugger;
  return (
    <>
      <LinkContainer to="/new">
        <ListGroup.Item action className="py-3 text-nowrap text-truncate">
          <BsPencilSquare size={17} />
          <span className="ml-2 font-weight-bold add-review">Write a new review</span>
        </ListGroup.Item>
      </LinkContainer>
      {
        reviews.sort((a,b) => b.updatedAt - a.updatedAt).map(({ reviewId, contentTitle, createdAt, rating }) => (
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