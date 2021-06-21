import { Component } from "react";

import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";

class DishDetail extends Component {
  formatDate = (inputDate) => {
    const date = new Date(inputDate);

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(date);
  };

  renderDish = (dish) => {
    return (
      <Card>
        <CardBody>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardTitle className="mt-2">{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  };

  renderComments = (comments) => {
    if (!comments || comments.length === 0) return <div></div>;

    return (
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.comment}</p>
              <p>
                -- {comment.author}, {this.formatDate(comment.date)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  render() {
    if (!this.props.dish) return <div></div>;

    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {this.renderDish(this.props.dish)}
        </div>

        <div className="col-12 col-md-5 m-1">
          {this.renderComments(this.props.dish.comments)}
        </div>
      </div>
    );
  }
}

export { DishDetail };
