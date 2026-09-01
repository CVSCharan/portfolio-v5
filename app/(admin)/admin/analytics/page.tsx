import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "@/src/prisma/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const pageViews = (await db.orm.public.PageView.orderBy(p => p.createdAt.desc()).all()) as any[];

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // 1. Total and Last 30 Days
  const totalViews = pageViews.length;
  const last30DaysViews = pageViews.filter((pv) => pv.createdAt >= thirtyDaysAgo);
  const viewsIn30Days = last30DaysViews.length;

  // 2. Top Pages
  const pathCounts: Record<string, number> = {};
  pageViews.forEach((pv) => {
    pathCounts[pv.path] = (pathCounts[pv.path] || 0) + 1;
  });
  const topPages = Object.entries(pathCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // 3. Traffic Sources (Referrers)
  const referrerCounts: Record<string, number> = {};
  pageViews.forEach((pv) => {
    let ref = pv.referrer;
    if (!ref || ref === "null" || ref === "") ref = "Direct";
    else {
      try {
        ref = new URL(ref).hostname;
      } catch (e) {
        // Keep original if invalid URL
      }
    }
    referrerCounts[ref] = (referrerCounts[ref] || 0) + 1;
  });
  const topReferrers = Object.entries(referrerCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // 4. Audience Devices & Browsers
  let mobileCount = 0;
  let desktopCount = 0;
  const browserCounts: Record<string, number> = {};

  pageViews.forEach((pv) => {
    const ua = pv.userAgent || "";
    if (/Mobi|Android/i.test(ua)) mobileCount++;
    else desktopCount++;

    let browser = "Other";
    if (/Edge|Edg/i.test(ua)) browser = "Edge";
    else if (/Chrome/i.test(ua)) browser = "Chrome";
    else if (/Firefox/i.test(ua)) browser = "Firefox";
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari";
    
    browserCounts[browser] = (browserCounts[browser] || 0) + 1;
  });

  const topBrowsers = Object.entries(browserCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  // Time-Series (Last 30 Days) - Aggregate by day
  const dailyCounts: Record<string, number> = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = `${d.getMonth() + 1}/${d.getDate()}`;
    dailyCounts[dateStr] = 0;
  }
  
  last30DaysViews.forEach((pv) => {
    const d = new Date(pv.createdAt);
    const dateStr = `${d.getMonth() + 1}/${d.getDate()}`;
    if (dailyCounts[dateStr] !== undefined) {
      dailyCounts[dateStr]++;
    }
  });

  const maxDailyView = Math.max(...Object.values(dailyCounts), 1);

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h2 className="text-headline mb-4">Analytics Overview</h2>
        <p className="text-body-muted">Track your portfolio's performance, top pages, and visitor insights.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="text-label text-muted-foreground mb-2">Total Views</h3>
          <p className="text-3xl font-bold font-mono tracking-tight">{totalViews}</p>
        </div>
        <div className="card p-6">
          <h3 className="text-label text-muted-foreground mb-2">Last 30 Days</h3>
          <p className="text-3xl font-bold font-mono tracking-tight">{viewsIn30Days}</p>
        </div>
        <div className="card p-6">
          <h3 className="text-label text-muted-foreground mb-2">Most Popular Page</h3>
          <p className="text-3xl font-bold font-mono tracking-tight text-primary truncate">
            {topPages.length > 0 ? topPages[0][0] : "-"}
          </p>
        </div>
      </div>

      {/* Time-Series Chart (CSS Grid) */}
      <div className="card p-6">
        <h3 className="text-label text-muted-foreground mb-6">Traffic (Last 30 Days)</h3>
        <div className="h-48 flex items-end gap-1 sm:gap-2">
          {Object.entries(dailyCounts).map(([date, count]) => {
            const heightPercent = (count / maxDailyView) * 100;
            return (
              <div key={date} className="flex-1 flex flex-col items-center gap-2 group relative">
                <div 
                  className="w-full bg-primary/20 group-hover:bg-primary transition-colors rounded-t-sm"
                  style={{ height: `${heightPercent}%`, minHeight: count > 0 ? "4px" : "0px" }}
                />
                {/* Tooltip */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground text-xs py-1 px-2 rounded-md pointer-events-none whitespace-nowrap z-10">
                  {date}: {count} views
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-4 text-xs text-muted-foreground">
          <span>30 Days Ago</span>
          <span>Today</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="card p-6">
          <h3 className="text-label text-muted-foreground mb-4">Content Performance</h3>
          <div className="space-y-4">
            {topPages.map(([path, count]) => (
              <div key={path} className="flex items-center justify-between">
                <div className="truncate pr-4 text-sm font-medium">{path}</div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground whitespace-nowrap">
                  <span>{count} views</span>
                  <span className="w-12 text-right">
                    {totalViews > 0 ? Math.round((count / totalViews) * 100) : 0}%
                  </span>
                </div>
              </div>
            ))}
            {topPages.length === 0 && <div className="text-sm text-muted-foreground">No data available</div>}
          </div>
        </div>

        {/* Acquisition & Audience */}
        <div className="space-y-6">
          {/* Top Referrers */}
          <div className="card p-6">
            <h3 className="text-label text-muted-foreground mb-4">Traffic Sources</h3>
            <div className="space-y-3">
              {topReferrers.map(([ref, count]) => (
                <div key={ref} className="flex justify-between items-center text-sm">
                  <span className="truncate pr-4 text-muted-foreground">{ref}</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
              {topReferrers.length === 0 && <div className="text-sm text-muted-foreground">No data available</div>}
            </div>
          </div>

          {/* Device & Browser Breakdown */}
          <div className="grid grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-label text-muted-foreground mb-4">Devices</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Desktop</span>
                  <span className="font-medium">{desktopCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mobile</span>
                  <span className="font-medium">{mobileCount}</span>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <h3 className="text-label text-muted-foreground mb-4">Browsers</h3>
              <div className="space-y-3 text-sm">
                {topBrowsers.map(([browser, count]) => (
                  <div key={browser} className="flex justify-between">
                    <span className="text-muted-foreground">{browser}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
