import moment from "moment";
import type { Filters, TArticle } from "../types/tableType";



export function filterArticles(
    articles: TArticle[],
    filters: Filters
): TArticle[] {
    if (!articles) return [];
    return articles.filter((a: TArticle) => {
        const matchesAuthor = filters.authorFilter
            ? a.author.toLowerCase().includes(filters.authorFilter.toLowerCase())
            : true;

        const matchesTitle = filters.searchTitle
            ? a.title.toLowerCase().includes(filters.searchTitle.toLowerCase())
            : true;

        const matchesDate =
            filters.dateRange && filters.dateRange[0] && filters.dateRange[1]
                ? moment(a.publishedDate).isBetween(
                    moment(filters.dateRange[0]),
                    moment(filters.dateRange[1]),
                    undefined,
                    "[]"
                )
                : true;

        return matchesAuthor && matchesTitle && matchesDate;
    });
}
