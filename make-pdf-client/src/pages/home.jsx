import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import Axios from "axios";
import FormData from "form-data"
import ButtonPrimary from '../components/button';
import SaveIcon from "@material-ui/icons/Save"
import TextField from '@material-ui/core/TextField';
import { FormControl, FormHelperText, InputLabel, Input } from '@material-ui/core';
import LinearIndeterminate from '../components/circularLoad';
import ButtonAppBar from '../components/navBar';
export default class Home extends Component {

    state = {
    name: "",
    regNo: "",
    department: "",
    id: "",
    phone:"",
    image:undefined,
    loading : false
    }

     handleChange = (event) => {

       if (event.target.name === "name"){
        this.setState({ name: event.target.value}); 
       }
       else if (event.target.name === "regNo"){
        this.setState({ regNo: event.target.value}); 
       }
       else if (event.target.name === "department"){
        this.setState({ department: event.target.value}); 
       }
       else if (event.target.name === "id"){
        this.setState({ id: event.target.value}); 
       }
       else if (event.target.name === "phone"){
        this.setState({ phone: event.target.value}); 
       }
       else if (event.target.name === "image"){
        this.setState({ image: event.target.files[0]}); 
       }
       event.preventDefault();
       

       }

  createAndDownload = async (event) => {
    
    for (const st in this.state){
        
        if (st !== "loading" && !this.state[st]){
            alert("Complete the form to proceed")
            return
        }
    }
    this.setState({loading : true})
    const formdata = new FormData();
    formdata.append("name", this.state.name)
    formdata.append("image" , this.state.image)
    formdata.append("regNo" , this.state.regNo)
    formdata.append("department" , this.state.department)
    formdata.append("id" , this.state.id)
    formdata.append("phone" , this.state.phone)
    try {
        const response = await Axios({
      url : "/create-pdf",
      method : "POST",
      data : formdata
    })
    console.log(response.status)
    if (response.status === 201){
        alert("Submitted Successfully")
    }
    else {
        alert("The form has an error, Please try again!")
    }
    this.setState({loading : false})
    
    }catch(error){
    }
  }


  render() {
    return (
        
      <div >
        <ButtonAppBar></ButtonAppBar>

        <FormControl style={{padding : "10%"}}>
            <TextField
            required
            variant="filled"
            size="large"
            label="Name"
            type="text"
            placeholder='Abebe Tola'
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
            ></TextField>
            <br />
            <TextField
            required
            style={{margin : "2px", width:"75vw"}}
            variant="filled"
            size="large"
            label="REG NO."
            type="text"
            placeholder='000001'
            value={this.state.regNo}
            name="regNo"
            onChange={this.handleChange}
            ></TextField>
            <br />
            <TextField
            required
            variant="filled"
            size="large"
            label="DEPARTMENT"
            type="text"
            placeholder='department name'
            value={this.state.department}
            name="department"
            onChange={this.handleChange}
            ></TextField>
            <br />
            <TextField
            required
            variant="filled"
            size="large"
            label="ID"
            type="text"
            placeholder='000001'
            value={this.state.id}
            name="id"
            onChange={this.handleChange}
            ></TextField>
            <br />
            <TextField
            required
            variant="filled"
            size="large"
            label="PHONE"
            type="text"
            placeholder='0912345678'
            value={this.state.phone}
            name="phone"
            onChange={this.handleChange}
            ></TextField>
             <br />
            <Input required style={{margin : "2px" ,padding:"3px"}} name="image" onChange={this.handleChange} type="file" label="sketch" ></Input>
            <br />
             {!this.state.loading ? <ButtonPrimary startIcon={<SaveIcon></SaveIcon>}
              onClick={this.createAndDownload} color="primary" text="Submit">

              </ButtonPrimary> : <LinearIndeterminate style={{
  margin: "auto",
  width: "50%",
  border: "3px solid green",
  padding: "10px"
}}>
    </LinearIndeterminate>}
        </FormControl>

      </div>
    )
  }
}
