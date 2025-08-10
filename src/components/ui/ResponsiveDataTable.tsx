import { Table } from "antd";
import { useState } from "react";
import type { ResponsiveDataTableProps } from "../../types/tableType";

export function ResponsiveDataTable<T extends object>({
  columns,
  data,
  rowKey,
  pageSize = 5,
}: ResponsiveDataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Table<T>
      bordered
      size="small"
      scroll={{ x: "max-content" }}
      columns={columns}
      dataSource={paginatedData}
      rowKey={rowKey}
      pagination={{
        current: currentPage,
        pageSize,
        total: data.length,
        onChange: (page) => setCurrentPage(page),
        showSizeChanger: false,
      }}
    />
  );
}
