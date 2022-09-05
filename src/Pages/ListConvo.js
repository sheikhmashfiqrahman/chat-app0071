import React from "react";


// not used 
const Convo = ({convo}) => {

    const getConversationId = (event, key, title) => {
        event.preventDefault();
        console.log("conversation key", key);
        console.log("title", title);

    }
    
    const convoList = convo !== undefined && convo.map((c, i)=> {
        return (
            <li onClick={event => getConversationId(event, c.id, c.title)} key={i}>{c.title}</li>
        )
    })

    return (
        <ul>
            {convoList}
        </ul>

    )

}

export default Convo