import React, { useEffect, useState, useContext } from 'react'
import { ItemsContext } from '../Context/ItemsContext'
import axios from 'axios'


export const Edit = (folderId) => {

    const {item, items, setItems, setEdit, edit} = useContext(ItemsContext)

    const[values, setValues] = useState({
        task: ""
    })

    const handleInputChange = (e) => {
        setValues({
            values,
            [e.target.name]: e.target.value,
            folder_id: folderId
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:8080/api/items/' + item.items_id , {task:values.task})
        .then((res)=> console.log(res))
        .catch(error => console.log(error))
        const fetch = async () => {
            const res = await axios.get('http://localhost:8080/api/items/' + item.folder_id)
            return await res.data
        }
        fetch().then((data) => setItems(data))
        e.target.parentElement.firstChild.firstChild.value = ""
        setEdit(false)
    }

    const cancelEdit = (e) => {
        e.preventDefault()
        setEdit(false)
    }
    

    return (
        <div className="itemsCont">
            <h2 className="editTitle">Editing task: {item.task}</h2>
            <div> 
                <form className="itInpCont" onSubmit={handleSubmit}>
                    <input className="itInp" onChange={handleInputChange} id="add" name="task" placeholder="Change the task"/>
                    <button className="editBtn" type="submit">Edit</button>
                    <button className="editBtn" onClick={cancelEdit}>Cancel</button>
                </form>
            </div>
        </div>
    )
}