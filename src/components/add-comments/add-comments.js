import React, {useState} from 'react';
import './add-comments.css'

const AddComments = (props) => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');

    const onSubmitAdd = (e) => {
        e.preventDefault();
        props.addComment(name, comment);
        resetForm();
    }


    const resetForm = () => {
        setName('');
        setComment('');
    }

    return (
        <form className="comment-form"
              onSubmit={onSubmitAdd}

        >
            <input type="text"
                   className="comment-form-input "
                   placeholder="Your name"
                   onChange={(e) => setName(e.target.value)}
                   value={name}
            />
            <textarea
                   className="comment-form-input comment-input "
                   placeholder="Your comment"
                   onChange={(e) => {
                       setComment(e.target.value)
                   }}
                   value={comment}
            />
            <button
                disabled={!name || !comment}
                type="submit"
                className='btn'
            >Add
            </button>
        </form>
    );
};

export default AddComments;