const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'focusgapp', 'admin-panel');
if (!fs.existsSync(path.join(root, 'src'))) {
  fs.mkdirSync(path.join(root, 'src'), { recursive: true });
}

fs.writeFileSync(path.join(root, 'tailwind.config.js'), `
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}" // Tremor requirement
  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {},
  },
  plugins: [require("@headlessui/tailwindcss")],
}
`);

fs.writeFileSync(path.join(root, 'postcss.config.js'), `
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`);

fs.writeFileSync(path.join(root, 'vite.config.ts'), `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
`);

fs.writeFileSync(path.join(root, 'index.html'), `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FocusGap Admin Analytics</title>
  </head>
  <body class="bg-[#050505] text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`);

fs.writeFileSync(path.join(root, 'src', 'index.css'), `
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}
`);

fs.writeFileSync(path.join(root, 'src', 'main.tsx'), `
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`);

fs.writeFileSync(path.join(root, 'src', 'App.tsx'), `
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';
import { Activity, Users, MousePointerClick, Zap } from 'lucide-react';

const funnelData = [
  { name: 'Hero', visitors: 1000, dropoff: 0, retained: 1000 },
  { name: 'Problem', visitors: 850, dropoff: 15, retained: 850 },
  { name: 'Features', visitors: 700, dropoff: 17, retained: 700 },
  { name: 'Main Product', visitors: 550, dropoff: 21, retained: 550 },
  { name: 'Final CTA', visitors: 300, dropoff: 45, retained: 300 },
];

const timeData = [
  { name: 'Hero', seconds: 8 },
  { name: 'Problem', seconds: 12 },
  { name: 'Features', seconds: 15 },
  { name: 'Main Product', seconds: 25 },
  { name: 'Final CTA', seconds: 18 },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">FocusGap Analytics Dashboard</h1>
            <p className="text-white/50">Universal Multi-tenant Tracking Portal</p>
          </div>
          <div className="flex gap-4">
            <span className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20 text-sm flex items-center gap-2">
              <Zap size={16} /> Live Data Active
            </span>
            <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-white/30 hidden">
              <option>Project: FocusGap Landing (focusgap.co)</option>
              <option>Project: Next App ...</option>
            </select>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Sessions', value: '1,248', desc: '+12% from yesterday', icon: Users },
            { label: 'Avg. Session Duration', value: '1m 45s', desc: '+5s from yesterday', icon: Activity },
            { label: 'Conversion Rate', value: '4.2%', desc: 'Clicked CTA', icon: MousePointerClick },
            { label: 'Best Variant', value: 'v2 (backup)', desc: '15% higher conv.', icon: Zap },
          ].map((stat, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-white/5 rounded-xl">
                  <stat.icon size={20} className="text-white/60" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-white/40 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-medium mb-6">Funnel Drop-offs (Mock)</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.02)'}}
                    contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Bar dataKey="retained" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-white/40 text-xs text-center mt-4">Tracks users moving through our hooked sections.</p>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-medium mb-6">Avg. Time Spent (Seconds)</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Line type="monotone" dataKey="seconds" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`);
console.log('Done generating admin panel frontend files!');
