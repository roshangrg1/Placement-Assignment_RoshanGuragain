
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from './component/Icon';
import React ,{ useState } from 'react';

// tostify injection
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// reactstrap
import {Card, CardBody, Container,Button,Col} from 'reactstrap'

import './App.css';




const itemArray= new Array(9).fill("empty")
// console.log(itemArray);


function App() {
  const [isCross, setIsCross] = useState()
  const [winMessage, setWinMessage]= useState("")

  const reloadGame = ()=>{
    setIsCross(false)
    setWinMessage("")
    itemArray.fill("empty", 0 ,9)
  }

  const checkIsWinner= ()=>{
    // first-row
    if ((itemArray[0]===itemArray[1]) && (itemArray[0]===itemArray[2]) && (itemArray[0]!=="empty" )){
      setWinMessage(`${itemArray[0]} wins`)
    }
     // second-row
     else if((itemArray[3]===itemArray[4]) && (itemArray[3]===itemArray[5]) && (itemArray[3]!=="empty" )){
      setWinMessage(`${itemArray[3]} wins`)
    }
     // third-row
     else if((itemArray[6]===itemArray[7]) && (itemArray[6]===itemArray[8]) && (itemArray[6]!=="empty" )){
      setWinMessage(`${itemArray[6]} wins`)
    }
    // first-column
    else if((itemArray[0]===itemArray[3]) && (itemArray[0]===itemArray[6]) && (itemArray[0]!=="empty" )){
      setWinMessage(`${itemArray[0]} wins`)
    }
     // second-column
     else if((itemArray[1]===itemArray[4]) && (itemArray[1]===itemArray[7]) && (itemArray[1]!=="empty" )){
      setWinMessage(`${itemArray[1]} wins`)
    }
    // third-column
   
     else if((itemArray[2]===itemArray[5]) && (itemArray[2]===itemArray[8]) && (itemArray[2]!=="empty" )){
      setWinMessage(`${itemArray[2]} wins`)
    }
    // left-rigth diagonal
    else if((itemArray[0]===itemArray[4]) && (itemArray[0]===itemArray[8])&& (itemArray[0]!=="empty" )){
      setWinMessage(`${itemArray[0]} wins`)
    }
    // right- left diagonal
    else if((itemArray[2]===itemArray[4]) && (itemArray[2]===itemArray[6])&& (itemArray[2]!=="empty" )){
      setWinMessage(`${itemArray[2]} wins`)
    }
   
  }

  const changeItem = itemNumber =>{
    if (winMessage){
      return toast(winMessage, {type:"success"} )
    }
    if (itemArray[itemNumber]=== "empty"){
      itemArray[itemNumber]= isCross ? "cross" : "circle"
      setIsCross(!isCross)
    }
    else{
      return toast("already filled" ,{type:"error"})
    }

    checkIsWinner()
  }

  return (
    <Container className="p-5 ">
      <ToastContainer position="bottom-center"/>
      <Col md={6} className="offset-md-3">
        {winMessage ? (
          <div className="mb-2 mt-2">
            <h1 className="text-success text-uppercase text-center">{winMessage}</h1>
            <Button color="success" block onClick={reloadGame}
            >Reload The Game
            </Button>
           
          </div>
        ) :(
          <h1 className="text-warning text-center">
            {isCross ? "cross":"circle"} turn
          </h1>
        )}
        <div className="grid">
          {itemArray.map((item,index)=>(
            <Card color="warning" onClick={()=>changeItem(index)}>
              <CardBody>
                <Icon name={item} />
              </CardBody>
            </Card>
          ))}
        </div>
      </Col>
      
    </Container >
  );
}

export default App;