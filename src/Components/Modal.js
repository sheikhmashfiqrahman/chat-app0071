import {useState} from 'react'
import React from 'react';
import '../Styles/modal.css';

/**
 * Modal component for rendering the dialogue box for creating a conversation
 * @param {*} param0 
 * @returns 
 */

const Modal = ({formFn, show, props}) => {

    // initializing state varaibles for the conversation title and recipient 
    const [title, setTitle] =useState("");
    const [participantName, setParticipantName] =useState("");
    const [participantNameList,setParticipantList]=useState([]);


    // if the view is not visible
    if(!show){
        return null
    }

    // for handling the input value in the dialogue box of (create conversation)
    const handleTitleName= (event) => {
        event.preventDefault()
        console.log(event.target.value)
        setTitle(event.target.value)
        
    }

    const handleParticipant= (event) => {
        event.preventDefault()
        console.log(event.target.value)
        
        setParticipantName(event.target.value)
        // console.log("participant name",participantName)
        // participantNameList.push(participantName)
        // console.log("list",participantNameList)
        // setParticipantList(participantNameList)
    }

    // form handler when create conversation is cliccked
    const formHandler=(event)=>{
        event.preventDefault();
        // pass the title and recipients name as parameters for the form function
        formFn(title,participantName)
        // formFn(title,participantNameList)
        
        setTitle('Write Title')
        
        setParticipantName('Write recipients name here')

    }




    // rendering the modal box for creating the conversation using formhandler, handletitle name, handleParticipant name
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Create Conversation</h4>
                </div>
                <div className="modal-body">
                    <form onSubmit={formHandler}>
                        <div>
                            <span>Conversation Name</span>
                            <input value ={title}
                            onChange={ handleTitleName}/>
                            <span />
                        </div>
                        < div>
                            <span>Enter username of Participants</span>
                            <input value ={participantName}
                            onChange={handleParticipant}/>
                            <span />
                        </div>
                        <div className="modal-footer">
                            <button className="button" type="submit">
                                Create Conversation
                            </button>
                            <button onClick={props} className="button" type="submit">
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal