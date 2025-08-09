import { useDispatch, useSelector } from "react-redux";

import { Card, Radio } from "antd";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { setViewType } from "../../redux/features/performance/performanceSlice";
import type { RootState } from "../../redux/store";

const PerformanceChart = () => {
  const dispatch = useDispatch();
  const { viewType, data } = useSelector(
    (state: RootState) => state.performance
  );

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
