import React, { useState, useEffect } from 'react';
import {Form, Button, Tabs, Table, Accordion} from 'react-bootstrap';
import axios from 'axios'
import './Calculator.css';

function QuaterCalculator() {
  const [csvData, setCsvData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState([])
  const [view, setView] = useState(false)
  const [lastGMV, setLastGMV] = useState("")
  const [currGMV, setCurrGMV] = useState("")
  const [currentCB, setCurrentCB] = useState({})
  const [lastCB, setLastCB] = useState({})

   let csvUpload = async(e)=>{
     e.preventDefault()

     const scvdata = new FormData();
    scvdata.append("file", csvData)

     let convertData = await axios.post('/quater/json', scvdata).then((res) => {
          console.log(res, "res")
          setFileData(res.data.data)
          setLastGMV(res.data.lgmv)
          setCurrGMV(res.data.cgmv)
          setCurrentCB(res.data.current)
          setLastCB(res.data.last)
          //setView(true)
          alert('File Successfully uploaded')
      })
      .catch((error) => {
      });


   }

   return (

     <div>
       <Form>
       <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Default file input example</Form.Label>
          <Form.Control type="file" onChange={(e)=>{setCsvData(e.target.files[0]);
                            setFileName(e.target.files[0].name);}}/>
        </Form.Group>
         <Button variant="dark" onClick={csvUpload} type="submit">Upload</Button>
         <br/>
         <span>{fileName}</span>
         <br/>
       </Form>
       <br/>
      


     </div>
   )

}

export default QuaterCalculator;
