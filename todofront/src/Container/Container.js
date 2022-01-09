import React, { useState, useEffect, useContext } from 'react'
import { Folders } from '../Folders/Folders'
import axios from 'axios'
import { ItemsContext } from '../Context/ItemsContext'

export const Container = () => {

    return (
        <div className="body">
            <Folders/>
        </div>
    )
}