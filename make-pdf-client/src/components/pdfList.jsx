import React, { Component } from "react";
import Axios from "axios";
import fileDownload from "js-file-download"

export default class PdfList extends Component {
  raisedBox = {
    padding: 10,
    color: "blue",
    border: "8px solid #eeeeee",
    boxShadow: [
      "-5px 5px #eeeeee",
      "-5px 5px #eeeeee",
      "-5px 5px #eeeeee",
      "-5px 5px #eeeeee",
      "-5px 5px #eeeeee"
    ]
  };
  downloadPdf = async (form) => {
    const pdf = await Axios({
      url: "/download-pdf",
      method: "GET",
      data: form,
      headers: {
        "Content-Type": "application/pdf"
      }
    });
    fileDownload(pdf.data, `${form.name}.pdf`)

    
  };
  render() {
    return (
      <div style={this.raisedBox}>
        <span>Name : {this.props.form.name} </span>
        <span>RegNo : {this.props.form.regNo} </span>
        <span>image : {this.props.form.image} </span>
        <span>
          {" "}
          <button
            onClick={() => {
              this.downloadPdf(this.props.form);
            }}
          >
            download
          </button>
        </span>
        <span>
          <button> delete</button>
        </span>
      </div>
    );
  }
}
