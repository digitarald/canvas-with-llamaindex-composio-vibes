"use client";

import { useEffect, useRef } from "react";
import type { Item } from "@/lib/canvas/types";

interface ConnectionLinesProps {
  items: Item[];
}

export function ConnectionLines({ items }: ConnectionLinesProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const container = svg.parentElement;
    if (!container) return;

    // Clear existing lines
    svg.innerHTML = "";

    // Find service connections based on dependencies and related services
    const connections: Array<{ from: string; to: string }> = [];
    
    items.forEach((item) => {
      if (item.type === "service" || item.type === "api-gateway" || item.type === "message-queue") {
        const data = item.data as { field5?: string[] };
        const dependencies = data.field5 || [];
        
        if (Array.isArray(dependencies)) {
          dependencies.forEach((dep: string) => {
            // Find matching items by name or ID
            const targetItem = items.find(i => 
              i.name.toLowerCase().includes(dep.toLowerCase()) ||
              (i.data as { field1?: string }).field1?.toLowerCase().includes(dep.toLowerCase())
            );
            
            if (targetItem) {
              connections.push({ from: item.id, to: targetItem.id });
            }
          });
        }
      }
      
      // Connect issues to affected services
      if (item.type === "issue") {
        const data = item.data as { field4?: string };
        const affectedServices = data.field4?.split(",") || [];
        
        affectedServices.forEach((serviceName: string) => {
          const trimmedName = serviceName.trim();
          const targetItem = items.find(i => 
            i.name.toLowerCase().includes(trimmedName.toLowerCase()) ||
            (i.data as { field1?: string }).field1?.toLowerCase().includes(trimmedName.toLowerCase())
          );
          
          if (targetItem) {
            connections.push({ from: item.id, to: targetItem.id });
          }
        });
      }
    });

    // Draw connections
    connections.forEach(({ from, to }) => {
      const fromElement = container.querySelector(`[data-item-id="${from}"]`);
      const toElement = container.querySelector(`[data-item-id="${to}"]`);
      
      if (fromElement && toElement) {
        const fromRect = fromElement.getBoundingClientRect();
        const toRect = toElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        const fromX = fromRect.left + fromRect.width / 2 - containerRect.left;
        const fromY = fromRect.top + fromRect.height / 2 - containerRect.top;
        const toX = toRect.left + toRect.width / 2 - containerRect.left;
        const toY = toRect.top + toRect.height / 2 - containerRect.top;
        
        // Create curved line
        const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const midX = (fromX + toX) / 2;
        const midY = (fromY + toY) / 2;
        const controlOffset = 50;
        
        const d = `M ${fromX} ${fromY} Q ${midX} ${midY - controlOffset} ${toX} ${toY}`;
        
        line.setAttribute("d", d);
        line.setAttribute("stroke", "#6366f1");
        line.setAttribute("stroke-width", "2");
        line.setAttribute("fill", "none");
        line.setAttribute("stroke-dasharray", "5,5");
        line.setAttribute("opacity", "0.6");
        
        // Add arrowhead
        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
        marker.setAttribute("id", `arrowhead-${from}-${to}`);
        marker.setAttribute("markerWidth", "10");
        marker.setAttribute("markerHeight", "7");
        marker.setAttribute("refX", "9");
        marker.setAttribute("refY", "3.5");
        marker.setAttribute("orient", "auto");
        
        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygon.setAttribute("points", "0 0, 10 3.5, 0 7");
        polygon.setAttribute("fill", "#6366f1");
        
        marker.appendChild(polygon);
        defs.appendChild(marker);
        svg.appendChild(defs);
        
        line.setAttribute("marker-end", `url(#arrowhead-${from}-${to})`);
        svg.appendChild(line);
      }
    });

    // Update SVG size to match container
    const resizeObserver = new ResizeObserver(() => {
      if (container) {
        svg.setAttribute("width", container.scrollWidth.toString());
        svg.setAttribute("height", container.scrollHeight.toString());
      }
    });
    
    resizeObserver.observe(container);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [items]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default ConnectionLines;