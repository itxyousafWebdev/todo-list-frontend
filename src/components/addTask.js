import React, { Component } from "react";
import axios from "axios";


export default class addTask extends Component {
  constructor(props) {
    super(props);

    this.onChangeDiscription = this.onChangeDiscription.bind(this);
    this.onChangeresponsibility = this.onChangeresponsibility.bind(this);
    this.onChangePeriority = this.onChangePeriority.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      discription: "",
      responsibility: "",
      periority: "",
      complete: false,
    };
  }

  onChangeDiscription(e) {
    this.setState({ discription: e.target.value });
  }

  onChangeresponsibility(e) {
    this.setState({ responsibility: e.target.value });
  }

  onChangePeriority(e) {
    this.setState({ periority: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newTask = {
      discription: this.state.discription,
      responsibility: this.state.responsibility,
      periority: this.state.periority,
      complete: this.state.complete,
    };

    axios
      .post("https://todo-list-backend-kayani.herokuapp.com/api/v1/todo/", newTask)
      .then((res) => console.log(res.data))
      .catch(error => {
       if(error){
        let massage = 'Error \n';
        if(newTask.discription === ""){ massage = massage + "Discription is requried.\n" };
        if(newTask.responsibility === ""){ massage = massage + "Responsibility is requried.\n"; };
        if(newTask.periority === ""){ massage = massage + "Periority is requried.\n"; };
        if (error.response.data.massage.code === 11000 ){ massage = massage + "You cannot enter a task with same name Again! "};
        
        alert(massage);
       }
      });

    this.setState({
      discription: "",
      responsibility: "",
      periority: "",
      complete: "",
    });

  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <form onSubmit={this.onSubmit}>
          <div className="from-group">
            <h3> Create New Task </h3>
            <div className="form-group">
              <label htmlFor="Input"> Discription </label>
              <input
                type="text"
                className="form-control"
                id="Input"
                value={this.state.discription}
                onChange={this.onChangeDiscription}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="Input2"> Responsibility </label>
              <input
                type="text"
                className="form-control"
                id="Input2"
                value={this.state.responsibility}
                onChange={this.onChangeresponsibility}
              ></input>
            </div>
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="Low"
                checked={this.state.periority === "Low"}
                onChange={this.onChangePeriority}
              />
              <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="Medium"
                checked={this.state.periority === "Medium"}
                onChange={this.onChangePeriority}
              />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="High"
                checked={this.state.periority === "High"}
                onChange={this.onChangePeriority}
              />
              <label className="form-check-label">High</label>
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Task"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
