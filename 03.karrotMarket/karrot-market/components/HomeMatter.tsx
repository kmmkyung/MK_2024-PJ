"use client"

import Matter from "matter-js";
import { useEffect, useRef } from "react";

export default function HomeMatter() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isClick = false;

    const Engine = Matter.Engine;
    const Bodies = Matter.Bodies;
    const Render = Matter.Render;
    const World = Matter.World;
    const engine = Engine.create();
    const runner = Matter.Runner.create();
    engine.gravity.y = 1.5;

    const render = Render.create({
      element: canvasRef.current as HTMLElement,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: 'transparent',
        wireframes: false
      }
    });

    let ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - 50, window.innerWidth, 100, { isStatic: true, render: { fillStyle: 'transparent' } });
    let leftWall = Bodies.rectangle(10, window.innerHeight / 2, 20, window.innerHeight, { isStatic: true, render: { fillStyle: 'transparent' } });
    let rightWall = Bodies.rectangle(window.innerWidth - 10, window.innerHeight / 2, 20, window.innerHeight, { isStatic: true, render: { fillStyle: 'transparent' } });
    World.add(engine.world, [ground, leftWall, rightWall]);

    Matter.Runner.run(runner, engine);
    Render.run(render);

    // 클릭 및 터치 이벤트 공통 로직
    const addBodies = (x: number, y: number) => {
      const carrot = Bodies.rectangle(x - 15, y, 30, 30, {
        render: {
          sprite: {
            texture: "/image/carrot.png",
            xScale: 0.3,
            yScale: 0.3
          }
        },
        restitution: 0.8,
      });

      const rabbit = Bodies.rectangle(x + 15, y, 30, 30, {
        render: {
          sprite: {
            texture: "/image/rabbit.png",
            xScale: 0.3,
            yScale: 0.3
          }
        },
        restitution: 0.8,
      });

      Matter.World.add(engine.world, [carrot, rabbit]);
    };

    // 마우스 이벤트
    const onMouseDown = () => { isClick = true; };
    const onMouseUp = () => { isClick = false; };
    const onMouseLeave = () => { isClick = false; };
    const onMouseMove = (event: MouseEvent) => {
      if (isClick) {
        addBodies(event.clientX, event.clientY);
      }
    };

    // 터치 이벤트
    const onTouchStart = () => { isClick = true; };
    const onTouchEnd = () => { isClick = false; };
    const onTouchCancel = () => { isClick = false; };
    const onTouchMove = (event: TouchEvent) => {
      if (isClick && event.touches.length > 0) {
        const touch = event.touches[0];
        addBodies(touch.clientX, touch.clientY);
      }
    };

    // 이벤ㅌ 등록
    document.body.addEventListener('mousedown', onMouseDown);
    document.body.addEventListener('mouseup', onMouseUp);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mousemove', onMouseMove);

    document.body.addEventListener('touchstart', onTouchStart);
    document.body.addEventListener('touchend', onTouchEnd);
    document.body.addEventListener('touchcancel', onTouchCancel);
    document.body.addEventListener('touchmove', onTouchMove);

    // 리사이즈 처리
    function windowResize() {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      World.remove(engine.world, [ground, leftWall, rightWall]);

      ground = Bodies.rectangle(newWidth / 2, newHeight - 50, newWidth, 100, { isStatic: true, render: { fillStyle: 'transparent' } });
      leftWall = Bodies.rectangle(10, newHeight / 2, 20, newHeight, { isStatic: true, render: { fillStyle: 'transparent' } });
      rightWall = Bodies.rectangle(newWidth - 10, newHeight / 2, 20, newHeight, { isStatic: true, render: { fillStyle: 'transparent' } });

      World.add(engine.world, [ground, leftWall, rightWall]);

      render.canvas.width = newWidth;
      render.canvas.height = newHeight;
      render.options.width = newWidth;
      render.options.height = newHeight;
    }

    window.addEventListener("resize", windowResize);

    // 초기화
    return () => {
      window.removeEventListener("resize", windowResize);
      Matter.Render.stop(render);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
      render.canvas.remove();

      document.body.removeEventListener('mousedown', onMouseDown);
      document.body.removeEventListener('mouseup', onMouseUp);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mousemove', onMouseMove);

      document.body.removeEventListener('touchstart', onTouchStart);
      document.body.removeEventListener('touchend', onTouchEnd);
      document.body.removeEventListener('touchcancel', onTouchCancel);
      document.body.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <div ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10"></div>
  );
}
