// "use client"
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import {HiPencilAlt} from "react-icons/hi"
import moment from "moment";

const getTopics = async()=>{ 
    try{
        const res = await fetch(`http://localhost:3000/api/topics`,{
            cache:"no-store"
        })
        if(!res.ok){
            throw new Error("Failed to fetch topics")
        }

        return res.json()

    }catch(error){
console.log("error loading topics:",error)
    }
}

export default async function TopicsList(){


   



    const {topics}= await getTopics() 

   



    return(
        <>
        {topics.map((t)=>(
        <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start" >
            <div>
                <h2 className="font-bold text-2xl" >{t.title}</h2>
                <div  >{t.description}</div>
                {/* <time className="font-bold  ">
            {t?.createdAt.format("MMMM DO YYYY")}
          </time> */}
          {/* <div className="font-bold">
            {moment().format("MMMM DO YYYY,h:mm:s a")}
          </div> */}
          <p>{new Date(t?.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex gap-2" >
                <RemoveBtn id={t._id} ></RemoveBtn>
                <Link href={`/editTopic/${t._id}`} >
                <HiPencilAlt size={24} ></HiPencilAlt>
                </Link>
            </div>
        </div>
        ))}
       
        </>
    )
}