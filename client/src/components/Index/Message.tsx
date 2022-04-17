interface Props {
    title: string;
    content: string;
    author: string;
}

function Message( { title, content, author } : Props ) {

    return (

        <div className = 'message_container relative bg-gray-900'>
            <div className = 'relative w-full h-1/3 flex justify-start items-center bg-teal-400'>
                {title}
            </div>
            <div className = 'relative w-full h-2/3 flex justify-start items-center bg-amber-300'>
                {content}
            </div>
        </div>

    )

}

export default Message;