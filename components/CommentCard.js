// import React, { useEffect, useState } from 'react';
import {
  Card, Dropdown, DropdownButton, Image,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaEllipsisV } from 'react-icons/fa';
import Link from 'next/link';
import { deleteComment, getComments } from '../api/comments/commentData';
import { useAuth } from '../utils/context/authContext';

function CommentCard({ obj, onUpdate, setCommentToUpdate }) {
  const { user } = useAuth();

  const deleteThisComment = () => {
    if (window.confirm('Delete this comment?')) {
      getComments(obj.id).then(() => {
        deleteComment(obj.id).then(() => onUpdate());
      });
    }
  };

  const scroll = () => {
    window.scrollTo(1, 0);
  };

  return (
    <Card className="comment-Card">
      <div className="comment-card-top">
        <div className="comment-card-user">
          {obj.uid.id === user.id ? (
            <Link href="/user/profile" passHref>
              <Image className="comment-User-Image" src={obj.uid.image} />
            </Link>
          ) : (
            <Link href={`/user/${obj.uid.id}`} passHref>
              <Image className="comment-User-Image" src={obj.uid.image} />
            </Link>
          )}

          <Card.Text className="comment-card-username">{obj.uid.name}</Card.Text>
        </div>
        <Card.Text className="comment-card-comment">{ obj.content }</Card.Text>
        {user.id === obj.uid.id ? (
          <DropdownButton align="end" variant="secondary" className="comment-drop-down cardDropdown" title={<FaEllipsisV className="droptoggleicon" />}>
            <>
              <Dropdown.Item
                className="drop-Down-Item"
                onClick={() => {
                  setCommentToUpdate(obj); scroll();
                }}
              >Edit
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="drop-Down-Item" onClick={deleteThisComment}>Delete</Dropdown.Item>
            </>
          </DropdownButton>
        ) : ('🙌🏻')}
      </div>
      <Card.Text className="comment-card-date">{ obj.date }</Card.Text>
    </Card>
  );
}

CommentCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    event: PropTypes.string,
    content: PropTypes.string,
    date: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  setCommentToUpdate: PropTypes.func.isRequired,

};

export default CommentCard;
