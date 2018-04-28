import React, { Component } from 'react';
import { filterImages } from './clothing-logic'
import _ from 'lodash'
import Highlight from 'react-syntax-highlight'
import './App.css'
import { explain } from 'regent'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: 78,
      temp_min: 70,
      precipitation_chance: 51,
      wind_speed: 8,
      weather: 'Cloudy'
    };

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: !_.isNaN(event.target.valueAsNumber) ? event.target.valueAsNumber : event.target.value })
  }

  renderStateAsForm(state, handleChange) {
    return Object.keys(state).map(field => (
      <div key={field}>
        <label htmlFor={field}>{field}</label>
        <input type={typeof state[field] === 'number' ? 'number' : 'text'} value={state[field]} name={field} onChange={e => handleChange(e)} />
      </div>
    ))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Regent Weather App</h1>
        </header>
        <div className="container">
          <div className="state_form">
            <h2>Change the weather forecast</h2>
            <p>(See if you can get the sunglasses to show up)</p>
            { this.renderStateAsForm(this.state, this.handleChange) }
          </div>

          <div>
            { filterImages(this.state).map(img => (
              <div key={img.src}>
                <img alt={img.src} src={img.src} />
                <pre>
                  {explain(img.rule, this.state)}
                </pre>
              </div>
            )) }

            <hr />

            <h2>rules.js</h2>
            <Highlight lang="javascript" value={`import { or, not, and } from 'regent'

export const coldEnoughForCoatRightNow = { left: '@temp', fn: 'lessThan', right: 65 }
export const coldEnoughForCoatInFuture = { left: '@temp_min', fn: 'lessThan', right: 65 }
export const highChanceOfRain = { left: '@precipitation_chance', fn: 'greaterThan', right: 50 }
export const windy = { left: '@wind_speed', fn: 'greaterThan', right: 12 }
export const notWindy = not(windy)
export const cloudy = { left: ['Partly Cloudy', 'Cloudy'], fn: 'includes', right: '@weather' }

export const shouldWearACoat = or(coldEnoughForCoatInFuture, coldEnoughForCoatRightNow, highChanceOfRain)
export const shouldBringAnUmbrella = and(highChanceOfRain, notWindy)
export const shouldBringSunglasses = not(cloudy)`} />

            <h2>clothing-logic.js</h2>
            <Highlight lang="javascript" value={`import { shouldWearACoat, shouldBringSunglasses, shouldBringAnUmbrella } from "./rules";
import _ from 'lodash'
import { filter } from 'regent'

const images = [
  { src: '.../coat.jpg', rule: shouldWearACoat },
  { src: '.../hat.jpg', rule: shouldBringSunglasses },
  { src: '.../umbrella.jpg', rule: shouldBringAnUmbrella },
]

export const filterImages = _.curry(filter)(images)

export default images
            `} />
          </div>

        </div>
      </div>
    );
  }
}

export default App
