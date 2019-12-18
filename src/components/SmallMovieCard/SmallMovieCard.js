import React, { Component } from 'react';
import './SmallMovieCard.scss'
import { Redirect } from 'react-router-dom';

class SmallMovieCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRedirected: false
    }
  }

  redirect = () => {
    this.setState({isRedirected: true})
  }

  render() {
    const { id, img, title, rate } = this.props
    
    const headerStyles = {
      backgroundImage: `url("${img}")`,
      backgroundSize: '100%',
      backgroundPosition: 'center',
      width: '230px',
      height: '300px',
    }

    return (
      (this.state.isRedirected)
        ? <Redirect to={`/movies/${id}`} />
        : <section
          className="small-movie-card"
          onClick={this.redirect}>
          <header style={headerStyles}></header>
          <p className="rate-number">{ rate }</p>
          <div className="title-block">
            <p>{ title }</p>
          </div>
        </section>
    );
  }
}



export default SmallMovieCard;
