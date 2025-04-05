'use client';

import { useState } from "react";
import ReportList from "../../components/ReportList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("reports");

  const MotionCard = motion(Card);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3 text-safety-blue dark:text-safety-lightBlue">
            Incident <span className="text-safety-orange dark:text-safety-lightOrange">Reports</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            View and manage all reported incidents in your area
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> All Reports
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> New Report
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reports">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ReportList />
            </motion.div>
          </TabsContent>

          <TabsContent value="new">
            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border dark:border-gray-700"
            >
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <h3 className="text-xl font-medium mb-2">New Incident Report</h3>
                  <p className="text-muted-foreground">
                    Coming soon - Submit new incident reports here
                  </p>
                </div>
              </CardContent>
            </MotionCard>
          </TabsContent>
        </Tabs>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {[
            {
              title: "Recent Activity",
              desc: "View the latest incident reports in your neighborhood"
            },
            {
              title: "Statistics",
              desc: "See trends and patterns in reported incidents"
            }
          ].map((card, index) => (
            <MotionCard key={index} variants={item} className="hover:shadow-md">
              <CardContent className="p-4">
                <h3 className="font-medium">{card.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{card.desc}</p>
              </CardContent>
            </MotionCard>
          ))}
        </motion.div>
      </main>
    </div>
  );
}