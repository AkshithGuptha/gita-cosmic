import { useCallback, useEffect, useRef, useState } from "react";

let globalAudioContext: AudioContext | null = null;
let globalGainNode: GainNode | null = null;
let globalOscillators: OscillatorNode[] = [];
let isGloballyPlaying = false;

function getAudioContext(): AudioContext {
  if (!globalAudioContext) {
    globalAudioContext = new AudioContext();
    globalGainNode = globalAudioContext.createGain();
    globalGainNode.gain.value = 0.08;
    globalGainNode.connect(globalAudioContext.destination);
  }
  return globalAudioContext;
}

function startAmbientSound() {
  if (isGloballyPlaying) return;
  const ctx = getAudioContext();
  if (!globalGainNode) return;

  const frequencies = [174, 285, 396, 528];
  globalOscillators = frequencies.map((freq, i) => {
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.frequency.value = freq;
    osc.type = "sine";
    oscGain.gain.value = 0.015 - i * 0.002;
    osc.connect(oscGain);
    oscGain.connect(globalGainNode!);

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.1 + i * 0.05;
    lfoGain.gain.value = 1;
    lfo.connect(lfoGain);
    lfoGain.connect(oscGain.gain);
    lfo.start();

    osc.start();
    return osc;
  });

  isGloballyPlaying = true;
}

function stopAmbientSound() {
  if (!isGloballyPlaying) return;
  for (const osc of globalOscillators) {
    try {
      osc.stop();
    } catch {
      // already stopped
    }
  }
  globalOscillators = [];
  isGloballyPlaying = false;
}

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState<boolean>(() => {
    return localStorage.getItem("gita_music") === "on";
  });
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const savedOn = localStorage.getItem("gita_music") === "on";
      if (savedOn) {
        startAmbientSound();
      }
    }
    // empty deps: run once on mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("gita_music", isPlaying ? "on" : "off");
  }, [isPlaying]);

  const toggle = useCallback(async () => {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") {
      await ctx.resume();
    }
    setIsPlaying((prev) => {
      if (prev) {
        stopAmbientSound();
        return false;
      }
      startAmbientSound();
      return true;
    });
  }, []);

  const play = useCallback(async () => {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") await ctx.resume();
    startAmbientSound();
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    stopAmbientSound();
    setIsPlaying(false);
  }, []);

  return { isPlaying, toggle, play, pause };
}
