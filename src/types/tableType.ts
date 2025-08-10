import type { ColumnsType } from "antd/es/table";
import { Dayjs } from "dayjs";

export type TArticle = {
    id: number;
    title: string;
    author: string;
    publishedDate: string;
    views: number;
    likes: number;
    comments: number;
    content?: string;
    status?: string;
}
export type ResponsiveDataTableProps<T> = {
    columns: ColumnsType<T>;
    data: T[];
    rowKey: string | ((record: T) => string);
    pageSize?: number;
};

export interface TableFiltersProps {
    searchTitle: string;
    authorFilter: string;
    dateRange: [Dayjs | null, Dayjs | null] | null;
    onSearchTitleChange: (value: string) => void;
    onAuthorFilterChange: (value: string) => void;
    onDateRangeChange: (dates: [Dayjs | null, Dayjs | null] | null) => void;
}

export interface Filters {
    authorFilter?: string;
    searchTitle?: string;
    dateRange?: [string | null, string | null];
}

