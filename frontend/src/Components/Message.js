import React from 'react'
import { Alert } from 'react-bootstrap'
function Message({variant, childern}) {
    return (
        <Alert variant={variant}>
            {childern}
            
        </Alert>  
    )
}

export default Message
