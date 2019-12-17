import React, { Component } from 'react'
import './MoviesContainer.scss'
import { getMovies } from '../../apiCalls/apiCalls'
import SmallMovieCard from '../../components/SmallMovieCard/SmallMovieCard'

class MoviesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false
    }
  }

  componentDidMount() {
    (this.props.movies)
      ? this.fetchMoviesData()
      : this.setState({isLoaded: true})
  }

  fetchMoviesData = () => {
    return getMovies()
      .then(result => this.addMoviesToStore(result.movies))
      .then(() => this.setState({isLoaded: true}))
      .catch(error => this.setState({error: error}))
  }

  render() {
    return (
      <main className="container">
      </main>
    )
  }
}

