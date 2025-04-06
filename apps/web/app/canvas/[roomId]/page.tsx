export default async function CanvasPage({params}:{
    params:{
        roomId:string
    }
}){
    const roomId = (await params).roomId;
    return <div>
        <h1>Canvas Page</h1>
        <h2>`room Id :${roomId}`</h2>
    </div>
}