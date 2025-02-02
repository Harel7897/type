import React, { useEffect, useState } from "react";
import { useGraphContext } from "./GraphContext";
import { useAuthContext } from "./AuthContext";
import CustomDialog from "./CustomDialog";
import './ListPage.css'


const ListPage: React.FC=()=>{
    

  const { setChosenPage } = useAuthContext();
  const {netRef}=useGraphContext()
  const [nodes,setnodes]=useState<any[]>([])
  const[openDialog,setopenDialog]=useState(false);
       
        
  const handleopenDialog=()=>{
        setopenDialog(true);
    }
    
  const handleCloseDialog = () => {
    setopenDialog(false); // סוגר את הדיאלוג
  };

  const handleSubmitDialog = (data: { text: string; color: string }) => {
    console.log("Submitted Data:", data);
    setopenDialog(false); // סוגר את הדיאלוג אחרי השליחה
  };
  useEffect(() => {
    if (netRef.current) {
      console.log("Network reference is available");
      const network = netRef.current;
      const data = network.body.data;
      // שליפת הצמתים מהגרף
      const nodeList = Array.from(data.nodes.get());  // שליפה של כל הצמתים
      setnodes(nodeList);
    }
  }, [netRef]); 
   
   



    return(
        <div>
            <h1>list of nodes</h1>
            <button onClick={handleopenDialog}>+</button>
            <CustomDialog 
             onClose={handleCloseDialog}
             onSubmit={handleSubmitDialog}
            isOpen={openDialog}/>
            
            <div className="B3-center">
               <button onClick={() => setChosenPage('Home')}>Go to home</button>
            </div>

             <ul>
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
