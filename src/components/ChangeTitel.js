import React from 'react'
import { useDispatch } from 'react-redux'

const ChangeTitle = () => {

    const dispatch = useDispatch()

    const changeAboutTitle = () => {
        dispatch({
            type: 'CHANGE_ABOUT_TITLE'
        })
    }

    return (
        <button onClick={changeAboutTitle}>change about title</button>
    )
}

export default ChangeTitle