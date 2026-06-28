"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DELIVERABLES, type Deliverable } from "@/lib/data/deliverables";
import { Download, Eye, FileSpreadsheet, FileText, Presentation } from "lucide-react";

function iconFor(file: string) {
  if (file.endsWith(".xlsx")) return FileSpreadsheet;
  if (file.endsWith(".pptx")) return Presentation;
  return FileText;
}

function viewUrl(d: Deliverable, origin: string | null): string | null {
  if (d.kind === "pdf") return d.file;
  if (!origin) return null; // Office viewer needs a public absolute URL
  const abs = `${origin}${d.file}`;
  return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(abs)}`;
}

export default function DeliverablesPage() {
  const [origin, setOrigin] = useState<string | null>(null);
  useEffect(() => {
    const o = window.location.origin;
    // Office Online viewer can't reach localhost — only expose "View" for office docs on a public host.
    setOrigin(o.includes("localhost") || o.includes("127.0.0.1") ? null : o);
  }, []);

  return (
    <div>
      <header className="bg-gradient-to-br from-[#162a4d] to-[#1f3864] text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <Badge className="border-white/20 bg-white/10 text-[#9ec7e8]">Deliverables</Badge>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">The graded outputs</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#cdd9e8]">
            Every deliverable mapped to the brief — view in-browser or download the source file.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DELIVERABLES.map((d) => {
            const Icon = iconFor(d.file);
            const view = viewUrl(d, origin);
            return (
              <Card key={d.file} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Icon className="size-5" />
                    </div>
                    <Badge variant="secondary">{d.badge}</Badge>
                  </div>
                  <CardTitle className="mt-2">{d.title}</CardTitle>
                  <CardDescription>{d.meta}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {view ? (
                      <a href={view} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="default">
                          <Eye className="size-4" /> View
                        </Button>
                      </a>
                    ) : (
                      d.kind === "office" && (
                        <Button size="sm" variant="default" disabled title="In-browser view is available on the deployed site">
                          <Eye className="size-4" /> View
                        </Button>
                      )
                    )}
                    <a href={d.file} download>
                      <Button size="sm" variant="outline">
                        <Download className="size-4" /> Download
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Office documents open in Microsoft&apos;s free Office Online viewer (no account needed).
          In-browser view is enabled once the site is deployed to a public URL; locally, use Download.
        </p>
      </div>
    </div>
  );
}
