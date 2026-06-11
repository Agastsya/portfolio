import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Three.js scene library for the portfolio. One component, six variants:
 *
 *   waves   — rolling particle ocean (hero backdrop)
 *   network — nodes + edges graph, slow sway (Scamurai: scam analytics)
 *   streams — particles flowing along lanes (SpawnV2: service pipeline)
 *   terrain — wireframe data-terrain with glow dots (records platform)
 *   warp    — starfield rushing past, speeds up as you scroll (art band)
 *   orbit   — particle globe with an orbiting ring (art band)
 *
 * Every scene: pauses off-screen, eases toward the mouse, renders a single
 * static frame under prefers-reduced-motion, and degrades silently without
 * WebGL.
 */

const AMBER = new THREE.Color("#E8A84C");
const BRIGHT = new THREE.Color("#FFC979");

function amberColors(n, brightChance = 0.08, min = 0.25, range = 0.6) {
  const colors = new Float32Array(n * 3);
  const tmp = new THREE.Color();
  for (let i = 0; i < n; i++) {
    const glow = Math.random();
    const isBright = glow > 1 - brightChance;
    tmp.copy(isBright ? BRIGHT : AMBER).multiplyScalar(isBright ? 1 : min + glow * range);
    colors[i * 3] = tmp.r; colors[i * 3 + 1] = tmp.g; colors[i * 3 + 2] = tmp.b;
  }
  return colors;
}

function pointsMat(size = 0.05, opacity = 0.85) {
  return new THREE.PointsMaterial({
    size, vertexColors: true, transparent: true, opacity,
    blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
  });
}

function pointsGeo(positions, brightChance, min, range) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(amberColors(positions.length / 3, brightChance, min, range), 3));
  return geo;
}

/* ---------------------------------------------------------------- waves */
function waves(scene, camera) {
  camera.position.set(0, 2.4, 7.5);
  const COLS = 150, ROWS = 56, N = COLS * ROWS;
  const positions = new Float32Array(N * 3);
  const phases = new Float32Array(N);
  for (let r = 0, i = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++, i++) {
      positions[i * 3] = (c / (COLS - 1) - 0.5) * 24;
      positions[i * 3 + 2] = (r / (ROWS - 1) - 0.5) * 13;
      phases[i] = Math.random() * Math.PI * 2;
    }
  }
  const geo = pointsGeo(positions, 0.08, 0.25, 0.6);
  scene.add(new THREE.Points(geo, pointsMat(0.05)));
  const pos = geo.attributes.position.array;
  return (t, { mouse, scroll }) => {
    for (let i = 0; i < N; i++) {
      const x = pos[i * 3], z = pos[i * 3 + 2];
      pos[i * 3 + 1] =
        Math.sin(x * 0.42 + t * 0.85) * 0.5 +
        Math.cos(z * 0.55 + t * 0.6 + x * 0.2) * 0.38 +
        Math.sin(phases[i] + t * 0.7) * 0.07;
    }
    geo.attributes.position.needsUpdate = true;
    camera.position.x = mouse.x * 0.9;
    camera.position.y = 2.4 + mouse.y * -0.3 + scroll() * 0.0022;
    camera.lookAt(0, -0.4, 0);
    scene.rotation.y = Math.sin(t * 0.05) * 0.06;
  };
}

/* -------------------------------------------------------------- network */
function network(scene, camera) {
  camera.position.set(0, 0, 9);
  const N = 110;
  const positions = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 17;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }
  const edges = [];
  for (let a = 0; a < N && edges.length < 280; a++) {
    for (let b = a + 1; b < N && edges.length < 280; b++) {
      const dx = positions[a * 3] - positions[b * 3];
      const dy = positions[a * 3 + 1] - positions[b * 3 + 1];
      const dz = positions[a * 3 + 2] - positions[b * 3 + 2];
      if (dx * dx + dy * dy + dz * dz < 2.6 * 2.6) edges.push(a, b);
    }
  }
  const linePos = new Float32Array(edges.length * 3);
  edges.forEach((v, i) => {
    linePos[i * 3] = positions[v * 3];
    linePos[i * 3 + 1] = positions[v * 3 + 1];
    linePos[i * 3 + 2] = positions[v * 3 + 2];
  });
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
  const group = new THREE.Group();
  const mat = pointsMat(0.12, 0.95);
  group.add(new THREE.Points(pointsGeo(positions, 0.16, 0.35, 0.6), mat));
  group.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
    color: AMBER, transparent: true, opacity: 0.13,
    blending: THREE.AdditiveBlending, depthWrite: false,
  })));
  scene.add(group);
  return (t, { mouse }) => {
    group.rotation.y = Math.sin(t * 0.1) * 0.3 + mouse.x * 0.12;
    group.rotation.x = mouse.y * 0.07;
    mat.size = 0.12 + Math.sin(t * 1.6) * 0.02;
  };
}

/* -------------------------------------------------------------- streams */
function streams(scene, camera) {
  camera.position.set(0, 0, 9);
  const LANES = 6, PER = 300, N = LANES * PER;
  const positions = new Float32Array(N * 3);
  const prog = new Float32Array(N);
  const speed = new Float32Array(N);
  const lane = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    lane[i] = ((i % LANES) - (LANES - 1) / 2) * 1.15;
    prog[i] = Math.random();
    speed[i] = 0.05 + Math.random() * 0.09;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
  }
  const geo = pointsGeo(positions, 0.1, 0.3, 0.6);
  scene.add(new THREE.Points(geo, pointsMat(0.07, 0.9)));
  const pos = geo.attributes.position.array;
  return (t, { mouse, dt }) => {
    for (let i = 0; i < N; i++) {
      prog[i] += speed[i] * dt;
      if (prog[i] > 1) prog[i] -= 1;
      const x = prog[i] * 26 - 13;
      pos[i * 3] = x;
      pos[i * 3 + 1] = lane[i] + Math.sin(x * 0.45 + lane[i] * 2) * 0.5;
    }
    geo.attributes.position.needsUpdate = true;
    camera.position.y = mouse.y * -0.5;
    camera.position.x = mouse.x * 0.5;
    camera.lookAt(0, 0, 0);
  };
}

/* -------------------------------------------------------------- terrain */
function terrain(scene, camera) {
  camera.position.set(0, 3.4, 8.5);
  const geo = new THREE.PlaneGeometry(26, 16, 64, 36);
  geo.rotateX(-Math.PI / 2);
  const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
    color: AMBER, wireframe: true, transparent: true, opacity: 0.14,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  const n = geo.attributes.position.count;
  geo.setAttribute("color", new THREE.BufferAttribute(amberColors(n, 0.1, 0.3, 0.55), 3));
  const dots = new THREE.Points(geo, pointsMat(0.06, 0.6));
  scene.add(mesh, dots);
  const pos = geo.attributes.position.array;
  return (t, { mouse }) => {
    for (let i = 0; i < n; i++) {
      const x = pos[i * 3], z = pos[i * 3 + 2];
      const h = Math.sin(x * 0.35 + t * 0.5) * 0.7 + Math.cos(z * 0.5 + t * 0.35 + x * 0.12) * 0.55;
      pos[i * 3 + 1] = Math.round(h * 3) / 3; // terraced, like stacked records
    }
    geo.attributes.position.needsUpdate = true;
    camera.position.x = mouse.x * 0.8;
    camera.lookAt(0, 0.3, -1);
  };
}

/* ----------------------------------------------------------------- warp */
function warp(scene, camera) {
  camera.position.set(0, 0, 8);
  camera.fov = 75;
  camera.updateProjectionMatrix();
  const N = 1700;
  const positions = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 2] = Math.random() * -31 + 6;
  }
  const geo = pointsGeo(positions, 0.12, 0.35, 0.6);
  scene.add(new THREE.Points(geo, pointsMat(0.1, 0.95)));
  const pos = geo.attributes.position.array;
  return (t, { dt, scrollVel, mouse }) => {
    const v = 2.2 + Math.min(Math.abs(scrollVel) * 0.012, 9);
    for (let i = 0; i < N; i++) {
      pos[i * 3 + 2] += v * dt;
      if (pos[i * 3 + 2] > 7) pos[i * 3 + 2] -= 31;
    }
    geo.attributes.position.needsUpdate = true;
    camera.position.x = mouse.x * 0.6;
    camera.position.y = mouse.y * -0.4;
  };
}

/* -------------------------------------------------------------- planets */
function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, "rgba(255, 226, 178, 1)");
  grad.addColorStop(0.22, "rgba(255, 201, 121, 0.65)");
  grad.addColorStop(0.55, "rgba(232, 168, 76, 0.18)");
  grad.addColorStop(1, "rgba(232, 168, 76, 0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

function planets(scene, camera) {
  camera.position.set(0, 2.3, 6.6);
  const system = new THREE.Group();
  system.rotation.x = 0.12;
  scene.add(system);

  // sun: bright core + sprite halo + the light every planet is shaded by
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 24, 16),
    new THREE.MeshBasicMaterial({ color: 0xffe2b2 })
  );
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture(), color: 0xffc979, transparent: true, opacity: 0.9,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  halo.scale.setScalar(3.4);
  const sunlight = new THREE.PointLight(0xffc979, 40, 0, 2);
  system.add(sun, halo, sunlight, new THREE.AmbientLight(0x332211, 0.7));

  const SPECS = [
    { r: 1.6, size: 0.10, color: 0xe8a84c, tilt: 0.10 },
    { r: 2.3, size: 0.17, color: 0xc98c4a, tilt: -0.18, moon: true },
    { r: 3.2, size: 0.13, color: 0x8e94a3, tilt: 0.26 },
    { r: 4.1, size: 0.24, color: 0xe8a84c, tilt: -0.08, ring: true },
    { r: 5.1, size: 0.12, color: 0xb87333, tilt: 0.20 },
    { r: 6.0, size: 0.18, color: 0x5a6b8c, tilt: -0.30, moon: true },
  ];
  const bodies = SPECS.map((s) => {
    const pivot = new THREE.Group();      // orbital plane (inclined)
    pivot.rotation.x = s.tilt;
    system.add(pivot);

    const seg = 96;                       // orbit path line
    const lp = new Float32Array(seg * 3);
    for (let i = 0; i < seg; i++) {
      const a = (i / seg) * Math.PI * 2;
      lp[i * 3] = Math.cos(a) * s.r;
      lp[i * 3 + 2] = Math.sin(a) * s.r;
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(lp, 3));
    pivot.add(new THREE.LineLoop(lineGeo, new THREE.LineBasicMaterial({
      color: AMBER, transparent: true, opacity: 0.18,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })));

    const holder = new THREE.Group();     // carries planet + ring + moon
    pivot.add(holder);
    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(s.size, 20, 14),
      new THREE.MeshStandardMaterial({
        color: s.color, roughness: 0.65, metalness: 0.25,
        emissive: s.color, emissiveIntensity: 0.12,
      })
    );
    holder.add(planet);
    if (s.ring) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(s.size * 1.5, s.size * 2.4, 40),
        new THREE.MeshBasicMaterial({
          color: AMBER, side: THREE.DoubleSide, transparent: true, opacity: 0.3,
          blending: THREE.AdditiveBlending, depthWrite: false,
        })
      );
      ring.rotation.x = Math.PI / 2 - 0.35;
      holder.add(ring);
    }
    let moonPivot = null;
    if (s.moon) {
      moonPivot = new THREE.Group();
      const moon = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 10, 8),
        new THREE.MeshStandardMaterial({ color: 0x9aa0ae, roughness: 0.9, emissive: 0x9aa0ae, emissiveIntensity: 0.1 })
      );
      moon.position.x = s.size + 0.22;
      moonPivot.add(moon);
      holder.add(moonPivot);
    }
    // Kepler-flavoured: inner planets orbit faster
    return { holder, planet, moonPivot, r: s.r, speed: 0.55 / Math.pow(s.r, 1.4), a0: Math.random() * Math.PI * 2 };
  });

  // starfield behind everything
  const NS = 420;
  const starPos = new Float32Array(NS * 3);
  for (let i = 0; i < NS; i++) {
    starPos[i * 3] = (Math.random() - 0.5) * 38;
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
    starPos[i * 3 + 2] = -6 - Math.random() * 16;
  }
  scene.add(new THREE.Points(pointsGeo(starPos, 0.12, 0.3, 0.55), pointsMat(0.07, 0.75)));

  return (t, { mouse }) => {
    for (const b of bodies) {
      const a = b.a0 + t * b.speed;
      b.holder.position.set(Math.cos(a) * b.r, 0, Math.sin(a) * b.r);
      b.planet.rotation.y = t * 0.9;
      if (b.moonPivot) b.moonPivot.rotation.y = t * 1.7;
    }
    halo.material.opacity = 0.85 + Math.sin(t * 1.8) * 0.08;
    system.rotation.y = t * 0.045 + mouse.x * 0.18;
    camera.position.y = 2.3 + mouse.y * -0.5;
    camera.lookAt(0, 0, 0);
  };
}

const BUILDERS = { waves, network, streams, terrain, warp, planets };

/* ------------------------------------------------------------ component */
export default function ThreeScene({ variant = "waves", className = "" }) {
  const mount = useRef(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
    } catch {
      return; // no WebGL → plain background
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block;";
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 80);
    const update = (BUILDERS[variant] || BUILDERS.waves)(scene, camera);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouse = (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    let scrollY = window.scrollY, scrollVel = 0;
    const onScroll = () => {
      scrollVel = window.scrollY - scrollY;
      scrollY = window.scrollY;
    };

    const resize = () => {
      const w = el.clientWidth || 1, h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(el);

    let raf = 0;
    const clock = new THREE.Clock();
    const ctx = { mouse, dt: 0, scroll: () => scrollY, scrollVel: 0 };
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      ctx.dt = Math.min(clock.getDelta(), 0.05);
      ctx.scrollVel = scrollVel;
      scrollVel *= 0.9; // decay between scroll events
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      update(clock.elapsedTime, ctx);
      renderer.render(scene, camera);
    };

    if (reduce) {
      ctx.dt = 1.5;
      update(1.5, ctx);
      renderer.render(scene, camera); // single static frame
    } else {
      window.addEventListener("mousemove", onMouse, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      frame();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      io.disconnect();
      const seen = new Set();
      scene.traverse((o) => {
        if (o.geometry && !seen.has(o.geometry)) { seen.add(o.geometry); o.geometry.dispose(); }
        if (o.material && !seen.has(o.material)) {
          seen.add(o.material);
          if (o.material.map) o.material.map.dispose();
          o.material.dispose();
        }
      });
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [variant]);

  return <div ref={mount} className={`three-scene ${className}`} aria-hidden="true" />;
}
