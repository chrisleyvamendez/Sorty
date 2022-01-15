
// icons
import Play from "@material-ui/icons/PlayCircleFilledRounded";
import Forwards from "@material-ui/icons/SkipNextRounded";
import Backward from "@material-ui/icons/SkipPreviousRounded";
import RotateLeft from "@material-ui/icons/RotateLeft";
import Github from "@material-ui/icons/GitHub"

// components
import { Component, setState } from "react";
import BubbleSort from "./algorithms/BubbleSort";
import Header from './components/Header';
import React from "react";
import Bar from "./components/Bar.js";
import SelectionSort from "./algorithms/SelectionSort.js";

//stylesheets
import "./App.scss";

/*
notes:
props: similair to function parameter, props are passed on inside of the program
states: are managed within the component, the state is what changes, and this is what influences the program
similiar to variablles declared inside a function.

this.props & this.state represent rendered values in react.js
calls that are made to this.state are async,  they do not reflect the new values


*/
class App extends Component {


  state = {
    array: [],    // initalize the array
    arraySteps: [],
    colorKey: [],
    colorSteps: [],
    currentStep: 0,
    count: 10,    // # bars
    delay: 50,   // delay of bars
    algorithm: "Bubble Sort",// algorithm to sort
    timeouts: [],
  };
  /*
  creates an instance of blankey which is equal to the default color(red/not sorted)
  */
  clearColorKey = () => {
    //blankkey == new array filled with the color key red
    let blankkey = new Array(this.state.count).fill(0);
    // 
    this.setState( {
      colorKey: blankkey,
      colorSteps: [blankkey],
    });
  };

  // property Algo lists possible sorting algorithms and their function calls
  ALGO = {
    "Bubble Sort": BubbleSort,
  };

  /**
   * hook that gets invoked right after a react component has been mounted (after the first render() lifecycle)
   */
  componentDidMount() {
    // Runs after the first render() lifecycle
    this.generateRandomArray();
  }

  
  generateSteps = () => {
    let array = this.state.array.slice();
    let steps = this.state.arraySteps.slice();
    let colorSteps = this.state.colorSteps.slice();

    this.ALGO[this.state.algorithm](array, 0, steps, colorSteps);

    this.setState({
      arraySteps: steps,
      colorSteps: colorSteps,
    });
  };

  clearTimeouts = () => {
    this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.setState({
      timeouts: [],
    })
  }

  generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  // generates a random array using the random int values
  generateRandomArray = () => {
    this.clearTimeouts();
    this.clearColorKey();
    const count = this.state.count;
    const temp = [];
    // generate the random values
    for (let i = 0; i < count; i++) {
      // push the randomly generated values into temp new array
      temp.push(this.generateRandomNumber(50, 200));
    }
    // console log the array
    console.log(temp);
    /*
    set state schedules an update to a component's state obj when state changes, the component is
    going to re-render
    */
    this.setState(
      {
        array: temp,
        arraySteps: [temp],
        currentStep: 0,
      },
      () => {
        this.generateSteps();
      }
    );
  };

  // change the array value
  changeArray = (index, value) => {
    let arr = this.state.array;
    arr[index] = value;
    this.state(
      {
        array: arr,
        arraySteps: [arr],
        currentStep: 0,
      },
      () => {
        this.generateSteps();
      }
    );
  };

  start = () => {
    this.setState({
      disabled: true,
    })

    let steps = this.state.arraySteps;
    let colorSteps = this.state.colorSteps;

    this.clearTimeouts();

    let timeouts = []; let i = 0;
    
    while(i<steps.length - this.state.currentStep) {
      let timeout = setTimeout(() => {
        let currentStep = this.state.currentStep;
        this.setState({
          array: steps[currentStep],
          colorKey: colorSteps[currentStep],
          currentStep: currentStep +1,
        });
        timeouts.push(timeout)
      }, this.state.delay * i);
      i++;
    }
    this.setState({
      timeouts: timeouts
    })
  };

  render() {
    let bars = this.state.array.map((value, index) => (
      <Bar
        key={index} // individual key of the value
        index={index} // index of the array
        length={value} // length of the array/ and bar
        color={this.state.colorKey[index]} // color of the Bar object
        changeArray={this.changeArray} // change array functionality
      />
    ));

    // instantiate the play button component
    let playButton;

    /**
     * conditional statement to check if the current step in the algorithm is equal to last step
     * (this would indicate the algorithm is finished sorting the elements)
     * once complete, transition the play button into a rerun button
     * else, if algorithm is not complete, have the 'play button' display
     */
    if (this.state.arraySteps.length === this.state.currentStep) {
      playButton = (
        //generates a random array on click
        <button className="controller" onClick={this.generateRandomArray} >
          <RotateLeft />
        </button>
      );
    } else {
      playButton = (
        <button className="controller" onClick={this.start}>
          <Play />
        </button>
      );
    }

    return (
      <div className="app">
        <div className="Header-container">
          <Header/>
        </div>
        <div className="frame">
          <div className="barsDiv container card">{bars}</div>
          <div className="control-panel">
            <div className="control-buttons">
              <button className="controller">
                <Backward />
              </button>
              {playButton}
              <button className="controller">
                <Forwards />
              </button>
            </div>
          </div>
          <div className="panel"></div>
        </div>
      </div>
    );
  }
}
export default App;
