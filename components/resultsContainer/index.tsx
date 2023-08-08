"use client"
import { useSearch } from "@/lib/context/search-context"
import Card from "../card"
import Image from "next/image"
import React from "react"
import Paginator from "../paginator"

const ResultsContainer: React.FC = () => {
  const { results, search: [current], page: [currentPage, setPage], maxPages } = useSearch()
  const urlPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

  return (
    <>
      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-4">
        {results && results.map((r, i) =>
          <Card key={i}>
            {
              r.Poster.match(urlPattern) ?
                <Image src={r.Poster}
                  height={150} width={150} alt={r.Title} /> : <div className="h-[180px] w-[150px] bg-gray-400 flex flex-col justify-center" >{r.Poster}</div>
            }
            <h1>{r.Title}</h1>
            <h2>{r.Year}</h2>
          </Card>
        )}
      </section>
      <Paginator current={currentPage} setPage={setPage} maxPages={maxPages} />
    </>
  )
}

export default ResultsContainer