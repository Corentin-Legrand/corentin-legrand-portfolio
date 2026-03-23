"use client";

import React, { useEffect, useRef, useCallback } from "react";

interface GameOfLifeProps {
  cellSize?: number;
  color?: string;
  speed?: number;
  edgeFade?: number;
  className?: string;
  style?: React.CSSProperties;
  initialDensity?: number;
}

const GameOfLife: React.FC<GameOfLifeProps> = ({
  cellSize = 6,
  color = "#F7E7CE",
  speed = 100,
  edgeFade = 0.15,
  className,
  style,
  initialDensity = 0.08,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    grid: Uint8Array;
    nextGrid: Uint8Array;
    cols: number;
    rows: number;
    running: boolean;
    animId: number | null;
    lastTick: number;
  } | null>(null);

  const parseColor = (hex: string) => {
    const c = hex.replace("#", "");
    return {
      r: parseInt(c.slice(0, 2), 16),
      g: parseInt(c.slice(2, 4), 16),
      b: parseInt(c.slice(4, 6), 16),
    };
  };

  const initGrid = useCallback(
    (cols: number, rows: number, density: number) => {
      const grid = new Uint8Array(cols * rows);
      for (let i = 0; i < grid.length; i++) {
        grid[i] = Math.random() < density ? 1 : 0;
      }
      return grid;
    },
    []
  );

  const countNeighbors = (
    grid: Uint8Array,
    cols: number,
    rows: number,
    x: number,
    y: number
  ) => {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = (x + dx + cols) % cols;
        const ny = (y + dy + rows) % rows;
        count += grid[ny * cols + nx];
      }
    }
    return count;
  };

  const step = (
    grid: Uint8Array,
    nextGrid: Uint8Array,
    cols: number,
    rows: number
  ) => {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const idx = y * cols + x;
        const neighbors = countNeighbors(grid, cols, rows, x, y);
        const alive = grid[idx];
        if (alive) {
          nextGrid[idx] = neighbors === 2 || neighbors === 3 ? 1 : 0;
        } else {
          nextGrid[idx] = neighbors === 3 ? 1 : 0;
        }
      }
    }
  };

  const draw = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      grid: Uint8Array,
      cols: number,
      rows: number,
      width: number,
      height: number
    ) => {
      const { r, g, b } = parseColor(color);

      ctx.clearRect(0, 0, width, height);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (!grid[y * cols + x]) continue;

          let alpha = 1;
          if (edgeFade > 0) {
            const nx = x / cols;
            const ny = y / rows;
            const edge = Math.min(nx, ny, 1 - nx, 1 - ny);
            alpha = Math.min(edge / edgeFade, 1);
          }

          if (alpha <= 0) continue;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
        }
      }
    },
    [color, cellSize, edgeFade]
  );

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      canvas.width = w;
      canvas.height = h;

      const cols = Math.floor(w / cellSize);
      const rows = Math.floor(h / cellSize);

      const grid = initGrid(cols, rows, initialDensity);
      const nextGrid = new Uint8Array(cols * rows);

      stateRef.current = {
        grid,
        nextGrid,
        cols,
        rows,
        running: true,
        animId: null,
        lastTick: 0,
      };

      draw(ctx, grid, cols, rows, w, h);
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const animate = (time: number) => {
      const s = stateRef.current;
      if (!s || !s.running) return;

      if (time - s.lastTick >= speed) {
        s.lastTick = time;
        step(s.grid, s.nextGrid, s.cols, s.rows);
        // Swap grids
        const temp = s.grid;
        s.grid = s.nextGrid;
        s.nextGrid = temp;
        draw(ctx, s.grid, s.cols, s.rows, canvas.width, canvas.height);
      }

      s.animId = requestAnimationFrame(animate);
    };

    stateRef.current!.animId = requestAnimationFrame(animate);

    return () => {
      ro.disconnect();
      if (stateRef.current?.animId) {
        cancelAnimationFrame(stateRef.current.animId);
      }
      if (stateRef.current) stateRef.current.running = false;
    };
  }, [cellSize, speed, initialDensity, color, edgeFade, draw, initGrid]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const s = stateRef.current;
      const canvas = canvasRef.current;
      if (!s || !canvas) return;

      const rect = canvas.getBoundingClientRect();
      const cx = Math.floor((e.clientX - rect.left) / cellSize);
      const cy = Math.floor((e.clientY - rect.top) / cellSize);

      // Place a 3x3 block of cells
      const offsets = [
        [0, 0],
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
        [1, 1],
        [-1, -1],
        [1, -1],
        [-1, 1],
      ];
      for (const [dx, dy] of offsets) {
        const nx = (cx + dx + s.cols) % s.cols;
        const ny = (cy + dy + s.rows) % s.rows;
        s.grid[ny * s.cols + nx] = 1;
      }
    },
    [cellSize]
  );

  return (
    <div ref={containerRef} className={className} style={style}>
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default GameOfLife;
