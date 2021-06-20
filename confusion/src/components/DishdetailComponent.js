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

  renderComments = (comments) => {
    if (!comments || comments.length === 0) return <div></div>;

    return (
      <div>
        <h4>Comments</h4>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.comment}</p>
            <p>
              -- {comment.author}, {this.formatDate(comment.date)}
            </p>
          </div>
        ))}
      </div>
    );
  };

  render() {
    if (!this.props.dish) return <div></div>;

    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardBody>
              <CardImg
                width="100%"
                src={this.props.dish.image}
                alt={this.props.dish.name}
              />
              <CardTitle className="mt-2">{this.props.dish.name}</CardTitle>
              <CardText>{this.props.dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
        <div className="col-12 col-md-5 m-1">
          {this.renderComments(this.props.dish.comments)}
        </div>
      </div>
    );
  }
}

export { DishDetail };
