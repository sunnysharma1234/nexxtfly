"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function AddTopic() {
    const [formData,setFormData] = useState({
      title:"",
      description:""

    })
    // const [description , setDescription] = useState("")

    const router = useRouter()

     
    let handleInputChange = (e)=>{
      setFormData((currData)=>{
        return{...currData,[e.target.name]:e.target.value}
      })
    }


    const handleSubmit= async (e)=>{
        e.preventDefault()





        if(!formData.title || !formData.description){
            alert("Title and description required")
            return
        }

        try{

            const res = await fetch("http://localhost:3000/api/topics",{
                method:"POST",
                 headers:{
                    "Content-type":"application/json",
                },
                body:JSON.stringify(formData),
                // console.log(res)
            })
            // console.log(res)
            if(res.ok){
                
                router.push('/')
                router.refresh()
            }else{
                throw new Error("Failed to create a topic");
                
            }
        }catch(error){
            console.log(error)
        }
    }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        onChange={handleInputChange}
        value={formData.title}
        name="title"
        className="border border-slate-500 px-8 py-2"
        placeholder="Topic Title"
        
      />

      <input
        type="text"
        onChange={handleInputChange}
        value={formData.description}
        className="border border-slate-500 px-8 py-2"
        placeholder="Topic Description"
        name="description"
      />

      <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Add Topic
      </button>
    </form>
  );
}
