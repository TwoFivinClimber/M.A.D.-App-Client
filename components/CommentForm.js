/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { updateComment, createComment } from '../api/comments/commentData';

const initialState = {
  content: '',
};

// eslint-disable-next-line react/prop-types
function CommentForm({ obj, id, onUpdate }) {
  const [input, setInput] = useState(initialState);
  const [comment, setComment] = useState();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment?.id) {
      updateComment(input)
        .then(() => {
          setComment({});
          setInput(initialState);
          onUpdate();
        });
    } else {
      const commentObj = {
        ...input, user: user.id, event: Number(id),
      };
      console.warn(commentObj);
      createComment(commentObj).then(() => {
        setInput(initialState);
        onUpdate();
      });
    }
  };

  useEffect(() => {
    if (obj.id) {
      setComment(obj);
      setInput(obj);
    } else {
      setComment({});
      setInput(initialState);
    }
  }, [obj, user.id]);

  return (
    <>
      {user.uid ? (

        <Form className="comment-form" onSubmit={handleSubmit}>
          <div className="comment-form-image-div">
            <img src={user.image} alt={user?.name} className="comment-form-user-image" />
          </div>
          <Form.Control
            className="comment-form-input"
            as="textarea"
            placeholder="Add a comment..."
            name="content"
            value={input.content}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="secondary" className="comment-form-button">Submit</Button>
        </Form>
      ) : (
        <div>
          <h5>Sign in to add comments</h5>
        </div>
      )}
    </>

  );
}

CommentForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
  }),
  onUpdate: PropTypes.func.isRequired,
};

CommentForm.defaultProps = {
  obj: initialState,
};

export default CommentForm;
