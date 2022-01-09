import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { Items } from '../Items/Items'
import { ItemsContext } from '../Context/ItemsContext'
import { Edit } from '../Edit/Edit'

export const Folders = () => {

    const [folders, setFolders] = useState([])
    const [folderId, setFolderId] = useState(null)
    const [loader, setLoader] = useState(false)
    const[values, setValues] = useState({
        name: ""
    })

    const {items, setItems, edit} = useContext(ItemsContext)

    const fetchFoldersData = async () => {
        const res = await axios.get('http://localhost:8080/api/folders')
        return await res.data
    }

    const fetchHandler = (e) => {
        let id = e.target.id
        setFolderId(id)
        const fetch = async (id) => {
            const res = await axios.get('http://localhost:8080/api/items/' + id)
            return await res.data
        }
        fetch(id).then(data => setItems(data))
    }

    const handleInputChange = (e) => {
        setValues({
            values,
            [e.target.name]: e.target.value
        })
    }

    const handleDelete = (e) => {
        let id = e.target.id
        axios.delete('http://localhost:8080/api/folders/' + id)
        .then(res => console.log(res))
        fetchFoldersData().then(data => setFolders(data))
        setLoader(!loader)
        if(folderId === id){
            setFolderId(null)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/api/folders' , {name:values.name})
        .then((res)=> console.log(res))
        .catch(error => console.log(error))
        const fetch = async () => {
            const res = await axios.get('http://localhost:8080/api/folders')
            return await res.data
        }
        fetch().then((data) => setFolders(data))
        e.target.parentElement.firstChild.firstChild.value = ""
        setLoader(!loader)
    }

    useEffect(() => {
        fetchFoldersData().then(data => setFolders(data))
    },[items, loader, edit])
     
    return (
        <>  
            <div className="foldersCont">
            <h2 className="folTitle">To Do Folders</h2>
                <div className="folList">
                    {folders.map((folder)=>{
                        return (
                            <div className="folder" key={folder.folder_id} >
                                <button className="folBtn" id={folder.folder_id} onClick={fetchHandler}>{folder.name}</button>
                                <button className="folBtn" id={folder.folder_id} onClick={handleDelete}>Delete</button>
                            </div>
                        )
                    })}
                </div>
                <div className="folInp">
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleInputChange} id="add" name="name" placeholder="Add new folder"/>
                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
            {edit ? <Edit folderId={folderId}/> : <Items folderId={folderId}/>}
            
        </>
    )
}