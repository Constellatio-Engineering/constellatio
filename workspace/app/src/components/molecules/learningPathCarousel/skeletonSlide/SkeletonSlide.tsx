'use client';

import { Paper, Skeleton } from '@mantine/core';

export default  function SkeletonSlide() {
  return (
    <Paper
      radius="md"
      p="lg"
      withBorder
      style={{
        backgroundColor: 'white',
        minHeight: '320px',
        width: '240px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        position: 'relative',
      }}
    >
      {/* Badge skeleton */}
      <Skeleton height={28} width={60} radius="sm" />

      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Icon skeleton */}
        <Skeleton height={48} width={48} radius="sm" />

        {/* Title skeleton */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
          <Skeleton height={24} width="80%" radius="sm" />
          <Skeleton height={24} width="60%" radius="sm" />
        </div>
      </div>

      {/* Status skeleton */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
        <Skeleton height={20} width={20} radius="xl" />
        <Skeleton height={20} width={80} radius="sm" />
      </div>
    </Paper>
  );
}