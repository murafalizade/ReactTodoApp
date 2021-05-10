import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import './App.css';
import uuidv from "uuidv4";
import Lists from "./component/lists";
import SunIcon from "./component/icons/sun";
import MoonIcon from "./component/icons/moon";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      todos: [],
      isVisible: false,
      mode: [{
        name: "dark",
        icon: <MoonIcon />
      }
      ]
    }
  }



  addTodo = (e) => {
    let todoList = this.state.todos;
    const unique = uuidv();
    if (this.state.task !== "") {
      const todos = {
        id: unique,
        todo: this.state.task
      }
      todoList = todoList.filter(j => j.todo !== todos.todo);
      todoList.push(todos);
      this.setState({ todos: todoList });
    }

    this.setState({ task: "" });
    e.preventDefault();
  }


  deletedTodo(id) {
    let todoList = this.state.todos;
    todoList = todoList.filter(i => i.id !== id);
    this.setState({ todos: todoList });

  }

  changeMode() {
    let toggle = this.state.mode;
    if (toggle[0].name === "dark") {
      const mode = {
        name: "light",
        icon: <SunIcon />
      }
      toggle.pop();
      toggle.push(mode);
      this.setState({ mode: toggle });
      let main = document.getElementById("root");
      main.style.filter = "invert(1)";
      main.style.backgroundColor = "#ededed";
    }
    else {
      const mode = {
        name: "dark",
        icon: <MoonIcon />
      }
      toggle.pop();
      toggle.push(mode);
      this.setState({ mode: toggle });
      let main = document.getElementById("root");
      main.style.filter = "invert(0)";
      main.style.backgroundColor = "#ffff";
    }
  }

  componentDidUpdate() {
    const todos = JSON.stringify(this.state.todos);
    localStorage.setItem("todos", todos);
    sessionStorage.setItem("mode",this.state.mode[0].name)
  }



  componentDidMount() {
    const newTodos = JSON.parse(localStorage.getItem("todos"));
    if (newTodos !== null) {
      this.setState({ todos: newTodos });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="Form" >
          <form className="form" onSubmit={this.addTodo}>
            <button onClick={this.changeMode.bind(this)} className="btn toggle btn-outline-dark">
              <span>
                {this.state.mode[0].icon}
              </span>

            </button>
            <input className="mb-5" onChange={(e) => { this.setState({ task: e.target.value }) }} value={this.state.task} placeholder="Write any to do" />
            <button>
              Add
            </button>
          </form>
        </div>
        <div className="List" style={this.state.isVisible ? { overflow: "auto" } : { overflow: "hidden" }}>
          <Lists delete={this.deletedTodo.bind(this)} data={this.state.todos} />
        </div>
        <button
          style={this.state.todos.length > 2 ? { display: "block" } : { display: "none" }}
          onClick={() => {
            if (this.state.isVisible === true) {
              this.setState({ isVisible: false });
            }
            else {
              this.setState({ isVisible: true });

            }
          }}
          id="showed">Show more</button>
      </React.Fragment>
    );
  }
}


export default App;
