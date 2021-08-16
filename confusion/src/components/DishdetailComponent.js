import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

import { CommentForm } from "./CommentFormComponent";

import { Loading } from "./LoadingComponent";

import { baseUrl } from "../shared/baseUrl";

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
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardTitle className="mt-2">{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments({ comments, addComment, dishId }) {
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
      <CommentForm dishId={dishId} addComment={addComment} />
    </div>
  );
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments
              comments={props.comments}
              addComment={props.addComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    );
};

export { DishDetail };
