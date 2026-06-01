import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react';

export default function ShaderBackground() {
  return (
    <Shader style={{ width: '100%', height: '100%' }}>
      <Swirl colorA="#ffffff" colorB="#e8f0fe" detail={1.7} />
      <ChromaFlow
        baseColor="#ffffff"
        downColor="#1D4ED8"
        leftColor="#1D4ED8"
        rightColor="#1D4ED8"
        upColor="#1D4ED8"
        momentum={13}
        radius={3.5}
      />
      <FlutedGlass
        aberration={0.61}
        angle={31}
        frequency={8}
        highlight={0.12}
        highlightSoftness={0}
        lightAngle={-90}
        refraction={4}
        shape="rounded"
        softness={1}
        speed={0.15}
      />
      <FilmGrain strength={0.05} />
    </Shader>
  );
}
