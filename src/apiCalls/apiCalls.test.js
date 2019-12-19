import { getMovies } from './apiCalls'

describe('getMovies', () => {
  let mockMoviesData =
     [
      {
        id: 1,
        title: "Jumanji: The Next Level",
        poster_path: 'https://some.url/poster-image',
        backdrop_path: 'https://some.url/bg-image',
        release_date: '2019-12-04',
        overview: 'In Jumanji: The Next Level, the gang is back but the game has changed.',
        average_rating: 4
      }
    ]

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve(mockMoviesData)
        }
      })
    })
  })

  it('should be passed down the correct URL', () => {
    getMovies()
    expect(window.fetch).toHaveBeenCalledWith('https://rancid-tomatillos.herokuapp.com/api/v1/movies')
  })

  it('should return an array the correct values types', () => {
    expect(getMovies()).resolves.toEqual(mockMoviesData)
  })

  it('should return an error for response that is not ok', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    })

    expect(getMovies()).rejects
      .toEqual(Error("There was an error getting movies."))
  })

  it('should return an error if fetch is rejected', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('Failed to fetch'))
    })

    expect(getMovies()).rejects
      .toEqual(Error('Failed to fetch'))
  })
})
