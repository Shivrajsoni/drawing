"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./Dashboard.css";
import { toast } from "sonner";

// There should also be a joining room Functionality 

type ChatType = {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
};

type RoomDataType = {
  id: string;
  slug: string;
  chat?: ChatType[];
};

const Dashboard = () => {
  const [formData, setFormData] = useState({
    roomSlug: "",
  });
  const [rooms, setRooms] = useState<RoomDataType[]>([
    {
      id: "room-1",
      slug: "project-design",
      chat: [
        { id: "1", sender: "John", message: "Hello team!", timestamp: "2025-04-06T10:30:00Z" },
        { id: "2", sender: "Sarah", message: "Hi John, how's progress?", timestamp: "2025-04-06T10:32:00Z" }
      ]
    },
    {
      id: "room-2",
      slug: "marketing-ideas",
      chat: [
        { id: "1", sender: "Mike", message: "Let's discuss the campaign", timestamp: "2025-04-06T11:15:00Z" }
      ]
    },
    {
      id: "room-3",
      slug: "development",
      chat: []
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [token,setToken] = useState<string | null>();
  const router = useRouter();

  useEffect(()=>{
    const storedToken = localStorage.getItem('token');
    if(!storedToken) return;

    setToken(storedToken);
    const fetchData = async() =>{
        const response = await fetch('http://localhost:3003/getUserRooms',{
          method:'GET',
          headers:{
          'authorization':`${storedToken}`,
          'content-type':'application/json'
          }
        });
         // Replace with your API endpoint
        const result = await response.json();
          setRooms(result.rooms);
        }
        console.log(rooms);
        fetchData();
  },[])

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
 
    if (!formData.roomSlug.trim()) {
      setError("Please enter a room name");
      setLoading(false);
      return;
    }
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
      const newRoom = await res.json();
      const roomId = newRoom.roomId;
      setRooms((prevData)=>[...prevData,newRoom]);
      // router.push(`/canvas/${newRoom.roomId}`);   
      
          // Simulate API request
      setTimeout(() => {
      const newRoom = {
        id: roomId,
        slug: formData.roomSlug,
        chat: []
      };
      
      setRooms((prevData) => [...prevData, newRoom]);
      toast.success(`Room "${formData.roomSlug}" created successfully!`);
      setSuccessMessage(`Room "${formData.roomSlug}" created successfully!`);
      setFormData({ roomSlug: "" });
      setError("");
      setLoading(false);
      
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }, 800);

      } catch (error) {
        console.log(`Error in Room Creation Form Page`,error);
      }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldname = e.target.name;
    const fieldValue = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [fieldname]: fieldValue,
    }));
  };

  const enterRoom = (roomId: string) => {
    toast.info(`Entering room ${roomId}`);
    // In a real app, this would navigate to the room page
    // navigate(`/canvas/${roomId}`);
    router.push(`/canvas/${roomId}`);
  };

  const deleteRoom = (roomId: string) => {
    setRooms(rooms.filter(room => room.id !== roomId));
    toast.success("Room deleted successfully");
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="logo-container">
          <div className="logo">
            <span>Rooms</span>
          </div>
        </div>
        <h1>Dashboard</h1>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-panels">
          <div className="create-room-panel">
            <h2>Create New Room</h2>
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            
            <form onSubmit={submitForm} className="create-room-form" action="http://localhost:3003/create-room" method ="POST">
              <div className="form-field">
                <label htmlFor="roomSlug">Room Name:</label>
                <input
                  id="roomSlug"
                  name="roomSlug"
                  type="text"
                  value={formData.roomSlug}
                  placeholder="Enter a unique room name"
                  onChange={handleChange}
                />
              </div>
              <button 
                type="submit" 
                className="create-button"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Room"}
              </button>
            </form>
          </div>

          <div className="rooms-panel">
            <h2>Your Rooms</h2>
            {loading && <div className="loading-spinner"></div>}
            
            {rooms.length === 0 && !loading ? (
              <div className="empty-state">
                <div className="empty-icon"></div>
                <p>You haven't created any rooms yet</p>
              </div>
            ) : (
              <div className="rooms-grid">
                {rooms.map((room) => (
                  <div key={room.id} className="room-card">
                    <h3>{room.slug}</h3>
                    <div className="room-meta">
                      <span className="chat-count">
                        {room.chat?.length || 0} messages
                      </span>
                    </div>
                    <div className="room-actions">
                      <button 
                        onClick={() => enterRoom(room.id)}
                        className="enter-button"
                      >
                        Enter Room
                      </button>
                      <button 
                        onClick={() => deleteRoom(room.id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;