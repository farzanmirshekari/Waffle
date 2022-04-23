interface Props {
    author: string;
    author_image: string;
    title: string;
    content: string;
}

function Message( { author, author_image, title, content } : Props ) {

    return (

        <div className = 'message_container relative flex flex-col justify-start items-center px-2 pb-1 pt-3 mb-8'>
            <div className = 'message_item relative w-full h-auto flex flex-row justify-start items-center'>
                <img src = {author_image} alt = 'Author' className = 'relative w-14 h-14 rounded-full ml-2 object-cover '/>
                <p className = 'text-base text-justify ml-2'>{author}</p>
            </div>
            <div className = 'message_item relative w-full h-auto flex justify-start items-center'>
                <p className = 'text-lg text-justify ml-4 mr-4 bold'>{title}</p>
            </div>
            <div className = 'message_item relative w-full h-auto flex justify-start items-start'>
                <p className = 'ml-4 text-justify mr-4 mb-3'>{content}</p>
            </div>
        </div>

    )

}

export default Message;