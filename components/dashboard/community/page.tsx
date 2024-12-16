"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const schemes = [
  {
    title: "Deendayal Antyodaya Yojana",
    description: "National Rural Livelihoods Mission (DAY-NRLM)",
    date: "Updated 2 days ago",
    link: "https://www.nrlm.gov.in/"
  },
  {
    title: "PM Mudra Yojana",
    description: "Financial support for micro enterprises",
    date: "Updated 1 week ago",
    link: "https://www.mudra.org.in/"
  },
  {
    title: "Stand Up India Scheme",
    description: "Support for SC/ST and women entrepreneurs",
    date: "Updated 2 weeks ago",
    link: "https://www.standupmitra.in/"
  },
  {
    title: "PMEGP Scheme",
    description: "Prime Minister's Employment Generation Programme",
    date: "Updated 3 weeks ago",
    link: "https://www.kviconline.gov.in/pmegpeportal/pmegphome.jsp"
  }
];

export function GovernmentSchemes() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Government Schemes</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {schemes.map((scheme, i) => (
              <div key={i} className="border-b pb-4 last:border-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{scheme.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {scheme.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {scheme.date}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
