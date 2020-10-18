import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

function Task(props) {
  return (
    <tr>
      <td className={props.task.complete ? "completed" : ""} > {props.task.discription} </td>
      <td className={props.task.complete ? "completed" : ""} > {props.task.responsibility} </td>
      <td className={props.task.complete ? "completed" : ""} > {props.task.periority} </td>
      <td className={props.task.complete ? "completed" : ""} > {props.task.complete === true ? "yes" : "no" } </td>
      <td className={props.task.complete ? "completed" : ""} > {props.task.createdAt} </td>
      <td> 
        <Link   style={{ margin: 5 }} className="btn btn-outline-primary btn-sm" to={"/edit/" + props.task._id}> Edit/Delete </Link>
      </td>
    </tr>
  );
}


export default class todolist extends Component {

    constructor(props){
        super(props);
        this.state ={ tasks : []};

        
      setTimeout(() => {const a = 5; this.a=a}, 5000);
    
    }

    listTasks(){
       return this.state.tasks.map((cur, i) => {
         return <Task key={i} task={cur} />
       });
    }

    componentDidMount(){
        axios.get("https://todo-list-backend-kayani.herokuapp.com/api/v1/todo/")
        .then(response => {
                this.setState({ tasks: response.data.data.todoList });
            })
            .catch(function (error) {
                console.log(error);
            })

            

            
    }
    componentDidUpdate(){
      axios.get("https://todo-list-backend-kayani.herokuapp.com/api/v1/todo/")
        .then(response => {
                this.setState({ tasks: response.data.data.todoList });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    
    

    render() {
      if(this.state.tasks.length > 0) {
        
        return (
          <div>
            <table style={{ marginTop: 50 }} className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Discription</th>
                  <th scope="col">Responsibility</th>
                  <th scope="col">Periority</th>
                  <th scope="col">Completed</th>
                  <th scope="col">Created At</th>
                  <th scope="col"> Action </th>
                </tr>
              </thead>
              <tbody>{this.listTasks()}</tbody>
            </table>
          </div>
        );

        
      }
      else {
        if(!this.a){
          return (
            <div
              style={{ marginTop: 50 }}
              className="d-flex justify-content-center"
            >
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          );
        }

        return <h3> No data found </h3>
        
      }

      
    }
}
