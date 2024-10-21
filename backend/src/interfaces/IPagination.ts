export interface IPagination<T> {
  data: T[]
  totalPages: number
  hasMore: boolean
  currentPage: number
}
