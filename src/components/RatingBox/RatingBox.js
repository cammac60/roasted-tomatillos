import React, { Component } from 'react';
import './RatingBox.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cancelIcon from '../../assets/images/cancel.svg';
import { postRating } from '../../apiCalls/apiCalls'
import { addRating } from '../../actions'

export class RatingBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    }
  }

  toggleClicked = () => {
    this.setState({isClicked: !this.state.isClicked})
  }

  chooseRating = async (event) => {
    const {movie_id, addRating} = this.props
    const rating = parseInt(event.target.getAttribute('id').replace('number', ''));
    const ratingFull = {
      movie_id,
      rating
    }
    await postRating(ratingFull, this.props.user_id);
    addRating(ratingFull);
  }

  render() {
    const numbers = new Array(10)
      .fill(undefined)
      .map((el, i) => (
        <p
          key={`number${i+1}`}
          className="rate-number"
          onClick={this.chooseRating}
          id={`number${i+1}`}>{i+1}</p>
      ));

    return (
      (!this.state.isClicked)
        ? <button className="add-rating" onClick={this.toggleClicked}>add rating</button>
        : (
          <section className="rating-box">
            <h3>Choose rating</h3>
            <div>
              {numbers}
              <img onClick={this.toggleClicked} src={cancelIcon} alt="cancel"/>
            </div>
          </section>
        )
    )
  }
}

export const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addRating
  }, dispatch)
)

export default connect(null, mapDispatchToProps)(RatingBox);
