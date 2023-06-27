export type IPageMeta = {
  prevPageUrl: string | null;
  nextPageUrl: string | null;
  currentPage: number;
  firstPage: number;
  lastPage: number;
  total: number;
};