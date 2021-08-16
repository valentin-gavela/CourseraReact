/* eslint-disable react/jsx-pascal-case */
import React, { Component } from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormGroup,
} from "reactstrap";

import { Control, LocalForm, Errors } from "react-redux-form";

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }

  render() {
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => val && val.length >= len;

    return (
      <>
        <Button onClick={this.toggleModal}>Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <FormGroup>
                <Label htmlFor="rating">Rating</Label>
                <Control.select
                  model=".rating"
                  id="rating"
                  className="form-control"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Control.select>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="author">Your Name</Label>
                <Control.text
                  model=".author"
                  id="author"
                  name="author"
                  placeholder="Your Name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea
                  rows={6}
                  model=".comment"
                  id="comment"
                  name="comment"
                  placeholder="Comment"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".comment"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Button
                  type="submit"
                  outline
                  color="secondary"
                  onClick={this.toggleModal}
                >
                  <span className="fa fa-pencil"></span> Submit Comments
                </Button>
              </FormGroup>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export { CommentForm };
