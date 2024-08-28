"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function EditTopicForm({id,title,description}){

    const [newFormData,setNewFormData] = useState({
        newTitle:title,
        newDescription:description,
    })
    // const [newDescription,setNewDescription] = useState(description)


    const router = useRouter()
    let handleInputChange = (e)=>{
        // console.log(e.target.value)
        setNewFormData((currData)=>{
          return{...currData,[e.target.name]:e.target.value}
        })
      }

    const handleSubmit= async(e)=>{
        e.preventDefault()

        try{
            const res = await fetch(`http://localhost:3000/api/topics/${id}`,{
                method:"PUT",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(newFormData)
            })
            // console.log(res)
            if(!res.ok){
                throw new Error("Failed to update topic ")
            }else{
               
                router.push("/")
                router.refresh()
            }
            
        }catch(error){
            console.log(error)
        }

    }


    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" onChange={handleInputChange} value={newFormData.newTitle} name="newTitle" className="border border-slate-500 px-8 py-2" placeholder="Topic Title" />

        <input type="text" onChange={handleInputChange} value={newFormData.newDescription} name="newDescription" className="border border-slate-500 px-8 py-2" placeholder="Topic Description" />

        <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit" >Update Topic</button>

    </form>
    )
}
