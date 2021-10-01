import React, { useState, useEffect } from 'react';
import {Form, Button, Tabs, Table, Accordion} from 'react-bootstrap';
import axios from 'axios'
import './Calculator.css';

function Calculator() {
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

     let convertData = await axios.post('/json', scvdata).then((res) => {
          console.log(res, "res")
          setFileData(res.data.data)
          setLastGMV(res.data.lgmv)
          setCurrGMV(res.data.cgmv)
          setCurrentCB(res.data.current)
          setLastCB(res.data.last)
          setView(true)
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
       <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Last Month</Accordion.Header>
          <Accordion.Body>
            <p>Total Last Month GMV is- {lastGMV} ,<br/> Total CB Earn - {lastCB.earn} , Total Cb Burn - {lastCB.burn} ,<br/> Total Spend(Earn+Burn) - {lastCB.total} , Spend Aginst GMV(%) - {parseFloat(parseInt(lastCB.total)/parseInt(lastGMV)*100).toFixed(2)}%</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Current Month</Accordion.Header>
          <Accordion.Body>
            Total Last Month GMV is- {currGMV} ,<br/> Total CB Earn - {currentCB.earn} , Total Cb Burn - {currentCB.burn} ,<br/> Total Spend(Earn+Burn) - {currentCB.total} , Spend Aginst GMV(%) - {parseFloat(parseInt(currentCB.total)/parseInt(currGMV)*100).toFixed(2)}%
          </Accordion.Body>
        </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>Difference Last to Current</Accordion.Header>
        <Accordion.Body>
          Last Month GMV = {parseInt(lastGMV)}<br/>
          Current Month GMV = {parseInt(currGMV)}<br/>
          Difference: {parseInt(currGMV)-parseInt(lastGMV)} , ( {parseFloat((parseInt(currGMV)-parseInt(lastGMV))/parseInt(lastGMV)*100).toFixed(2)}% )<br/>
          Last to Current CB (Earn+Burn) Spend (last-current) : {parseInt(currentCB.total)} - {parseInt(lastCB.total)} = {parseInt(currentCB.total)-parseInt(lastCB.total)} , ( {parseFloat((parseInt(currentCB.total)-parseInt(lastCB.total))/parseInt(lastCB.total)*100).toFixed(2)}% )<br/>

        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Projection</Accordion.Header>
        <Accordion.Body>
          Last to Current GMV Stats (%): {parseFloat((parseInt(currGMV)-parseInt(lastGMV))/parseInt(lastGMV)*100).toFixed(2)}%<b/>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
       <br/>
       {view===true?
         (
           <div>
           <Table striped bordered hover className="table table-fixed">
                   <thead >
                       <tr>
                       <th>#</th>
                       <th>Alias</th>
                       <th>Last Txn</th>
                       <th>Current Txn</th>
                       <th>Txn Diff</th>
                       <th>users</th>
                       <th>Last GMV</th>
                       <th>Current GMV</th>
                       <th>GMV Diff</th>
                       <th>Earn-CB</th>
                       <th>Burn-CB</th>
                       <th>Comb-CB</th>
                       <th>spend %</th>
                       </tr>
                   </thead>
                   <tbody>

                      {fileData.map((item, key)=>
                          (
                           <tr>
                               <td>{key+1}</td>
                               <td>{item['ALIAS']}</td>
                               <td>{item['LMTD-TxnCnt']}</td>
                               <td>{item['MTD-TxnCount']}  </td>
                               <td>{parseFloat(((parseInt(item['MTD-TxnCount'])-parseInt(item['LMTD-TxnCnt']))/parseInt(item['LMTD-TxnCnt']))*100).toFixed(2)}%</td>
                               <td>{item['MTD-Users']}</td>
                               <td>{item['LMTD-GMV']}</td>
                               <td>{item['MTD-GMV']}</td>
                               <td>{parseFloat(((parseInt(item['MTD-GMV'])-parseInt(item['LMTD-GMV']))/parseInt(item['LMTD-GMV']))*100).toFixed(2)}%</td>
                               <td>{item['MTD-CBEarn']}</td>
                               <td>{item['MTD-SCBurn']}</td>
                               <td>{parseInt(item['MTD-CBEarn'])+parseInt(item['MTD-SCBurn'])}</td>
                               <td>{parseFloat(parseInt(item['MTD-CBEarn'])/parseInt(item['MTD-GMV'])*100).toFixed(2)}</td>
                              </tr>
                          )
                      )}

                   </tbody>
                   </Table>
                   </div>




         )


         :null}




     </div>
   )

}

export default Calculator;
