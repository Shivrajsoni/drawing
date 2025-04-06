"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard(){

    const[formData,setFormData] = useState({
        roomSlug:"",
    })
    const router = useRouter();
    const token = localStorage.getItem('token');
    
    const submitForm = async(e:React.FormEvent<HTMLFormElement>) =>{
       
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formUrl = form.action;

        try {
            const res = await fetch(formUrl,{
                method:'POST',
                headers:{
                    'authorization':`${token}`,
                    'content-type':'application/json'
                },
                body:JSON.stringify(formData)
            });

            if(!res.ok){
                console.log(`Error in Room Creation Form `);
            }
            router.push('/canvas');            
        } catch (error) {
            console.log(`Error in Room Creation Form Page`,error);
        }


    }
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const fieldname = e.target.name;
        const fieldValue = e.target.value;
        setFormData((prevData)=>({
        ...prevData,
        [fieldname]:fieldValue
         }));
    }

    return <div className="container">
            <h1 >DASHBOARD PAGE</h1>
        {token? <form className="form" action ="http://localhost:3003/create-room" method="POST" onSubmit={submitForm}>
        <div className="form-group">
            <label htmlFor="roomSlug" className="form-label">Enter the Room Name:</label>
            <div className="input-container">
              <input
                id="roomSlug"
                name="roomSlug"
                type="string"
                className="form-input"
                placeholder="kraven-the-hunter"
                onChange={onChange}
              />
            </div>
        </div>
         <button type="submit" className="signup-button">
            Create Room
          </button>
        </form> :<div>First Get Signed In Mother fucker </div>}
    </div>
}