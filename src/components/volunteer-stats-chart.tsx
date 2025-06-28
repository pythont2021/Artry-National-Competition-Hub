"use client"

import { Pie, PieChart, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  achieved: {
    label: "Achieved",
  },
  remaining: {
    label: "Remaining",
  },
} satisfies ChartConfig

export function VolunteerStatsChart({ achieved, target }: { achieved: number; target: number }) {
  const remaining = Math.max(0, target - achieved);
  const chartData = [
    { name: "achieved", value: achieved, fill: "hsl(var(--primary))" },
    { name: "remaining", value: remaining, fill: "hsl(var(--muted))" },
  ];
  
  const total = achieved + remaining;
  const percentage = total > 0 ? (achieved / total) * 100 : 0;

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-headline text-2xl">Referral Progress</CardTitle>
        <CardDescription className="font-body">Your target is {target} participants.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius="60%"
              strokeWidth={5}
              labelLine={false}
            >
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <div className="flex flex-col gap-2 p-6 pt-0 text-center text-sm">
        <div className="font-bold leading-none text-lg">
            {achieved} <span className="text-muted-foreground text-sm font-normal">of {target} Participants</span>
        </div>
        <div className="leading-none text-muted-foreground">
            You've achieved {percentage.toFixed(0)}% of your goal.
        </div>
      </div>
    </Card>
  )
}
