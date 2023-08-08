import { SearchProvider } from "@/lib/context/search-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>{children}</SearchProvider>
  )
}