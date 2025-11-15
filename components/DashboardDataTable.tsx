"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardOutlineTable } from "./pages/DashboardOutlineTable";
import PastPerformancePage from "@/components/pages/PastPerformancePage";
import KeyPersonnelPage from "@/components/pages/KeyPersonnelPage";
import FocusDocumentsPage from "@/components/pages/FocusDocumentsPage";

export default function Dashboard() {
  const [activeTab, setActiveTab] = React.useState<
    "outline" | "past-performance" | "key-personnel" | "focus-documents"
  >("outline");

  return (
    <div className="flex flex-col gap-6 w-full">
     

      <Tabs
        value={activeTab}
        onValueChange={(val) =>
          setActiveTab(
            val as "outline" | "past-performance" | "key-personnel" | "focus-documents"
          )
        }
        className="flex flex-col gap-4 w-full"
      >
        <TabsList className="gap-2 overflow-x-auto">
          <TabsTrigger value="outline">Outline</TabsTrigger>
          <TabsTrigger value="past-performance">Past Performance</TabsTrigger>
          <TabsTrigger value="key-personnel">Key Personnel</TabsTrigger>
          <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="outline">
          <DashboardOutlineTable />
        </TabsContent>

        <TabsContent value="past-performance">
          <PastPerformancePage />
        </TabsContent>

        <TabsContent value="key-personnel">
          <KeyPersonnelPage />
        </TabsContent>

        <TabsContent value="focus-documents">
          <FocusDocumentsPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
