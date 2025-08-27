"use client";

import { useViewport } from '@/hooks/use-viewport';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Clipboard, Smartphone, Ratio, Tablet, Monitor, Grid2x2, Check } from 'lucide-react';
import React, { useState, useCallback, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PixelGrid } from './pixel-grid';
import { ClickGrid } from '@/components/click-grid';

const BREAKPOINTS: Record<ReturnType<typeof useViewport>['breakpoint'], string> = {
  'xs': '< 640px',
  'sm': '≥ 640px',
  'md': '≥ 768px',
  'lg': '≥ 1024px',
  'xl': '≥ 1280px',
  '2xl': '≥ 1536px'
};
const BREAKPOINTS_ORDER = Object.keys(BREAKPOINTS) as (keyof typeof BREAKPOINTS)[];

const AnimatedValue = ({ value }: { value: string | number | undefined }) => {
  if (value === undefined) {
    return <Skeleton className="h-10 w-24" />;
  }
  return (
    <span key={String(value)} className="animate-in fade-in duration-500">
      {String(value)}
    </span>
  );
};

export function ViewportInfo() {
  const viewport = useViewport();
  const { toast } = useToast();
  const [showGrid, setShowGrid] = useState(false);

  const handleCopy = useCallback(() => {
    if (!viewport.width) return;
    const { width, height, dpr, orientation } = viewport;
    const textToCopy = `Size: ${width} × ${height}, DPR: ${dpr}, Orientation: ${orientation}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({
        description: (
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="font-semibold">Copied!</span>
            </div>
        ),
        duration: 2000,
      });
    });
  }, [viewport, toast]);
  
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'c') {
        handleCopy();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleCopy]);

  const renderValue = (value: any, className="font-mono text-3xl font-bold text-primary tracking-tighter") => 
    value !== undefined ? <div className={className}>{value}</div> : <Skeleton className="h-8 w-20" />;

  return (
    <TooltipProvider>
      <PixelGrid show={showGrid} dpr={viewport.dpr!} />
      {showGrid && <ClickGrid onExit={() => setShowGrid(false)} />}
      <div className="w-full max-w-7xl relative">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 md:gap-8 mb-8 text-center">
          <div className="font-black text-6xl sm:text-7xl md:text-8xl tracking-tighter flex items-center transition-all duration-300">
              <AnimatedValue value={viewport.width} />
              <span className="text-muted-foreground mx-2 md:mx-4">×</span>
              <AnimatedValue value={viewport.height} />
          </div>
          <div className="flex flex-col gap-2">
            <Button onClick={handleCopy} size="lg" className="shrink-0 text-base" data-ignore-grid>
              <Clipboard className="mr-2 h-5 w-5" />
              Copy Details
            </Button>
             <Tooltip>
                <TooltipTrigger asChild>
                    <Button onClick={() => setShowGrid(!showGrid)} variant={showGrid ? "default" : "outline"} size="lg" className="shrink-0 text-base" data-ignore-grid>
                      <Grid2x2 className="mr-2 h-5 w-5" />
                      Grid
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Toggle a grid to visualize pixel density.</p>
                </TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 text-center">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-muted-foreground font-medium text-sm sm:text-base">
                <Smartphone /> Device Pixel Ratio
              </CardTitle>
               <CardDescription className="text-xs sm:text-sm">Ratio of physical to logical pixels. Higher is sharper.</CardDescription>
            </CardHeader>
            <CardContent>
              {renderValue(viewport.dpr)}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-muted-foreground font-medium text-sm sm:text-base">
                  <Ratio /> Orientation
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">Your screen's orientation: portrait or landscape.</CardDescription>
            </CardHeader>
            <CardContent>
              {viewport.orientation ? 
                <div className="capitalize font-mono text-3xl font-bold text-primary tracking-tighter">{viewport.orientation}</div> : 
                <Skeleton className="h-8 w-32 mx-auto" />
              }
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader>
               <CardTitle className="flex items-center justify-center gap-2 text-muted-foreground font-medium text-sm sm:text-base">
                  <Tablet /> Breakpoint
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">Current responsive breakpoint for adaptive layouts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex justify-center items-center gap-1 sm:gap-2 font-mono text-base sm:text-lg">
                  {BREAKPOINTS_ORDER.map((bp) => (
                    <Tooltip key={bp}>
                      <TooltipTrigger asChild>
                         <span 
                          className={cn(
                            "px-2 sm:px-3 py-1 rounded-full transition-all duration-300 cursor-default",
                            viewport.breakpoint === bp ? 'bg-primary text-primary-foreground font-bold' : 'bg-muted text-muted-foreground'
                          )}
                        >
                          {bp}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                          <p>Applies at {BREAKPOINTS[bp]}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
                 {viewport.breakpoint && (
                    <div className="font-mono text-lg font-semibold text-primary tracking-tight mt-2 animate-in fade-in">
                       {BREAKPOINTS[viewport.breakpoint]}
                    </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4 md:mt-6">
          <CardHeader>
            <CardTitle className="text-center text-muted-foreground font-medium flex items-center justify-center gap-2 text-sm sm:text-base">
              <Monitor /> Safe Area Insets
            </CardTitle>
             <CardDescription className="text-xs sm:text-sm">Screen space safe from system elements like notches.</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                      <h3 className="text-sm text-muted-foreground mb-1">Top</h3>
                      {renderValue(viewport.safeArea?.top, "font-mono text-xl font-semibold text-primary")}
                  </div>
                   <div>
                      <h3 className="text-sm text-muted-foreground mb-1">Bottom</h3>
                      {renderValue(viewport.safeArea?.bottom, "font-mono text-xl font-semibold text-primary")}
                  </div>
                   <div>
                      <h3 className="text-sm text-muted-foreground mb-1">Left</h3>
                      {renderValue(viewport.safeArea?.left, "font-mono text-xl font-semibold text-primary")}
                  </div>
                   <div>
                      <h3 className="text-sm text-muted-foreground mb-1">Right</h3>
                      {renderValue(viewport.safeArea?.right, "font-mono text-xl font-semibold text-primary")}
                  </div>
              </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
