import { useState, useRef } from 'react'

import React from 'react';
import '../Styles/modal.css';

/**
 * 
 * @param {*} param0 
 * 
 * Implemented same steps from Modal components
 * @returns after clicking the messages a dialogue modal box pops up 
 */

const MessageModal = ({ deleteFn, reactionFn, messageShow, messageId, props }) => {
    // if modal is not shown
    if (!messageShow) {
        return null
    }
    // for adding reaction to messages upoon event trigger
    const reactionHandler = (event, param) => {
        console.log("param", param)
        event.preventDefault();
        reactionFn(param, messageId)
    }
    // for deleting user specified meessages upon event trigger
    const deleteHandler = (event) => {
        event.preventDefault();
        deleteFn(messageId)
    }
    // rendering message modal box with delete handler, reaction handler as props 
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Message Options</h4>
                </div>
                <div className="modal-body">
                    <div value={true} onClick={event => reactionHandler(event, true)} className="thumb-up"><i className="fa fa-thumbs-up fa-2x" /> Like</div>

                    <div value={false} onClick={event => reactionHandler(event, false)}  className="thumb-down"><i className="fa fa-thumbs-down fa-2x" />Dislike</div>

                    <div onClick={deleteHandler} className="trash"><i className="fa fa-trash fa-2x" /> Delete</div>
                    <div > <button onClick={props} className="button" type="submit"> Close  </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageModal