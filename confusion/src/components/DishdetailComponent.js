import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";

const formatDate = (inputDate) => {
  const date = new Date(inputDate);

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
};

function RenderDish({ dish }) {
  return (
    <Card>
      <CardBody>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardTitle className="mt-2">{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments({ comments }) {
  if (!comments || comments.length === 0) return <div></div>;

  return (
    <div>
      <h4>Comments</h4>
      <ul className="list-unstyled">
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>
              -- {comment.author}, {formatDate(comment.date)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const DishDetail = (props) => {
  if (!props.dish) return <div></div>;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>

        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={props.dish.comments} />
        </div>
      </div>
    </div>
  );
};

export { DishDetail };
