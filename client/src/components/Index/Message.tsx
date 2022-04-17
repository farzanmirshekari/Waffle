interface Props {
    title: string;
    content: string;
    author: string;
}

function Message( { title, content, author } : Props ) {

    return (

        <div className = 'relative w-1/2 h-1/6 bg-gray-900'>
            <div>
                
            </div>
        </div>

    )

}

export default Message;