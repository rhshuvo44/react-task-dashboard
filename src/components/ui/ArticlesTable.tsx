import { Button, DatePicker, Input, Space, Table } from "antd";

import { useMemo, useState } from "react";

import { userRole } from "../../constants/userRole";

import Loading from "./Loading";
import SectionTitle from "./SectionTitle";

import type { Moment } from "moment";
import moment from "moment";
import { useSelector } from "react-redux";
import { useGetArticlesQuery } from "../../redux/api/api";
import type { RootState } from "../../redux/store";
import { articleColumns } from "../../types/tableColum";
import type { TArticle } from "../../types/tableType";
import { EditArticleModal } from "../modal/EditArticleModal";

const { RangePicker } = DatePicker;

const ArticlesTable = () => {
  const { data, isError, isLoading } = useGetArticlesQuery(undefined);
  //   const [deleteLoan] = useDeleteLoanMutation();
  const user = useSelector((state: RootState) => state.auth.user);
  const [selectedArticle, setSelectedArticle] = useState<TArticle | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  // Filter states
  const [authorFilter, setAuthorFilter] = useState<string>("");
  const [dateRange, setDateRange] = useState<
    [Moment | null, Moment | null] | null
  >(null);
  const [searchTitle, setSearchTitle] = useState<string>("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  // Filter & Search logic
  const filteredData = useMemo<TArticle[]>(() => {
    if (!data) return [];

    return data.filter((item: TArticle) => {
      const matchesAuthor = authorFilter
        ? item.author.toLowerCase().includes(authorFilter.toLowerCase())
        : true;

      const matchesTitle = searchTitle
        ? item.title.toLowerCase().includes(searchTitle.toLowerCase())
        : true;

      const matchesDate =
        dateRange && dateRange[0] && dateRange[1]
          ? moment(item.publishedDate).isBetween(
              dateRange[0],
              dateRange[1],
              undefined,
              "[]"
            )
          : true;

      return matchesAuthor && matchesTitle && matchesDate;
    });
  }, [data, authorFilter, searchTitle, dateRange]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading data</div>;

  // Pagination slice
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
        <SectionTitle title="Articles" />
        <div className="flex flex-wrap gap-4">
          <Input
            placeholder="Search by title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            allowClear
            style={{ width: 200 }}
          />
          <Input
            placeholder="Filter by author"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            allowClear
            style={{ width: 200 }}
          />
          <RangePicker
            onChange={(dates) =>
              setDateRange(
                dates
                  ? [
                      dates[0] ? moment(dates[0].toDate()) : null,
                      dates[1] ? moment(dates[1].toDate()) : null,
                    ]
                  : null
              )
            }
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
          ...(user?.role === userRole.superAdmin ||
          user?.role === userRole.ADMIN
            ? [
                {
                  title: "Action",
                  key: "action",
                  render: (item: TArticle) => (
                    <Space>
                      <Button
                        type="primary"
                        onClick={() => {
                          setSelectedArticle(item);
                          setModalOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      {user.role === userRole.ADMIN && (
                        <Button danger>Delete</Button>
                      )}
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
