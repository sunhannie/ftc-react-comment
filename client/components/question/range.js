import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import throttle from 'lodash/throttle';
import questionCss from './question.scss';
class Range extends Component {
  constructor(props) {
    super(props);
    const min = this.props; // eslint-disable-line
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: props.max / 2,
      rangeDisabled: false,
      submitDisabled: true,
      width: null,
      increment: null,
      rangeProgress: 50,
      rangeOverlayPosition: null,
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleResize = this.handleResize.bind(this);

    
  }

  componentDidMount() {
    const component = this;

    this.handleResize();

    function setInitialValue() {
      const value = Math.floor(component.state.rangeProgress * (component.props.max / 100));

      component.setState({ value });
    }

    setInitialValue();
// Throttle的存在是为了回答"在某段时间内一个函数需要被怎样执行"这个问题。throttle经常用来更好地控制事件。通常的事件，在一个标准时间内只执行一次，标准时间，一次，这些都是固定的，而throttle可以控制自定义的时间段内执行的次数。
    window.addEventListener('resize', throttle(this.handleResize, 750));
  }

  handleChange(value) { 
    const inputValue = parseInt(value, 10);
    const number = isNaN(inputValue) ? this.props.max / 2 : inputValue;
    const rangeProgress = Math.round(100 / (this.props.max / number));
    const increment = (this.state.width - this.props.thumbSize) / 100;
    const rangeOverlayPosition = (rangeProgress * increment) - 1;

    this.setState({
      value: number,
      submitDisabled: false,
      rangeProgress,
      rangeOverlayPosition,
    });
  }
  handleResize() {
    const width = this.rangeInput.offsetWidth;
    const increment = (width - this.props.thumbSize) / 100;
    const rangeOverlayPosition = (this.state.rangeProgress * increment) - 1;
    // console.log('rangeOverlayPosition');
    this.setState({
      width,
      rangeOverlayPosition,
    });
  }

  render() {
    const {props} = this.props;
    const rangeMin = this.props.min;
    const rangeMax = this.props.max;
    // console.log(React.PropTypes);
    return (

        <div  className="input-section">
          <form onSubmit={event => {
            this.setState({ disabled: true });
            this.props.onSubmit(event, this.state.value);
            this.submitButton.style.opacity = 0;
            this.rangeInput.classList.add('hidden');
            this.rangeLabels.classList.add('hidden');
            this.output.classList.add('hidden');
          }}>
            <div className="input-value" ref={node => { this.rangeLabels = node; }}>
              <div className="left-value">{rangeMin}</div>
              <div className="right-value">{rangeMax}</div>
            </div>
            <input ref={node => { this.rangeInput = node; }} type="range" step={this.props.step} min={rangeMin} max={rangeMax} value={this.state.value} onChange={event => this.handleChange(event.target.value)}/>
            <output ref={node => { this.output = node; }} style={{ left: this.state.rangeOverlayPosition }}>{this.state.value}</output>


            <div className="look-answer">
                <input
                ref={node => { this.submitButton = node; }}
                type="submit"
                value="看答案"
                disabled={this.state.submitDisabled}
                className="o-buttons o-buttons--big o-buttons--standout"
            />
            </div>

          </form>

          
          {/*点击看答案，没有动作触发，仅仅是样式触发*/}
          <div className="spacer" > </div>
        </div>
      
   

    );
  }
}

Range.propTypes = {

  onSubmit: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  thumbSize: PropTypes.number,

};


export default Range;
