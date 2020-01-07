import { getMovies, getRatings, postRating, postSignIn } from './apiCalls'

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

describe("postRating", () => {
  let mockOptions
  const mockRating = {
    id: 2,
    user_id: 2,
    movie_id: 2,
    rating: 7,
    created_at: "2019-12-16",
    updated_at: "2019-12-16"
  }

  beforeEach(() => {
    mockOptions = {
      method: 'POST',
      body: JSON.stringify(mockRating),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRating)
      })
    })
  })

  it("should call fetch with correct url and options", () => {
    postRating(mockRating, 2)

    expect(window.fetch).toHaveBeenCalledWith('https://rancid-tomatillos.herokuapp.com/api/v1/users/2/ratings', mockOptions)
  })

  it("should return array if fetch is completed correctly", () => {
    expect(postRating(mockRating, 2)).resolves.toEqual(mockRating)
  })

  it("should return error if fetch is completed incorrectly", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    })

    expect(postRating(mockRating, 2)).rejects.toEqual(Error('There was an error posting rating.'))
  })

  it("should return error if fetch is failed", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('Fetch is failed'))
    })
    expect(postRating(mockRating, 2)).rejects.toEqual(Error('Fetch is failed'))
  })
})

describe('getRatings', () => {
  let mockRatingsData =
    [{
      id: 1,
      user_id: 1,
      movie_id: 1,
      rating: 6,
      created_at: "someDate",
      updated_at: "someDate"
    }]

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve(mockRatingsData)
        }
      })
    })
  })
  it('should be passed down the correct URL', () => {
    getRatings(1)
    expect(window.fetch).toHaveBeenCalledWith('https://rancid-tomatillos.herokuapp.com/api/v1/users/1/ratings')
  })

  it('should return an array the correct values types', () => {
    expect(getRatings(1)).resolves.toEqual(mockRatingsData)
  })

  it('should return an error for response that is not ok', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    })
    expect(getRatings()).rejects
      .toEqual(Error("There was an error getting ratings."))
  })

  it('should return an error if fetch is rejected', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('Failed to fetch'))
    })

    expect(getRatings()).rejects
      .toEqual(Error('Failed to fetch'))
  })
})

describe("postSignIn", () => {
  let mockOptions
  const mockUser = {
    id: 1,
    name: 'Sam',
    email: 'sam@turing.com',
    password: '1234'
  }

  beforeEach(() => {
    mockOptions = {
      method: 'POST',
      body: JSON.stringify(mockUser),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUser)
      })
    })
  })

  it("should call fetch with correct url and options", () => {
    postSignIn(mockUser)

    expect(window.fetch).toHaveBeenCalledWith('https://rancid-tomatillos.herokuapp.com/api/v1/login', mockOptions)
  })

  it("should return array if fetch is completed correctly", () => {
    expect(postSignIn(mockUser)).resolves.toEqual(mockUser)
  })

  it("should return error if fetch is completed incorrectly", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    })

    expect(postSignIn(mockUser)).rejects.toEqual(Error('There was a problem signing in'))
  })

  it("should return error if fetch is failed", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('Fetch is failed'))
    })
    expect(postSignIn(mockUser)).rejects.toEqual(Error('Fetch is failed'))
  })
})
