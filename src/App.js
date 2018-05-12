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
          <a rel="noopener noreferrer" target="_blank" href="https://github.com/eisenivan/regent-weather-app"><svg height="32" version="1.1" viewBox="0 0 16 16" width="32" style={{fill: 'white'}}><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg></a>
        </header>
        <div className="container">
          <div className="state_form">
            <h2>Change the weather forecast</h2>
            <p>(See if you can get the sunglasses to show up)</p>
            { this.renderStateAsForm(this.state, this.handleChange) }
            <a rel="noopener noreferrer" target="_blank" href="https://github.com/northwesternmutual/regent">Check out Regent on Github</a>
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
