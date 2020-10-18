import React, { Component } from 'react'
import axios from 'axios';

export default class editTask extends Component {
  constructor(props) {
    super(props);

    this.onChangeDiscription = this.onChangeDiscription.bind(this);
    this.onChangeresponsibility = this.onChangeresponsibility.bind(this);
    this.onChangePeriority = this.onChangePeriority.bind(this);
    this.onChangeComplete = this.onChangeComplete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

    this.state = {
      discription: "",
      responsibility: "",
      periority: "",
      complete: false,
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://todo-list-backend-kayani.herokuapp.com/api/v1/todo/" +
          this.props.match.params.id
      )
      .then((res) => {
        this.setState({
          discription: res.data.data.task.discription,
          responsibility: res.data.data.task.responsibility,
          periority: res.data.data.task.periority,
          complete: res.data.data.task.complete,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteTask(){
      axios
        .delete(
          `https://todo-list-backend-kayani.herokuapp.com/api/v1/todo/${this.props.match.params.id}`
        )
        .then((res) => console.log(res.data))
        .catch((error) => {
          console.log(error);
        });
        this.props.history.push("/");
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

  onChangeComplete(e) {
    this.setState({ complete: !this.state.complete });
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
      .patch(
        `https://todo-list-backend-kayani.herokuapp.com/api/v1/todo/${this.props.match.params.id}`,
        newTask
      )
      .then((res) => console.log(res.data))
      .catch((error) => {
        //    if(error){
        //     let massage = '';
        //     if(newTask.discription === ""){ massage = massage + "Discription is requried.\n" };
        //     if(newTask.responsibility === ""){ massage = massage + "Responsibility is requried.\n"; };
        //     if(newTask.periority === ""){ massage = massage + "Periority is requried.\n"; };
        //     alert(massage);
        //    }
        console.log(error);
      });

    this.props.history.push("/");
  }


  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <form onSubmit={this.onSubmit}>
          <div className="from-group">
            <h3> Edit Task </h3>
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
                checked={this.state.periority}
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
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="completedCheckbox"
                name="completedCheckbox"
                onChange={this.onChangeComplete}
                checked={this.state.complete}
                value={this.state.complete}
              ></input>
              <label className="form-check-label" htmlFor="completedCheckbox">
                Completed
              </label>
            </div>
          </div>
          <div className="form-group">
            <input
              style={{ margin: 5 }}
              type="submit"
              value="Update Task"
              className="btn btn-primary"
            />
          </div>
        </form>
        <button
          onClick={this.deleteTask}
          style={{ margin: 5 }}
          className="btn btn-danger"
        >
          Delete Task 
        </button>
      </div>
    );
  }
}
