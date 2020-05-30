import React from "react";
import ReactDOM from "react-dom";
import{Container} from 'react-bootstrap'

import {Provider} from 'react-redux'
import reducer from './redux/reducer'
import {createStore} from 'redux'

import 'bootstrap/dist/css/bootstrap.min.css';

import "./styles.css";
import QuizContainer from "./components/QuizContainer";

const store = createStore(reducer)

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Container>
            <QuizContainer />
        </Container>
      </div>
    </Provider>
    
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
