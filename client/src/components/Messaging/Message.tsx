import axios from 'axios';
import delete_button from '../../assets/delete_button.svg';

interface Props {
    _id: string;
    author: string;
    author_image: string;
    title: string;
    content: string;
}

function Message( { _id, author, author_image, title, content } : Props ) {

    const delete_message = async () => {
        await axios.post('http://localhost:3001/delete_message', { _id: _id });
    }

    return (

        <div className = 'message_container relative flex flex-col justify-start items-center px-2 pb-1 pt-3 mb-8'>
            <div className = 'message_item relative w-full h-auto flex flex-row justify-start items-center'>
                <img src = {author_image} alt = 'Author' className = 'relative w-14 h-14 rounded-full ml-2 object-cover'/>
                <p className = 'text-base text-justify ml-2'>{author}</p>
            </div>
            <div className = 'message_item relative w-full h-auto flex flex-row justify-start items-center'>
                <p className = 'text-lg text-justify ml-4 mr-4 bold'>{title}</p>
                {
                    (author === localStorage.getItem('username')) && (
                        <div className = 'relative w-8 h-8 ml-auto flex justify-center items-center -translate-x-4 bg-red-600 rounded-full' onClick = {delete_message}>
                            <img src = {delete_button} alt = 'Delete' className = 'message_delete_button relative object-cover w-4 brightness-200 m-auto cursor-pointer'/>
                        </div>
                    )
                }
            </div>
            <div className = 'message_item relative w-full h-auto flex justify-start items-start'>
                <p className = 'ml-4 text-justify mr-4 mb-3'>{content}</p>
            </div>
        </div>

    )

}

export default Message;