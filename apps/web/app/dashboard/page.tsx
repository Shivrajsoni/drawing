// "use client";

// // ideally we should fetch chats per demand for user of following room 

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// type ChatType = {
//     id: string;
//     sender: string;
//     message: string;
//     timestamp: string; // or Date
// };
// type roomDatatype = {
//     id: string,
//     slug: string,
//     chat?: ChatType[]
// }

// export default function Dashboard(){

//     const[formData,setFormData] = useState({
//         roomSlug:"",
//     })
//     const [token,setToken] = useState<string | null>(null);
//     const [rooms,setRooms] = useState<roomDatatype[]>([]);

//     const router = useRouter();

//     useEffect(()=>{
//         const storedToken = localStorage.getItem('token');
//         if (!storedToken) return;
//         setToken(storedToken);
//         // function for fetching roomData
//         const fetchData = async() =>{
//             const response = await fetch('http://localhost:3003/getUserRooms',{
//                 method:'GET',
//                 headers:{
//                     'authorization':`${storedToken}`,
//                     'content-type':'application/json'
//                 }
//             }); // Replace with your API endpoint
//             const result = await response.json();
//             setRooms(result.rooms);

//         }
//         console.log(rooms);
//         fetchData();
//     },[])
    
//     const submitForm = async(e:React.FormEvent<HTMLFormElement>) =>{
       
//         e.preventDefault();
//         const form = e.target as HTMLFormElement;
//         const formUrl = form.action;

//         try {
//             const res = await fetch(formUrl,{
//                 method:'POST',
//                 headers:{
//                     'authorization':`${token}`,
//                     'content-type':'application/json'
//                 },
//                 body:JSON.stringify(formData)
//             });

//             if(!res.ok){
//                 console.log(`Error in Room Creation Form `);
//             }
//             const newRoom = await res.json();

//             setRooms((prevData)=>[...prevData,newRoom]);
//            // router.push('/canvas');            
//         } catch (error) {
//             console.log(`Error in Room Creation Form Page`,error);
//         }


//     }
//     const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
//         const fieldname = e.target.name;
//         const fieldValue = e.target.value;
//         setFormData((prevData)=>({
//         ...prevData,
//         [fieldname]:fieldValue
//          }));
//     }



//     return <div className="container">
//             <h1 >DASHBOARD PAGE</h1>
//         {token? <form className="form" action ="http://localhost:3003/create-room" method="POST" onSubmit={submitForm}>
//         <div className="form-group">
//             <label htmlFor="roomSlug" className="form-label">Enter the Room Name:</label>
//             <div className="input-container">
//               <input
//                 id="roomSlug"
//                 name="roomSlug"
//                 type="string"
//                 className="form-input"
//                 placeholder="kraven-the-hunter"
//                 onChange={onChange}
//               />
//             </div>
//         </div>
//          <button type="submit" className="signup-button">
//             Create Room
//           </button>
//         </form> :<div>First Get Signed In Mother fucker </div>}

//         {rooms && rooms.length > 0 && (
//             <div >
//               <h2>Your Rooms</h2>
//               {rooms.map((room) => (
//                 <div key={room.id} >
//                   <h3>{room.slug}</h3>
//                   <p>{room.chat?.length} chats</p>
//                   <button onClick={() => router.push(`/canvas/${room.id}`)}>
//                     Enter Room
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//     </div>
// }
import DashboardComponent from "../components/Dashboard/dashboard"
export default function Dashboard(){
    return <DashboardComponent/>
}