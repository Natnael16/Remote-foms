import React, { Component } from "react";
import ReactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import Axios from "axios";
import FormData from "form-data"

class App extends Component {
  state = {
    name: "",
    regNo: 0,
    department: "",
    id: 0,
    phone:"",
    image:undefined
  };
 
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

    
    const formdata = new FormData();
    formdata.append("name", this.state.name)
    formdata.append("image" , this.state.image)
    formdata.append("regNo" , this.state.regNo)
    formdata.append("department" , this.state.department)
    formdata.append("id" , this.state.id)
    formdata.append("phone" , this.state.phone)

    const response = await Axios({
      url : "/create-pdf",
      method : "POST",
      data : formdata
    })
    console.log(response)
    
    
  }

  fetchPdf =  async () => {
    const res = await Axios.get("/fetch-pdf")
    console.log(res.data)

  }

  render() {
    return (
      <div>
     <form enctype="multipart/form-data" onSubmit={this.createAndDownload}>
        <label>
          Name 
          <input type="text" name="name"  value={this.state.name} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
          REG NO. 
          <input type="text" name="regNo" value={this.state.regNo} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
          DEPARTMENT
          <input type="text" name="department" value={this.state.department} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
          ID 
          <input type="text" name="id" value={this.state.id} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
          PHONE
          <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
          SKETCH
          <input type="file" name="image" onChange={this.handleChange} />
          </label>
          <br/>
        <input type="submit" value="Submit" />
      </form>
      <button onClick={this.fetchPdf}>Fetch</button>
      
      </div>
      
    );
  }
}

export default App;

ReactDom.render(<App />, document.getElementById("root"));
