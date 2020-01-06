import React, { Component } from 'react';
import './SmallMovieCard.scss'
import { Redirect } from 'react-router-dom';
import deleteIcon from '../../assets/images/delete.svg';

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
    const { id, img, title, rate, deleteButton } = this.props

    const headerStyles = {
      backgroundImage: `url("${img}")`,
      backgroundSize: '100%',
      backgroundPosition: 'center',
      width: '230px',
      height: '300px'
    }

    return (
      (this.state.isRedirected)
        ? <Redirect to={`/movies/${id}`} />
        : <section className="small-movie-card">
          <header style={headerStyles}>
            {deleteButton && <img src={deleteIcon} alt="delete icon" />}
          </header>
          <p className="rate-number">{ rate }</p>
          <div className="title-block">
            <p className="title" onClick={this.redirect}>{ title }</p>
          </div>
        </section>
    );
  }
}

export default SmallMovieCard;
