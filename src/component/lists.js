import React, { Component } from 'react';

class Lists extends Component {
    deleted(id) {
        this.props.delete(id);
    }

    checked(id) {
        const identity = id + "a";
        const check = document.getElementById(identity).checked;
        let text = document.getElementById(id);
        if (check === true) {
            text.style.textDecorationLine = "line-through";
        }
        else {
            text.style.textDecorationLine = "none";
        }
    }

    render() {
        const { data } = this.props;
        return (
            <ul>
                {
                    data.map(dos => (
                        <li key={dos.id}>
                            <input id={dos.id + "a"}
                                type="checkbox"
                                onClick={this.checked.bind(this, dos.id)}
                                style={{ width: "25px", height: "25px", cursor: "pointer" }} />
                            <p id={dos.id}>{dos.todo}</p>
                            <button onClick={this.deleted.bind(this, dos.id)}>Delete</button>
                        </li>
                    ))
                }
            </ul>
        );
    }
}

export default Lists;