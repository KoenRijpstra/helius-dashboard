"use client";

import {
  Bar,
  BarChart,
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
    DAS: 29,
    RPC: 3,
    webhook: 1,
  },
  {
    name: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(
      undefined,
      { day: "numeric", month: "numeric" }
    ),
    DAS: 65,
    RPC: 10,
    webhook: 1,
  },
  {
    name: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString(
      undefined,
      { day: "numeric", month: "numeric" }
    ),
    DAS: 32,
    RPC: 0,
    webhook: 1,
  },
  {
    name: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(
      undefined,
      { day: "numeric", month: "numeric" }
    ),
    DAS: 54,
    RPC: 3,
    webhook: 1,
  },
  {
    name: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(
      undefined,
      { day: "numeric", month: "numeric" }
    ),
    DAS: 65,
    RPC: 2,
    webhook: 1,
  },
  {
    name: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(
      undefined,
      { day: "numeric", month: "numeric" }
    ),
    DAS: 70,
    RPC: 0,
    webhook: 1,
  },
  {
    name: new Date(Date.now()).toLocaleDateString(undefined, {
      day: "numeric",
      month: "numeric",
    }),
    DAS: 90,
    RPC: 1,
    webhook: 1,
  },
];

export function ChartUsageBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage breakdown</CardTitle>
        <CardDescription>Past 7 days (UTC)</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 0,
              }}
            >
              <Tooltip
                cursor={{ fill: "hsl(var(--accent))" }}
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
                            <span
                              className={`text-xs text-[${payload[0].color}]`}
                            >
                              {payload[0].name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {payload[0].value}
                            </span>
                          </div>
                          <div className="flex flex-row gap-2">
                            <span
                              className={`text-xs text-[${payload[1].color}]`}
                            >
                              {payload[1].name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {payload[1].value}
                            </span>
                          </div>
                          <div className="flex flex-row gap-2">
                            <span
                              className={`text-xs text-[${payload[1].color}]`}
                            >
                              {payload[2].name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {payload[2].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                }}
              />
              <Legend
                verticalAlign="top"
                align="left"
                iconType="square"
                iconSize={8}
                wrapperStyle={{ fontSize: "12px" }}
                height={36}
              />
              <Bar
                type="monotone"
                dataKey="RPC"
                name="RPC"
                fill="#e60049"
                barSize={24}
              />
              <Bar
                type="monotone"
                dataKey="webhook"
                name="Webhook"
                fill="#0bb4ff"
                barSize={24}
              />
              <Bar
                type="monotone"
                dataKey="DAS"
                name="DAS"
                fill="#00bfa0"
                barSize={24}
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
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
