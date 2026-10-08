import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  originalRadius: number;
}

interface DataPacket {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      '#06b6d4', // Cyan (Streaming / Spark)
      '#3b82f6', // Blue (Snowflake / HVR)
      '#8b5cf6', // Purple (Lakehouse / MDM)
      '#10b981', // Emerald (Valid data)
      '#f59e0b', // Amber (Databricks flame)
    ];

    const nodeCount = Math.min(Math.floor((width * height) / 28000), 55);
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const radius = Math.random() * 2 + 1.5;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius,
        originalRadius: radius,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const packets: DataPacket[] = [];
    const maxPackets = 16;

    let mouseX = -9999;
    let mouseY = -9999;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    const maxDistance = 140;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle background ambient gradient overlay
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.2,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, 'rgba(15, 23, 42, 0.45)');
      bgGrad.addColorStop(0.6, 'rgba(3, 7, 18, 0.85)');
      bgGrad.addColorStop(1, 'rgba(0, 0, 0, 0.98)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        // Bounce from boundaries
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Interactive mouse interaction
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        if (distToMouse < 130) {
          const force = (130 - distToMouse) / 130;
          node.x -= (dx / distToMouse) * force * 1.5;
          node.y -= (dy / distToMouse) * force * 1.5;
          node.radius = node.originalRadius + force * 2.5;
        } else {
          node.radius = node.originalRadius;
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = node.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // Draw connection lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();

            // Randomly spawn data packet between connected nodes
            if (packets.length < maxPackets && Math.random() < 0.003) {
              packets.push({
                fromNode: i,
                toNode: j,
                progress: 0,
                speed: 0.008 + Math.random() * 0.012,
                color: Math.random() > 0.5 ? '#38bdf8' : '#a855f7',
              });
            }
          }
        }
      }

      // Update and draw streaming data packets
      for (let k = packets.length - 1; k >= 0; k--) {
        const p = packets[k];
        p.progress += p.speed;

        const from = nodes[p.fromNode];
        const to = nodes[p.toNode];

        if (!from || !to || p.progress >= 1) {
          packets.splice(k, 1);
          continue;
        }

        const px = from.x + (to.x - from.x) * p.progress;
        const py = from.y + (to.y - from.y) * p.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      style={{ display: 'block' }}
    />
  );
};
