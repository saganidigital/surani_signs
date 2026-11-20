import React from 'react';
import SignVisualizer from '../components/SignVisualizer';
import { useOrderModal } from '../context/OrderModalContext';

export default function VisualizerPage() {
  const { openOrderModal } = useOrderModal();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Main Interactive Sign Visualizer Stage */}
      <SignVisualizer onSelectDesign={(design) => openOrderModal(design)} />
    </div>
  );
}
