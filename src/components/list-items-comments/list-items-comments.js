import React from 'react';
import AddComments from "../add-comments";
import './list-items-comments.css'
import ItemComment from "../item-comment";

const ListItemsComments = ({deleteComment, onClickEdit, submitEditComment, addComment, indexAtEdit, comments, getPersonByName}) => {


    const comment = Object.keys(comments).map((commentId) => {
        return (
            <ItemComment id={commentId} key={commentId} comment={comments[commentId]} deleteComment={deleteComment} onClickEdit={onClickEdit}
                         submitEditComment={submitEditComment} indexAtEdit={indexAtEdit} getPersonByName={getPersonByName}
            />
        )
    });

    return (
        <div className="list-items">
            <h2>Reviews</h2>
            {comment}
            {indexAtEdit === -1 ? <AddComments addComment={addComment}/> : <></>}
        </div>
    );
};

export default ListItemsComments;