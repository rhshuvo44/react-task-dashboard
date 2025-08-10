import { Button, DatePicker, Input, Space, Table } from "antd";
import dayjs, { type Dayjs } from "dayjs";
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
import { EditArticleModal } from "../modal/EditArticleModal";
import Loading from "./Loading";
import SectionTitle from "./SectionTitle";
dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

const ArticlesTable = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.performance.filters);
  const { data, isLoading, isError } = useGetArticlesQuery(undefined);

  const [selectedArticle, setSelectedArticle] = useState<TArticle | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Local controlled states for inputs
  const [authorFilter, setAuthorFilter] = useState(filters.authorFilter);
  const [searchTitle, setSearchTitle] = useState(filters.searchTitle);
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(
    filters.dateRange
      ? [dayjs(filters.dateRange[0]), dayjs(filters.dateRange[1])]
      : null
  );

  // Debounced dispatch for author filter
  const debouncedSetAuthorFilter = debounce((value: string) => {
    dispatch(updateFilter({ authorFilter: value }));
  }, 300);

  // Debounced dispatch for search title
  const debouncedSetSearchTitle = debounce((value: string) => {
    dispatch(updateFilter({ searchTitle: value }));
  }, 300);

  const onAuthorFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorFilter(e.target.value);
    debouncedSetAuthorFilter(e.target.value);
  };

  const onSearchTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value);
    debouncedSetSearchTitle(e.target.value);
  };

  const onDateRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    setDateRange(dates);
    if (!dates) {
      dispatch(updateFilter({ dateRange: null }));
    } else {
      dispatch(
        updateFilter({
          dateRange: [
            dates[0]?.toISOString() ?? null,
            dates[1]?.toISOString() ?? null,
          ],
        })
      );
    }
  };

  // Filter data based on Redux filters (to keep consistent with PerformanceChart)
  const filteredData = data
    ? data.filter((item: TArticle) => {
        const matchesAuthor = filters.authorFilter
          ? item.author
              .toLowerCase()
              .includes(filters.authorFilter.toLowerCase())
          : true;
        const matchesTitle = filters.searchTitle
          ? item.title.toLowerCase().includes(filters.searchTitle.toLowerCase())
          : true;
        const matchesDate =
          filters.dateRange && filters.dateRange[0] && filters.dateRange[1]
            ? dayjs(item.publishedDate).isBetween(
                dayjs(filters.dateRange[0]),
                dayjs(filters.dateRange[1]),
                undefined,
                "[]"
              )
            : true;
        return matchesAuthor && matchesTitle && matchesDate;
      })
    : [];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading data</div>;

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
        <SectionTitle title="Articles" />
        <div className="flex flex-wrap gap-4">
          <Input
            placeholder="Search by title"
            value={searchTitle}
            onChange={onSearchTitleChange}
            allowClear
            style={{ width: 200 }}
          />
          <Input
            placeholder="Filter by author"
            value={authorFilter}
            onChange={onAuthorFilterChange}
            allowClear
            style={{ width: 200 }}
          />
          <RangePicker
            onChange={onDateRangeChange}
            value={dateRange}
            allowEmpty={[true, true]}
            style={{ width: 250 }}
          />
        </div>
      </div>

      <Table
        bordered
        size="small"
        columns={[
          ...articleColumns,
          ...(userRole.ADMIN || userRole.EDITOR
            ? [
                {
                  title: "Action",
                  key: "action",
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
        ]}
        dataSource={paginatedData}
        rowKey={(record) => record.id}
        pagination={{
          current: currentPage,
          pageSize,
          total: filteredData.length,
          onChange: (page) => setCurrentPage(page),
          showSizeChanger: false,
        }}
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
