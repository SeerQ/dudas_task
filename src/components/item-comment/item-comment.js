import React, {useEffect, useState} from 'react';
import trash from '../../icon/trash.png';
import edit from '../../icon/edit.png';
import imgGen from "@dudadev/random-img";
import './item-comment.css'
import '../add-comments/add-comments.css'


const ItemComment = ({deleteComment, onClickEdit, submitEditComment, indexAtEdit, comment, getPersonByName}) => {

    const [itemComment, setItemComment] = useState(comment.text);
    const [hovered, setHovered] = useState(false)

    const onSubmitEdit = (e) => {
        e.preventDefault();
        submitEditComment(comment.commentId, itemComment);

    }
    const [photoItem, setPhotoItem] = useState('');

    useEffect(() => {
        const personId = getPersonByName(comment.author).photoId
        imgGen({id: personId, gender: personId%2===0 ? 'men' : 'women'})
            .then(avatarUrl => setPhotoItem(avatarUrl))
    })


    return (
        <div className="comment">
            {indexAtEdit === comment.commentId ?
                <form className="comment-form"
                      onSubmit={onSubmitEdit}
                >
                    <input type="text"
                           readOnly
                           className="comment-form-input "
                           placeholder="Your name"
                           value={comment.author}
                    />
                    <textarea className="comment-form-input comment-input "
                              placeholder="Your comment"
                              onChange={(e) => {
                                  setItemComment(e.target.value)
                              }}
                              value={itemComment}
                    />
                    <button
                        disabled={!itemComment}
                        type="submit"
                        className='btn'
                    >Save
                    </button>
                </form>
                :
                <div className= "item-content"
                     onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}>
                    <div className='photo-zone'>
                        <img src={photoItem} alt="face" className="item-img"/>
                    </div>
                    <div className='text-zone'>
                        <div className='text-header'>
                            <div className="item-author-name">{comment.author}</div>
                            <div className={hovered ? "right hovered" : "right"}>
                                <button className="icon-button" disabled={indexAtEdit !== -1} type="button" onClick={() => {
                                    onClickEdit(comment.commentId);
                                }}>
                                    <img src={edit} alt="edit" className="img-btn"/>
                                </button>
                                <button className="icon-button" type="button" onClick={() => deleteComment(comment.commentId)}>
                                    <img src={trash} alt="trash" className="img-btn"

                                    />
                                </button>

                            </div>
                        </div>
                        <div className="text-comment">
                            <div className="item-comment-text ">{itemComment}</div>
                        </div>


                    </div>


                </div>
            }


        </div>
    );
};

export default ItemComment;