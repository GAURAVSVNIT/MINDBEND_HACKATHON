"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  MapPin,
  Clock,
  Calendar as CalendarIcon,
  Camera,
  FileVideo,
  AlertTriangle,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function Home() {
  const [date, setDate] = useState<Date>();
  const [isVictim, setIsVictim] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-6 w-6 text-red-500" />
              <CardTitle className="text-2xl font-bold">Report a Crime</CardTitle>
            </div>
            <CardDescription>
              Please provide accurate information to help us investigate the incident
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location of Incident
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  placeholder="Enter the exact address or location"
                  required
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    Date of Incident
                    <span className="text-red-500">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Time of Incident
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input type="time" id="time" required />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Description of Incident
                </Label>
                <Textarea
                  id="description"
                  placeholder="Please provide details about what happened..."
                  className="h-32"
                />
              </div>

              {/* Evidence Upload */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="photos" className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Photo Evidence
                  </Label>
                  <Input
                    type="file"
                    id="photos"
                    accept="image/*"
                    multiple
                    className="cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="videos" className="flex items-center gap-2">
                    <FileVideo className="h-4 w-4" />
                    Video Evidence
                  </Label>
                  <Input
                    type="file"
                    id="videos"
                    accept="video/*"
                    multiple
                    className="cursor-pointer"
                  />
                </div>
              </div>

              {/* Victim Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="victim"
                    checked={isVictim}
                    onCheckedChange={(checked) => setIsVictim(checked as boolean)}
                  />
                  <Label htmlFor="victim">I am the victim</Label>
                </div>

                {!isVictim && (
                  <div className="space-y-4 border-l-2 border-gray-200 pl-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="victimName">
                        Victim&apos;s Full Name
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="victimName"
                        placeholder="Enter victim's full name"
                        required={!isVictim}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="victimContact">
                        Victim&apos;s Contact Number
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="victimContact"
                        type="tel"
                        placeholder="Enter victim's contact number"
                        required={!isVictim}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="victimEmail">Victim&apos;s Email</Label>
                      <Input
                        id="victimEmail"
                        type="email"
                        placeholder="Enter victim's email address"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
                Submit Report
              </Button>

              <p className="text-sm text-gray-500 text-center mt-4">
                Fields marked with <span className="text-red-500">*</span> are required
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}