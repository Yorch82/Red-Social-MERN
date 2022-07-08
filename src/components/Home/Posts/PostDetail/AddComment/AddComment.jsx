import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addComment }from '../../../../../features/posts/postsSlice'


const AddComment = ({postId}) => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        setFormData((pre) => ({...pre, postId}))
        
    }, []);

    const [formData, setFormData] = useState({
        postId:'',
        content:''
    })

    const { comment } = formData;

    const onChange = (e) => {
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(addComment(formData))
    }

    return (
        <>
            <h3>Add a comment...</h3>
            <div>
                <form onSubmit={onSubmit}>
                    <input type="text" name="content" value={comment} onChange={onChange} />
                        <button type="submit">Send comment</button>
                </form>
            </div>
        </>
    )
}

export default AddComment;