import axios, { AxiosInstance, AxiosResponse } from 'axios';
const API_KEY = process.env.NEXT_PUBLIC_OMNDB_API_KEY
const storageKey = 'omdb_cached'
export default class OMDBClient {

  constructor() {
  }

  async findByTitle(title: string, page?: number): Promise<SearchType> {
    const storage = localStorage.getItem(storageKey)
    const stored = JSON.parse(storage || "{}")
    const cached = stored[title] || []
    if (page) {
      const read = cached[page]
      if (read && read.Response != 'False') {
        console.log('cached')
        return read
      }
    }
    const data = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${title}${page ? '&page=' + page : ''}`)
    const json = (await data.json() as SearchType)
    cached[page || 0] = json
    stored[title] = cached
    localStorage.setItem(storageKey, JSON.stringify(stored))
    return json
  }
}

export type SearchType = {
  Search: Movie[]
  totalResults: number
  Response: boolean
}

export type Movie = {
  Poster: string
  Title: string
  Type: string
  Year: string
  imdbID: string
}