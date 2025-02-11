import React, { useEffect, useState } from "react";
import { useGraphContext } from "./GraphContext";
import { useAuthContext } from "./AuthContext";
import CustomDialog from "./CustomDialog";
import './ListPage.css'
 

const ListPage: React.FC=()=>{
    

  const { setChosenPage } = useAuthContext();
  const { nodes, addNode } = useGraphContext(); 
  const[openDialog , setopenDialog]=useState(false);
       
        
  const handleopenDialog=()=>{ 
        setopenDialog(true);
    }
    
  const handleCloseDialog = () => {
    setopenDialog(false); 
  };

  const handleSubmitDialog = (data: { text: string; color: string }) => {
    console.log("Submitted Data:", data);
    addNode(data.text, data.text, data.color);
    setopenDialog(false);
  };
 
   



    return(
        <div className="ListPage">
            <h1 className="TitelList">list of nodes</h1>
            <CustomDialog 
             onClose={handleCloseDialog}
             onSubmit={handleSubmitDialog}
            isOpen={openDialog}/>
            
            <div className="B3-center">
               <button className="Buttons" onClick={() => setChosenPage('Home')}>Go to home</button>
               <button className="Buttons" onClick={handleopenDialog}>+</button>
            </div>

            <ul className="List">
        {nodes.length === 0 ? (
          <li>No nodes to display</li>  
        ) : (
          nodes.map((node) => (
            <li key={node.id}>
              <strong>{node.label}</strong> - {node.color}
            </li>
          ))
        )}
      </ul>
            
        </div>
    )
}
export default ListPage;
