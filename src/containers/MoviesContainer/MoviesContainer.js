import React, { Component } from 'react'
import './MoviesContainer.scss'
import SmallMovieCard from '../../components/SmallMovieCard/SmallMovieCard'

class MoviesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false
    }
  }

  render() {
    return (
      <main className="container">
      </main>
    )
  }
}

