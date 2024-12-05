"use client";
 
import { Paper, Skeleton } from "@mantine/core";

export default function SkeletonSlide() 
{
  return (
    <Paper
      radius="md"
      p="lg"
      withBorder
      style={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        minHeight: "320px",
        position: "relative",
        width: "240px",
      }}>
      {/* Badge skeleton */}
      <Skeleton height={28} width={60} radius="sm"/>
      <div style={{ 
        alignItems: "center", 
        display: "flex", 
        flex: 1, 
        flexDirection: "column",
        gap: "1.5rem",
        justifyContent: "center"
      }}>
        {/* Icon skeleton */}
        <Skeleton height={48} width={48} radius="sm"/>
        {/* Title skeleton */}
        <div style={{
          alignItems: "center", display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" 
        }}>
          <Skeleton height={24} width="80%" radius="sm"/>
          <Skeleton height={24} width="60%" radius="sm"/>
        </div>
      </div>
      {/* Status skeleton */}
      <div style={{
        alignItems: "center", display: "flex", gap: "6px", justifyContent: "center" 
      }}>
        <Skeleton height={20} width={20} radius="xl"/>
        <Skeleton height={20} width={80} radius="sm"/>
      </div>
    </Paper>
  );
}
