"use client"

import React, { useState } from 'react'
import { storage, db } from '@/app/firebase'
import { v4 } from 'uuid'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { addDoc, collection, getDocs } from 'firebase/firestore'


type Developer = {}

const UploadButton = (props: Developer) => {
const [info, setInfo] = useState("")
const [thumbnail, setThumbnail] = useState("")
const [developerData, setDeveloperData] = useState([])]

const uploadImage = (e: any) => {
  console.log(e.target.files[0])
  const thumbnails = ref(storage, `thumbnail/s${v4()}`)
  uploadBytes(thumbnails, e.target.files[0]).then(data => {
    console.log(data, "thumbnails")
    getDownloadURL(data.ref).then(val => {
      setThumbnail(val)
    })
  })
}

const upload = async () => {
const projects = collection(db, "developersInfo")
await addDoc(projects, {textVal: info, thumnailsUrl:thumbnail })
 alert("data added successfully")
}

const getData = async () => {
  const project = collection(db, "developersInfo")
  const datadb = await getDocs(project)
  const allInfo = datadb.docs.map(val => ({...val.data(), id:val.id}))
  
}
  return (
    <div>
      <input onChange={(e) => setInfo(e.target.value)}/> <br/>
      <input type="file" onChange={(e) => uploadImage(e) }/>
      <button onClick={upload}>Upload</button>
    </div>
  )
}

export default UploadButton