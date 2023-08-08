"use client"

import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import OMDBClient, { Movie } from "../OMNDb"

interface SearchContext {
  search: [string, Dispatch<SetStateAction<string>>]
  results: Movie[]
  page: [number, Dispatch<SetStateAction<number>>]
  maxPages: number
  loading: [boolean, Dispatch<SetStateAction<boolean>>]
}

export const SearchContext = createContext<SearchContext | null>(
  null
)

export const SearchProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {

  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Movie[]>([])
  const [page, setPage] = useState(0)
  const [maxPages, setMaxPages] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const searchByString = async () => {
      setLoading(true)
      const client = new OMDBClient()
      const results = await client.findByTitle(search)
      setLoading(false)
      if (results.Response) {
        setPage(1)
        setResults(results.Search)
        setMaxPages(results['totalResults'] / 10)
      }
    }
    if (search != '') {
      searchByString()
    }
  }, [search])

  useEffect(() => {
    const getNext = async () => {
      setLoading(true)
      const client = new OMDBClient()
      const results = await client.findByTitle(search, page)
      setLoading(false)
      if (results.Response) {
        setResults(results.Search)
      }
    }
    if (page !== 0) {
      getNext()
    }
  }, [page])


  return (
    <SearchContext.Provider
      value={{ search: [search, setSearch], results, page: [page, setPage], maxPages, loading: [loading, setLoading] }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => {
  const context = useContext(SearchContext)

  if (context === null) {
    throw new Error(
      "useSearch must be used within a SearchProvider"
    )
  }

  return context
}
