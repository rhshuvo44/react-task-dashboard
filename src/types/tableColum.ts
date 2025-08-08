import moment from "moment";
import type { TArticle } from "./tableType";

export const articleColumns = [
    {
        title: "Title",
        dataIndex: "title",
        key: "title",
        sorter: (a: TArticle, b: TArticle) => a.title.localeCompare(b.title),
        // Allow searching by title via input, so no filterDropdown here
    },
    {
        title: "Author",
        dataIndex: "author",
        key: "author",
        sorter: (a: TArticle, b: TArticle) => a.author.localeCompare(b.author),
    },
    {
        title: "Published Date",
        dataIndex: "publishedDate",
        key: "publishedDate",
        sorter: (a: TArticle, b: TArticle) =>
            moment(a.publishedDate).unix() - moment(b.publishedDate).unix(),
        render: (date: string) => moment(date).format("YYYY-MM-DD"),
    },
    {
        title: "Views",
        dataIndex: "views",
        key: "views",
        sorter: (a: TArticle, b: TArticle) => a.views - b.views,
    },
    {
        title: "Likes",
        dataIndex: "likes",
        key: "likes",
        sorter: (a: TArticle, b: TArticle) => a.likes - b.likes,
    },
    {
        title: "Comments",
        dataIndex: "comments",
        key: "comments",
        sorter: (a: TArticle, b: TArticle) => a.comments - b.comments,
    },

];