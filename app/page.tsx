import AppAreaChart from "@/components/AppAreaChart";
import AppBarChart from "@/components/AppBarChart";
import {ChartPieDonutText} from "@/components/AppPieChart";
import { Area } from "recharts";

const Homepage = () => {
  return(
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
    <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-1 2xl:col-span-2"><AppBarChart/></div>
<div className="bg-primary-foreground p-4 rounded-lg"><ChartPieDonutText/></div>
<div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 2xl:col-span-4 "><AppAreaChart/></div>
    <div className="bg-primary-foreground p-4 rounded-lg ">test</div>
    <div className="bg-primary-foreground p-4 rounded-lg">test</div>
    <div className="bg-primary-foreground p-4 rounded-lg">test</div>
    </div>
  );
};
export default Homepage
