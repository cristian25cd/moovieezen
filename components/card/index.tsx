import React, { ReactNode, Suspense } from "react"
import Loading from "../loading"

const Card = ({ children }: { children: ReactNode }) => {

  return (
    <div className="p-4 max-h-[40vh] border border-light-50 rounded-md min-h flex flex-col justify-center text-center items-center">
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </div>
  )
}

export default Card 