// components/analytics/utils/data-faker.ts
export interface TopPage {
  page: string;
  views: number;
  bounceRate: number;
  avgSession: number;
}

export interface GeoTraffic {
  country: string;
  visits: number;
}

export interface TrafficDatum {
  date: string;
  visits: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSession: number;
  topPages: TopPage[];
  geoTraffic: GeoTraffic[];
  sourceBreakdown: { source: string; value: number }[];
}

export function generateTrafficData(days: number): TrafficDatum[] {
  const data: TrafficDatum[] = [];
  for (let i = 0; i < days; i++) {
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      visits: Math.floor(Math.random() * 1000),
      uniqueVisitors: Math.floor(Math.random() * 500),
      bounceRate: parseFloat((Math.random() * 100).toFixed(2)),
      avgSession: parseFloat((Math.random() * 10).toFixed(2)),
      topPages: [
        { page: "/home", views: Math.floor(Math.random() * 300), bounceRate: 50, avgSession: 5 },
        { page: "/about", views: Math.floor(Math.random() * 200), bounceRate: 60, avgSession: 4 },
        { page: "/contact", views: Math.floor(Math.random() * 150), bounceRate: 70, avgSession: 3 },
      ],
      geoTraffic: [
        { country: "US", visits: Math.floor(Math.random() * 500) },
        { country: "IN", visits: Math.floor(Math.random() * 300) },
        { country: "UK", visits: Math.floor(Math.random() * 200) },
      ],
      sourceBreakdown: [
        { source: "Direct", value: Math.floor(Math.random() * 400) },
        { source: "Referral", value: Math.floor(Math.random() * 300) },
        { source: "Social", value: Math.floor(Math.random() * 200) },
      ],
    });
  }
  return data;
}
