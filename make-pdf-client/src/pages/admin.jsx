import React, { Component } from 'react'
import PdfLists from "../components/pdfLists";
import Axios from "axios";
import TextField from "@material-ui/core/TextField"
import ButtonAppBar from '../components/navBar';
import ButtonPrimary from '../components/button';
import SearchIcon from "@material-ui/icons/Search"

import Grid from '@mui/material/Grid';

export default class Admin extends Component {
    state = {
        query : "",
        deleting : false,
        fetchedData : []
    }
  
    fetchPdf =  async () => {
     
        const res = await Axios({
            url :"/fetch-pdf",
            method : "POST",
            data : {name : this.state.query}
        })
        this.setState({fetchedData: res.data})
  }
  async componentDidMount() {
    await this.fetchPdf();
  }
  deletePdf = async (regNo) => {

    const answer = window.confirm(`Are you sure you want to delete REG NO. ${regNo}`)
    if (!answer){
        return
    }

    this.setState({deleting : true})
    try {
         const deleted = await Axios({
        url : `/delete-pdf/${regNo}`,
        method : "DELETE"
    })
    
    if (deleted.status === 204){
        alert("Delete Successful")
    } else{
        alert("Delete not successful")
    }
    await this.fetchPdf()
 
    
    }catch(e){
        alert("Delete not successful")
    }
   
    this.setState({deleting : false})
  }

   handleChange = (event) => {
        this.setState({ query: event.target.value}); 
    }
  render ()  {

    return (
      <div>
        <ButtonAppBar></ButtonAppBar>
        <br />
        <Grid direction="row" style={{marginLeft : "25%"}}>
            <TextField
            className='MuiGrid-item'
          style={{width : "30vw"}}
          label="Search"
          onChange={this.handleChange}
          placeholder='Abebe Tola'
        >
        
         </TextField>
        <ButtonPrimary 
            className="MuiGrid-item"
            color="default" 
                text="Search" size="large"
                onClick={() => this.fetchPdf()}
                startIcon={<SearchIcon/>}>
        </ButtonPrimary>
        </Grid>
         
        <PdfLists deleting={this.state.deleting} deletepdf={this.deletePdf} dataList={this.state.fetchedData}/>
      </div>
    )
  }
}
