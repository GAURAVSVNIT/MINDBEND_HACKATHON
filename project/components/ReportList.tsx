'use client';

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, AlertTriangle, CheckCircle, Clock, Search, Filter, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

type Report = {
  id: string;
  title: string;
  type: 'theft' | 'vandalism' | 'assault' | 'other';
  status: 'pending' | 'resolved' | 'investigating';
  date: string;
  location: string;
  description: string;
};

export default function ReportList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | Report['status']>("all");

  const reports: Report[] = [
    {
      id: "RPT-001",
      title: "Bicycle Theft",
      type: "theft",
      status: "pending",
      date: "2023-05-15",
      location: "Main Street",
      description: "Bicycle stolen from front yard"
    },
    {
      id: "RPT-002",
      title: "Graffiti",
      type: "vandalism",
      status: "investigating",
      date: "2023-05-14",
      location: "Park Avenue",
      description: "Graffiti on public building"
    },
    {
      id: "RPT-003",
      title: "Suspicious Activity",
      type: "other",
      status: "resolved",
      date: "2023-05-12",
      location: "Oak Lane",
      description: "Report of suspicious individuals"
    },
    {
      id: "RPT-004",
      title: "Assault Incident",
      type: "assault",
      status: "investigating",
      date: "2023-05-10",
      location: "Downtown Plaza",
      description: "Altercation between two individuals"
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         report.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || report.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: Report['status']) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'investigating': return <AlertTriangle className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: Report['type']) => {
    const variants = {
      theft: "destructive",
      vandalism: "warning",
      assault: "destructive",
      other: "default"
    };
    
    const labels = {
      theft: "Theft",
      vandalism: "Vandalism",
      assault: "Assault",
      other: "Other"
    };

    return <Badge variant={variants[type]}>{labels[type]}</Badge>;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Incident Reports</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative">
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <div className="absolute right-0 mt-1 w-40 bg-background border rounded-md shadow-lg z-10">
                  <div className="p-2">
                    <div 
                      className={`px-2 py-1 rounded cursor-pointer ${filter === "all" ? "bg-accent" : ""}`}
                      onClick={() => setFilter("all")}
                    >
                      All Reports
                    </div>
                    <div 
                      className={`px-2 py-1 rounded cursor-pointer ${filter === "pending" ? "bg-accent" : ""}`}
                      onClick={() => setFilter("pending")}
                    >
                      Pending
                    </div>
                    <div 
                      className={`px-2 py-1 rounded cursor-pointer ${filter === "investigating" ? "bg-accent" : ""}`}
                      onClick={() => setFilter("investigating")}
                    >
                      Investigating
                    </div>
                    <div 
                      className={`px-2 py-1 rounded cursor-pointer ${filter === "resolved" ? "bg-accent" : ""}`}
                      onClick={() => setFilter("resolved")}
                    >
                      Resolved
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.id}</TableCell>
                  <TableCell>{report.title}</TableCell>
                  <TableCell>{getTypeBadge(report.type)}</TableCell>
                  <TableCell>{report.location}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(report.status)}
                      <span className="capitalize">{report.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No reports found</h3>
          <p className="mt-2 text-muted-foreground">
            {searchQuery ? "Try a different search term" : "No reports match your current filters"}
          </p>
        </div>
      )}
    </motion.div>
  );
}