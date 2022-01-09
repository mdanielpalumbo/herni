import { React, useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { ItemsContext } from '../Context/ItemsContext'
import { FaEdit, FaTrash, FaCheck} from 'react-icons/fa'
export const Items = ({folderId}) => {

    const [loader, setLoader] = useState(false)

    const[values, setValues] = useState({
        task: ""
    })

    const {items, setItems, setEdit, edit, setItem} = useContext(ItemsContext)
    

    const handleInputChange = (e) => {
        setValues({
            values,
            [e.target.name]: e.target.value,
            folder_id: folderId
        })
    }

    const handleChecked = (item) => {
        if(item.checked === "true"){
            axios.put('http://localhost:8080/api/items/' + item.items_id , {checked:"false"})
            .then((res)=> console.log(res))
            .catch(error => console.log(error))
            
        }else{
            axios.put('http://localhost:8080/api/items/' + item.items_id , {checked:"true"})
            .then((res)=> console.log(res))
            .catch(error => console.log(error))       
        }
        const fetch = async () => {
            const res = await axios.get('http://localhost:8080/api/items/' + folderId)
            return await res.data
        }
        fetch().then((data) => setItems(data))
    }

    const handleDelete = (itemId) => {
        let id = itemId
        console.log(id)
        axios.delete('http://localhost:8080/api/items/' + id)
        .then(res => console.log(res))
        const fetch = async (folderId) => {
            const res = await axios.get('http://localhost:8080/api/items/' + folderId)
            return await res.data
        }
        fetch(folderId).then(data => setItems(data))
        setLoader(!loader)
    }

    const handleSubmit = async (e) => {
            e.preventDefault()
            axios.post('http://localhost:8080/api/items' , {task:values.task, folder_id:values.folder_id})
            .then((res)=> console.log(res))
            .catch(error => console.log(error))
            const fetch = async () => {
                const res = await axios.get('http://localhost:8080/api/items/' + folderId)
                return await res.data
            }
            fetch().then((data) => setItems(data))
            e.target.parentElement.firstChild.firstChild.value = ""
            setLoader(!loader)     
    }
    const enterEdit = (item) => {
        setEdit(true)
        setItem(item)
    }

    return (
        <>
            <div className="itemsCont">
            {folderId ?
            <>
                <h3 className="itTitle">What's on your mind?</h3>
                {items.map((item) =>{
                    return(
                        <div className={item.checked === "true" ? "completed task" : "noCompleted task"} key={item.items_id} id={item.items_id}>    
                            <p>   
                                {item.task} 
                            </p>
                            <div className="taskBtns">
                                <button onClick={() => {handleChecked(item)}}><FaCheck className="taskBtn check"/></button>
                                <button onClick={() => {enterEdit(item)}}><FaEdit className="taskBtn edit"/></button>
                                <button onClick={() => {handleDelete(item.items_id)}}><FaTrash className="taskBtn delete"/></button>
                            </div>
                        </div>
                    )
                })}
                    <form className="itInpCont" onSubmit={handleSubmit}>
                        <input className="itInp" onChange={handleInputChange} id="add" name="task" placeholder="Add new task"/>
                        <button className="itAdd" type="submit">Add</button>
                    </form>
                </>
                :
                <h2 className="itTitle"> Select a folder to start</h2>
                }
            </div>
            
        </>
    )
}