"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  {
    name: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString(
      undefined,
      { day: "numeric", month: "numeric" }
    ),
    succesful: 29,
    failed: 3,
  },
  {
    name: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(
      undefined,
      { day: "numeric", month: "numeric" }
    ),
    succesful: 65,
    failed: 10,
  },
  {
    name: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString(
      undefined,
      { day: "numeric", month: "numeric" }
    ),
    succesful: 32,
    failed: 0,
  },
  {
    name: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(
      undefined,
      { day: "numeric", month: "numeric" }
    ),
    succesful: 54,
    failed: 3,
  },
  {
    name: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(
      undefined,
      { day: "numeric", month: "numeric" }
    ),
    succesful: 65,
    failed: 2,
  },
  {
    name: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(
      undefined,
      { day: "numeric", month: "numeric" }
    ),
    succesful: 70,
    failed: 0,
  },
  {
    name: new Date(Date.now()).toLocaleDateString(undefined, {
      day: "numeric",
      month: "numeric",
    }),
    succesful: 90,
    failed: 1,
  },
];

export function ChartRequestHealth() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Request health</CardTitle>
        <CardDescription>Past 7 days (UTC)</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 0
              }}
            >
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold">
                              {payload[0].payload.name}
                            </span>
                          </div>
                          <div className="flex flex-row gap-1">
                            <span className={`text-xs text-[${payload[0].color}]`}>
                              {payload[0].name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {payload[0].value}
                            </span>
                          </div>
                          <div className="flex flex-row gap-2">
                            <span className={`text-xs text-[${payload[1].color}]`}>
                              {payload[1].name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {payload[1].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                }}
              />
              <defs>
                <linearGradient id="colorSuccesful" x1="0" y1="0" x2="0" y2="1" >
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} />
                  <stop offset="60%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#b91c1c" stopOpacity={0.4} />
                  <stop offset="60%" stopColor="#b91c1c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Legend
                verticalAlign="top"
                align="left"
                iconType="square"
                iconSize={8}
                wrapperStyle={{fontSize: "12px"}}
                height={36}
              />
              <Area
                type="monotone"
                dataKey="succesful"
                name="Succesful"
                activeDot={{
                  r: 6,
                  style: { fill: "#14b8a6", opacity: 0.25 },
                }}
                fill="url(#colorSuccesful)"
                stroke="#14b8a6"
                strokeWidth={2}
                strokeOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="failed"
                name="Failed"
                activeDot={{
                  r: 6,
                  style: { fill: "#b91c1c", opacity: 0.25 },
                }}
                fill="url(#colorFailed)"
                stroke="#b91c1c"
                strokeWidth={2}
                strokeOpacity={0.6}
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                fontSize={12}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                fontSize={12}
                width={30}
              />
              <CartesianGrid
                strokeDasharray="3 3"
                fillOpacity={0.6}
                vertical={false}
                stroke="hsl(var(--border))"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
