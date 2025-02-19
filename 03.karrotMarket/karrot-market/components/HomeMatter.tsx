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

    // 렌더 설정
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

    // 바닥 & 벽 만들기 (초기 설정)
    let ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - 50, window.innerWidth, 100, { isStatic: true , render:{fillStyle:'transparent'}});
    let leftWall = Bodies.rectangle(10, window.innerHeight / 2, 20, window.innerHeight, { isStatic: true , render:{fillStyle:'transparent'}});
    let rightWall = Bodies.rectangle(window.innerWidth - 10, window.innerHeight / 2, 20, window.innerHeight, { isStatic: true , render:{fillStyle:'transparent'}});
    World.add(engine.world, [ground, leftWall, rightWall]);

    // 엔진 구동 및 렌더 실행
    Matter.Runner.run(runner, engine);
    Render.run(render);

    document.body.addEventListener('mousedown', ()=>{
      isClick = true
    })
    document.body.addEventListener('mouseup', ()=>{
      isClick = false
    })
    document.body.addEventListener('mouseleave', ()=>{
      isClick = false
    })
    document.body.addEventListener('mousemove', event => {
      if(isClick){
        const carrot = Bodies.rectangle( event.clientX-15, event.clientY, 30, 30, {
          render: {
            sprite: {
              texture: "/carrot.png",
              xScale: 0.3, 
              yScale: 0.3 
            }
          },
          restitution: 0.8,
        })

        const rabbit = Bodies.rectangle( event.clientX+15, event.clientY, 30, 30, {
          render: {
            sprite: {
              texture: "/rabbit.png",
              xScale: 0.3, 
              yScale: 0.3 
            }
          },
          restitution: 0.8,
        });

        Matter.World.add(engine.world, [carrot, rabbit])
      }
    })

    // 창 크기 변경 감지 (리사이징 대응)
    function windowResize() {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      // 기존 바디 제거 후, 새로운 크기로 다시 추가
      World.remove(engine.world, [ground, leftWall, rightWall]);

      ground = Bodies.rectangle(newWidth / 2, newHeight - 50, newWidth, 100, { isStatic: true , render:{fillStyle:'transparent'}});
      leftWall = Bodies.rectangle(10, newHeight / 2, 20, newHeight, { isStatic: true , render:{fillStyle:'transparent'}});
      rightWall = Bodies.rectangle(newWidth - 10, newHeight / 2, 20, newHeight, { isStatic: true , render:{fillStyle:'transparent'}});

      World.add(engine.world, [ground, leftWall, rightWall]);

      // 캔버스 크기 업데이트 (렌더링 크기 수정)
      render.canvas.width = newWidth;
      render.canvas.height = newHeight;
      render.options.width = newWidth;
      render.options.height = newHeight;
    }

    window.addEventListener("resize", windowResize);

    return () => {
      window.removeEventListener("resize", windowResize);
      Matter.Render.stop(render);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  return (
    <div ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10"></div>
  );
}


