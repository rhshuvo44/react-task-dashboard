
import { Card, Radio } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetArticlesQuery } from "../../redux/api/api";
import {
  setData,
  setViewType,
} from "../../redux/features/performance/performanceSlice";
import type { RootState } from "../../redux/store";
import type { TArticle } from "../../types/tableType";

const PerformanceChart = () => {
  const dispatch = useDispatch();
  const { viewType, filters, data } = useSelector(
    (state: RootState) => state.performance
  );
  const { data: articles } = useGetArticlesQuery(undefined);

  useEffect(() => {
    if (!articles) return;

    const filtered = articles.filter((a: TArticle) => {
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

    const groupedData: Record<string, number> = {};

    filtered.forEach((article: TArticle) => {
      const dateKey =
        viewType === "daily"
          ? moment(article.publishedDate).format("YYYY-MM-DD")
          : moment(article.publishedDate).format("YYYY-MM");

      if (!groupedData[dateKey]) groupedData[dateKey] = 0;
      groupedData[dateKey] += article.views;
    });

    const chartData = Object.entries(groupedData)
      .map(([date, views]) => ({ date, views }))
      .sort((a, b) => moment(a.date).diff(moment(b.date)));

    dispatch(setData(chartData));
  }, [articles, filters, viewType, dispatch]);

  return (
    <Card
      title="Article Views Performance"
      extra={
        <Radio.Group
          value={viewType}
          onChange={(e) => dispatch(setViewType(e.target.value))}
        >
          <Radio.Button value="daily">Daily</Radio.Button>
          <Radio.Button value="monthly">Monthly</Radio.Button>
        </Radio.Group>
      }
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="views" stroke="#1890ff" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PerformanceChart;
