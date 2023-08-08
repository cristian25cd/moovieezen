import cn from 'classnames'
const Paginator = ({ current, maxPages, setPage }: { current: number, maxPages: number, setPage: (i: number) => void }) => {

  const getPages = () => {
    let pages = []
    for (let i = 1; i < maxPages; i++) {
      pages.push(<button key={i} className={cn("bg-transparent border border-light-50 rounded w-8 h-8", {
        'bg-white text-blue-900': i === current
      })} onClick={() => setPage(i)} disabled={i === current} >{i}</button>)
    }
    return pages
  }
  return (
    <div className="flex justify-left h-fit overflow-hidden flex-wrap p-4 gap-2">
      {getPages()}
    </div>
  )
}

export default Paginator