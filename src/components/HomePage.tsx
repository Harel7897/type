import { useEffect, useState } from "react";
import CustomDialog from "./CustomDialog";
import './HomePage.css';
import Graph from "react-graph-vis";
import { useGraphContext } from "./GraphContext";
import { useAuthContext } from "./AuthContext";


const HomePage: React.FC = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { setChosenPage } = useAuthContext();
  const {netRef,setNetRef}=useGraphContext();

  const handleOpenDialog = () => {  
    setDialogOpen(true); // פותח את הדיאלוג
  };

  const handleCloseDialog = () => {
    setDialogOpen(false); // סוגר את הדיאלוג
  };

  const handleSubmitDialog = (data: { text: string; color: string }) => {
    console.log("Submitted Data:", data);
    setDialogOpen(false); // סוגר את הדיאלוג אחרי השליחה
  };
 
 
  //אלמנט הגרף הריק

const graphData={
  nodes:[],
  edges:[]
}
const options = {
  layout: {
    hierarchical: false,
  },
  edges: {
    color: "#000000",
    smooth: true,
  },
  nodes: {
    shape: "dot",
    size: 16,
    color: {
      background: "#97C2FC",
      border: "#2B7CE9",
    },
    font: {
      color: "#343434",
    },
  },
  physics: {
    enabled: true,
  },
};
useEffect(()=>{
  if(netRef.current){
    console.log('Graph reference is set:', netRef.current)
  }
} ,[netRef])



  return (
    <div className="Home-Page">

      <h1 className="H1">Welcome to the Home Page</h1>
      <div className="B2-center">
    <button className="ButtonDialog" onClick={handleOpenDialog}>+</button>
    <button className="ButtonDialog" onClick={() => setChosenPage('List')}>Go to List Page</button>
    <button className="ButtonDialog" onClick={() => setChosenPage('Map')}>Go to Map</button>
      </div>
   
      <div>
        <CustomDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmitDialog}
      />
      </div>
      

      <div className="GraphContainer">
        <Graph
        graph={graphData}
        option={options}
        getNetwork={(network:any)=>setNetRef(network)}
        style={{ height: "580px", background: "#f4f7fc", border: "2px solid #007bff" }}
        />
      </div>
    
    </div>
  );
};

export default HomePage;

  
  