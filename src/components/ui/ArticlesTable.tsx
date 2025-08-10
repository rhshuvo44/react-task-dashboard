import { Button, Space } from "antd";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import debounce from "lodash.debounce";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRole } from "../../constants/userRole";
import { useGetArticlesQuery } from "../../redux/api/api";
import { updateFilter } from "../../redux/features/performance/performanceSlice";
import type { RootState } from "../../redux/store";
import { articleColumns } from "../../types/tableColum";
import type { TArticle } from "../../types/tableType";
import { filterArticles } from "../../utils/filterArticles";
import { EditArticleModal } from "../modal/EditArticleModal";
import Loading from "./Loading";
import { ResponsiveDataTable } from "./ResponsiveDataTable";
import SectionTitle from "./SectionTitle";
import { TableFilters } from "./TableFilters";

dayjs.extend(isBetween);

const ArticlesTable = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.performance.filters);
  const { data, isLoading, isError } = useGetArticlesQuery(undefined);

  const [selectedArticle, setSelectedArticle] = useState<TArticle | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [authorFilter, setAuthorFilter] = useState(filters.authorFilter);
  const [searchTitle, setSearchTitle] = useState(filters.searchTitle);
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(
    filters.dateRange
      ? [dayjs(filters.dateRange[0]), dayjs(filters.dateRange[1])]
      : null
  );

  // Debounced dispatch to Redux
  const debouncedDispatch = debounce(
    (key: string, value: string | [Dayjs | null, Dayjs | null] | null) => {
      dispatch(updateFilter({ [key]: value }));
    },
    300
  );

  const handleFilterChange = (key: string, value: any) => {
    if (key === "authorFilter") setAuthorFilter(value);
    if (key === "searchTitle") setSearchTitle(value);
    if (key === "dateRange") setDateRange(value);

    if (key === "dateRange" && value) {
      debouncedDispatch(key, [
        value[0]?.toISOString() ?? null,
        value[1]?.toISOString() ?? null,
      ]);
    } else {
      debouncedDispatch(key, value);
    }
  };

  const filteredData = filterArticles(data, {
    ...filters,
    dateRange: filters.dateRange === null ? undefined : filters.dateRange,
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading data</div>;

  const columns = [
    ...articleColumns,
    ...(userRole.ADMIN || userRole.EDITOR
      ? [
          {
            title: "Action",
            key: "action",
            // responsive: ["sm"], // hides on extra-small screens
            render: (item: TArticle) => (
              <Space>
                {(userRole.ADMIN || userRole.EDITOR) && (
                  <Button
                    type="primary"
                    onClick={() => {
                      setSelectedArticle(item);
                      setModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                )}
                {userRole.ADMIN && <Button danger>Delete</Button>}
              </Space>
            ),
          },
        ]
      : []),
  ];

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
        <SectionTitle title="Articles" />
        <TableFilters
          fields={[
            {
              key: "searchTitle",
              type: "text",
              placeholder: "Search by title",
              value: searchTitle,
            },
            {
              key: "authorFilter",
              type: "text",
              placeholder: "Filter by author",
              value: authorFilter,
            },
            {
              key: "dateRange",
              type: "dateRange",
              value: dateRange,
            },
          ]}
          onChange={handleFilterChange}
        />
      </div>

      <ResponsiveDataTable<TArticle>
        columns={columns}
        data={filteredData}
        rowKey={(record) => String(record.id)}
      />

      {selectedArticle && (
        <EditArticleModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          article={selectedArticle}
        />
      )}
    </div>
  );
};

export default ArticlesTable;
