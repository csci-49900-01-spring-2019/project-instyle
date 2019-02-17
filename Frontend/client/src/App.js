//Frontend/client/src/App.js
import React, { Component } from "react";

class App extends Component {
    state = {
        data: null
    };

    componentDidMount() {
        // Call our fetch function below once the component mounts
        this.callBackendAPI()
            .then(res => this.setState({ data: res.express }))
            .catch(err => console.log(err));
    }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/backend');
        const body = await response.json();

         if (response.status !== 200) {
             throw Error(body.message)
         }
        return body;
    };
    render() {
        return (
            <div>
                <p>Connecting to the Express Server</p>
                <p>{this.state.data}</p>
            </div>
        );
    }
}

export default App;