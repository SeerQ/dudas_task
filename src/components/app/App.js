import React, {useEffect, useState} from 'react';
import ListItemsComments from "../list-items-comments";
import ErrorBoundary from "../error-boundary";
import ls from 'localstorage-slim'


const App = () => {

        const [personObj, setPersonObj] = useState(ls.get('persons') || {})
        const [comments, setComments] = useState(ls.get('comments') || {})
        const [indexAtEdit, setIndexAtEdit] = useState(-1)
        const [photoId, setPhotoId] = useState(ls.get('photoId') || 1);
        const [commentOrderId, setCommentOrderId] = useState(ls.get('commentOrderId') || 0);


        useEffect(() => {
            updateStorage()
        }, [personObj, comments])

        const updateStorage = () => {
            ls.set('persons', personObj);
            ls.set('comments', comments);
            ls.set('photoId', photoId);
            ls.set('commentOrderId', commentOrderId);

        }


        const addComment = (name, comment) => {
            const person = personObj[name];
            if (!person) {
                const updObj = {...personObj, [name]: {name: name, photoId: photoId}};
                setPhotoId(photoId + 1)
                setPersonObj(updObj);
            }
            setComments({...comments, [commentOrderId]: {commentId: commentOrderId, text: comment, author: name}})
            setCommentOrderId(commentOrderId + 1)
        }

        const getPersonByName = (name) => {
            return personObj[name];
        }

        const submitEditComment = (id, updatedText) => {
            console.log(id, updatedText);
            const initialComment = comments[id]
            console.log(initialComment)
            setComments({...comments, [id]: {...initialComment, text: updatedText}})
            setIndexAtEdit(-1)
        }

        const onClickEdit = (id) => {
            setIndexAtEdit(id)

        }

        const deleteComment = (id) => {
            const updatedComments = {...comments}
            delete updatedComments[id];
            setComments({...updatedComments})
        }


        return (
            <ErrorBoundary>
                <ListItemsComments deleteComment={deleteComment} onClickEdit={onClickEdit}
                                   submitEditComment={submitEditComment} addComment={addComment}
                                   indexAtEdit={indexAtEdit} comments={comments} getPersonByName={getPersonByName}/>
            </ErrorBoundary>
        );
    }
;

export default App;