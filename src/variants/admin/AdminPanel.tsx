import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Activity, Users, Zap, Lock, EyeOff, Clock, 
  MapPin, User, Mail, Flame, TrendingUp, Filter, 
  Smartphone, Monitor, ChevronRight, RefreshCw, 
  MousePointer2, Target, BarChart2, Percent, AlertTriangle,
  ArrowDown, Globe, Award, ChevronDown
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const host = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';
const VARIANT_SECTIONS: Record<string, string[]> = {
  v1: ['Hero', 'Problem', 'MainProduct', 'Features', 'ComponentGrid', 'FounderStory', 'FinalCTA'],
  v2: ['Hero', 'Cinematic', 'About', 'Manufacturing', 'Magnetic', 'Specs', 'Modules', 'Timeline', 'Pricing', 'FAQ', 'Testimonials', 'FinalCTA'],
  v3: ['Hero', 'Problem', 'NumbersBar', 'MainProduct', 'Features', 'ComponentGrid', 'FounderStory', 'FinalCTA'],
  v4: ['Hero', 'Cinematic', 'About', 'Manufacturing', 'Magnetic', 'Specs', 'Modules', 'Timeline', 'Pricing', 'FAQ', 'Testimonials', 'FinalCTA'],
  all: ['Hero', 'Problem', 'MainProduct', 'Features', 'ComponentGrid', 'FounderStory', 'FinalCTA'],
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const safeTime = (d: any) => {
  try { const date = new Date(d); return isNaN(date.getTime()) ? '--:--' : date.toLocaleTimeString(); } 
  catch { return '--:--'; }
};
const safeDist = (d: any) => {
  try { const date = new Date(d); return isNaN(date.getTime()) ? 'recently' : formatDistanceToNow(date) + ' ago'; }
  catch { return 'recently'; }
};

const getHeatColor = (s: any): string => {
  const sec = parseFloat(s) || 0;
  if (sec === 0) return 'rgba(255,255,255,0.04)';
  if (sec < 5) return '#3b82f6';
  if (sec < 15) return '#22c55e';
  if (sec < 30) return '#eab308';
  return '#ef4444';
};

const getHeatLabel = (s: any): string => {
  const sec = parseFloat(s) || 0;
  if (sec === 0) return 'No data';
  if (sec < 5) return 'Cold';
  if (sec < 15) return 'Warm';
  if (sec < 30) return 'Hot';
  return 'Fired';
};

const formatSec = (s: number): string => {
  if (s < 60) return `${Math.round(s)}s`;
  return `${Math.floor(s / 60)}m ${Math.round(s % 60)}s`;
};

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

const KpiCard = ({ label, value, sub, icon: Icon, accent = 'text-white', trend }: any) => (
  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl relative overflow-hidden group hover:border-white/10 transition-all duration-300">
    <Icon size={80} className="absolute -top-3 -right-3 p-5 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity rotate-12" />
    <p className="text-white/20 text-[10px] uppercase font-black tracking-[0.2em] mb-2">{label}</p>
    <h3 className={`text-4xl font-black ${accent} tracking-tighter leading-none mb-1`}>{value}</h3>
    {sub && <p className="text-[10px] text-white/20 font-bold uppercase tracking-wider mt-1">{sub}</p>}
    {trend !== undefined && (
      <div className={`absolute top-4 right-4 text-[10px] font-black px-2 py-1 rounded-lg ${trend > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
        {trend > 0 ? '+' : ''}{trend}%
      </div>
    )}
  </div>
);

const FunnelRow = ({ item, maxVisitors, isDropOff }: { item: any; maxVisitors: number; isDropOff: boolean }) => {
  const color = getHeatColor(item.avgSeconds);
  const widthPct = maxVisitors > 0 ? (item.visitors / maxVisitors) * 100 : 0;
  return (
    <div className={`relative flex items-center gap-4 p-3 rounded-2xl border transition-all ${isDropOff ? 'border-red-500/20 bg-red-500/[0.03]' : 'border-white/5 bg-white/[0.02]'}`}>
      <div className="w-1 h-full absolute left-0 inset-y-0 rounded-l-2xl" style={{ backgroundColor: color }} />
      <div className="ml-3 w-32 shrink-0">
        <div className="text-[11px] font-black text-white/70 uppercase tracking-tight">{item.name}</div>
        <div className="text-[9px] font-bold mt-0.5" style={{ color }}>{getHeatLabel(item.avgSeconds)}</div>
      </div>
      <div className="flex-1 h-5 bg-white/5 rounded-full overflow-hidden relative">
        <div 
          className="h-full rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${widthPct}%`, backgroundColor: color, opacity: 0.7 }} 
        />
      </div>
      <div className="text-right shrink-0 w-28">
        <div className="text-[11px] font-black text-white">{formatSec(parseFloat(item.avgSeconds) || 0)} <span className="text-white/20 font-normal">avg</span></div>
        <div className="text-[9px] text-white/30 font-bold">{item.visitors} visitors · {Math.round(widthPct)}% reach</div>
      </div>
      {isDropOff && <AlertTriangle size={14} className="text-red-400 shrink-0" />}
    </div>
  );
};

const LeadCard = ({ s, selected, onClick }: any) => (
  <div 
    onClick={onClick}
    className={`group p-4 rounded-2xl border cursor-pointer flex gap-4 items-center transition-all ${
      selected ? 'bg-blue-600 border-white/20 shadow-2xl scale-[1.01]' : 
      'bg-white/[0.03] border-white/5 hover:bg-white/[0.07] hover:border-white/10'
    }`}
  >
    <div className={`p-3 rounded-xl relative shrink-0 ${s.stats.conv ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-white/5 text-blue-400'}`}>
      {s.stats.conv ? <Mail size={16} className="text-black" /> : <User size={16} />}
      {s.stats.visits > 1 && (
        <div className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[7px] font-black px-1 py-0.5 rounded-full border-2 border-[#070707]">R</div>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-sm font-black truncate text-white/90">{s.email || s.ip}</div>
      <div className="flex items-center gap-2 mt-0.5">
        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${
          s.variant === 'v1' ? 'bg-blue-500/20 text-blue-400' :
          s.variant === 'v2' ? 'bg-pink-500/20 text-pink-400' :
          s.variant === 'v3' ? 'bg-purple-500/20 text-purple-400' :
          s.variant === 'v4' ? 'bg-orange-500/20 text-orange-400' :
          'bg-white/10 text-white/40'
        }`}>
          {s.variant?.toUpperCase() || 'NA'}
        </span>
        <span className="text-[9px] text-white/30 font-bold truncate uppercase italic">{s.summary}</span>
      </div>
    </div>
    <div className="text-[9px] font-black text-white/10 group-hover:text-white/60 transition-colors shrink-0">{safeDist(s.last)}</div>
  </div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [projectId, setProjectId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [variantFilter, setVariantFilter] = useState<'all' | 'v1' | 'v2' | 'v3' | 'v4'>('all');
  const [tab, setTab] = useState<'funnel' | 'leads' | 'geo'>('funnel');
  const [isAuthorized, setIsAuthorized] = useState(() => sessionStorage.getItem('admin_authorized') === 'true');
  const [password, setPassword] = useState('');

  const [rawEvents, setRawEvents] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);

  const processEvents = useCallback((events: any[]) => {
    const usersMap: Record<string, any> = {};
    events.forEach((ev: any) => {
      const uid = ev.distinct_id;
      if (!usersMap[uid]) {
        usersMap[uid] = {
          id: uid, email: null, ip: ev.properties?.$ip || '—',
          location: [ev.properties?.$geoip_city_name, ev.properties?.$geoip_country_code].filter(Boolean).join(', ') || '—',
          country: ev.properties?.$geoip_country_name || '—', os: ev.properties?.$os || '—',
          device: ev.properties?.$device_type || (ev.properties?.$os === 'Android' || ev.properties?.$os === 'iOS' ? 'Mobile' : 'Desktop'),
          browser: ev.properties?.$browser || '—', variant: ev.properties?.landing_variant || '—',
          last: new Date(ev.timestamp), firstSeen: new Date(ev.timestamp), timeline: [],
          stats: { totalSec: 0, sections: new Set<string>(), conv: false, visits: 1 },
        };
      }
      const u = usersMap[uid];
      if (u.variant === '—' && ev.properties?.landing_variant) u.variant = ev.properties.landing_variant;
      if (ev.event === 'email_submitted') { u.email = ev.properties?.email || '(submitted)'; u.stats.conv = true; }
      if (ev.event === '$pageview') {
        const tDiff = Math.abs(new Date(ev.timestamp).getTime() - u.last.getTime());
        if (tDiff > 30 * 60 * 1000) u.stats.visits += 1;
      }
      if (ev.event === 'section_exited') {
        const dur = Math.min(parseFloat(ev.properties?.duration_seconds) || 0, 600);
        u.stats.totalSec += dur;
        if (ev.properties?.section_name) u.stats.sections.add(ev.properties.section_name);
      }
      u.timeline.push({ name: ev.event, section: ev.properties?.section_name, dur: ev.properties?.duration_seconds, time: ev.timestamp });
      const evDate = new Date(ev.timestamp);
      if (evDate > u.last) u.last = evDate;
      if (evDate < u.firstSeen) u.firstSeen = evDate;
    });

    const list = Object.values(usersMap).map((u: any) => {
      u.timeline.sort((a: any, b: any) => new Date(a.time).getTime() - new Date(b.time).getTime());
      const convEvent = u.timeline.find((t: any) => t.name === 'email_submitted');
      u.timeToConvert = convEvent ? (new Date(convEvent.time).getTime() - u.firstSeen.getTime()) / 1000 : null;
      u.summary = u.stats.conv ? `Converted in ${formatSec(u.timeToConvert || 0)}` : `Engaged ${u.stats.sections.size} sections · ${formatSec(u.stats.totalSec)} total`;
      return u;
    }).sort((a: any, b: any) => b.last.getTime() - a.last.getTime());
    setSessions(list);
  }, []);

  const calculateFunnel = useCallback((events: any[], variant: string) => {
    const sections = VARIANT_SECTIONS[variant] || VARIANT_SECTIONS.all;
    const allUids = Array.from(new Set(events.map((e: any) => e.distinct_id)));
    const totalUsers = allUids.length;
    return sections.map(name => {
      const exits = events.filter(e => e.event === 'section_exited' && e.properties?.section_name === name);
      const entries = events.filter(e => e.event === 'section_entered' && e.properties?.section_name === name);
      const dur = exits.reduce((acc: number, c: any) => acc + (parseFloat(c.properties?.duration_seconds) || 0), 0);
      const visitorsCount = Array.from(new Set(entries.map((e: any) => e.distinct_id))).length;
      return {
        name, visitors: visitorsCount, reach: totalUsers > 0 ? Math.round((visitorsCount / totalUsers) * 100) : 0,
        avgSeconds: exits.length > 0 ? (dur / exits.length).toFixed(1) : 0,
      };
    });
  }, []);

  const fetchData = useCallback(async (p: string, k: string) => {
    setIsLoading(true);
    try {
      const h = { 'Authorization': `Bearer ${k}` };
      const res = await fetch(`${host}/api/projects/${p}/events/?limit=2000`, { headers: h });
      if (!res.ok) throw new Error(`PostHog error: ${res.status}`);
      const data = await res.json();
      const events = data.results || [];
      setRawEvents(events);
      processEvents(events);
    } catch (e: any) { setError(e.message); } finally { setIsLoading(false); }
  }, [processEvents]);

  useEffect(() => {
    const p = localStorage.getItem('ph_project_id');
    const k = localStorage.getItem('ph_api_key');
    if (p && k) {
      setProjectId(p); setApiKey(k); setIsConfigured(true);
      fetchData(p, k);
    }
  }, [fetchData]);

  const filteredEvents = useMemo(() => variantFilter === 'all' ? rawEvents : rawEvents.filter(e => e.properties?.landing_variant === variantFilter), [rawEvents, variantFilter]);
  const filteredSessions = useMemo(() => variantFilter === 'all' ? sessions : sessions.filter(s => s.variant === variantFilter), [sessions, variantFilter]);
  const funnel = useMemo(() => calculateFunnel(filteredEvents, variantFilter), [filteredEvents, variantFilter, calculateFunnel]);

  const kpis = useMemo(() => {
    const unique = filteredSessions.length;
    const conversions = filteredSessions.filter(s => s.stats.conv).length;
    const returning = filteredSessions.filter(s => s.stats.visits > 1).length;
    const avgDwell = unique > 0 ? filteredSessions.reduce((acc, s) => acc + s.stats.totalSec, 0) / unique : 0;
    const convTimes = filteredSessions.filter(s => s.timeToConvert !== null).map(s => s.timeToConvert!);
    const avgTimeToConvert = convTimes.length > 0 ? convTimes.reduce((a, b) => a + b, 0) / convTimes.length : 0;
    const mobile = filteredSessions.filter(s => s.device === 'Mobile').length;
    const desktop = filteredSessions.filter(s => s.device === 'Desktop').length;
    let maxDrop = 0; let dropSection = '—';
    for (let i = 1; i < funnel.length; i++) {
      const drop = funnel[i - 1].visitors - funnel[i].visitors;
      if (drop > maxDrop) { maxDrop = drop; dropSection = funnel[i].name; }
    }
    const geoMap: Record<string, number> = {};
    filteredSessions.forEach(s => { if (s.country && s.country !== '—') geoMap[s.country] = (geoMap[s.country] || 0) + 1; });
    const topGeo = Object.entries(geoMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
    return { unique, conversions, returning, cr: unique > 0 ? ((conversions / unique) * 100).toFixed(1) : '0.0', avgDwell, avgTimeToConvert, mobile, desktop, dropSection, maxDrop, topGeo };
  }, [filteredSessions, funnel]);

  if (!isAuthorized) {
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      const masterPass = import.meta.env.VITE_ADMIN_PASSWORD || 'admin';
      if (password === masterPass) {
        setIsAuthorized(true);
        sessionStorage.setItem('admin_authorized', 'true');
        setError('');
      } else {
        setError('Access Denied — Invalid Master Password');
      }
    };

    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center p-6 text-white font-sans">
        <div className="w-full max-w-sm">
          <div className="mb-10 text-center">
            <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lock className="w-7 h-7 text-orange-500" />
            </div>
            <h2 className="text-3xl font-black tracking-tighter mb-1">FocusGap Intel</h2>
            <p className="text-white/20 text-xs tracking-widest uppercase">System Locked · Identity Required</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-3">
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 outline-none focus:border-orange-500/50 transition-all text-center text-sm" 
              placeholder="Enter Master Password" 
            />
            <button className="w-full bg-white text-black rounded-2xl py-3.5 font-black uppercase tracking-widest hover:bg-orange-50 transition-all text-xs mt-2">Unlock Intel</button>
          </form>
          {error && <p className="mt-4 text-red-400 text-[11px] text-center bg-red-500/10 py-2 px-4 rounded-xl">{error}</p>}
          <div className="mt-8 text-center"><p className="text-[10px] text-white/10 font-bold uppercase tracking-widest">Unauthorized access is monitored</p></div>
        </div>
      </div>
    );
  }

  if (!isConfigured) {
    const connect = async (e: any) => {
      e.preventDefault(); setIsLoading(true); setError('');
      try {
        const res = await fetch(`${host}/api/projects/${projectId}/`, { headers: { 'Authorization': `Bearer ${apiKey}` } });
        if (!res.ok) throw new Error('Auth Failed — check Project ID and API Key');
        localStorage.setItem('ph_project_id', projectId); localStorage.setItem('ph_api_key', apiKey);
        setIsConfigured(true); fetchData(projectId, apiKey);
      } catch (err: any) { setError(err.message); } finally { setIsLoading(false); }
    };
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center p-6 text-white font-sans">
        <div className="w-full max-w-sm">
          <div className="mb-10 text-center">
            <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Flame className="w-7 h-7 text-orange-500" />
            </div>
            <h2 className="text-3xl font-black tracking-tighter mb-1">FocusGap Intel</h2>
            <p className="text-white/20 text-xs tracking-widest uppercase">Pre-launch Behavioral CRM</p>
          </div>
          <form onSubmit={connect} className="space-y-3">
            <input value={projectId} onChange={e => setProjectId(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 outline-none focus:border-orange-500/50 transition-all text-center text-sm" placeholder="PostHog Project ID" />
            <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 outline-none focus:border-orange-500/50 transition-all text-center text-sm" placeholder="Personal API Key (phx_...)" />
            <button disabled={isLoading} className="w-full bg-white text-black rounded-2xl py-3.5 font-black uppercase tracking-widest hover:bg-orange-50 transition-all text-xs mt-2">{isLoading ? 'Connecting...' : 'Connect Intelligence'}</button>
          </form>
          {error && <p className="mt-4 text-red-400 text-[11px] text-center bg-red-500/10 py-2 px-4 rounded-xl">{error}</p>}
        </div>
      </div>
    );
  }

  const VARIANT_COLORS: Record<string, string> = { v1: '#3b82f6', v2: '#ec4899', v3: '#a855f7', v4: '#f97316', all: '#ffffff' };
  const activeColor = VARIANT_COLORS[variantFilter];

  return (
    <div className="min-h-screen bg-[#070707] text-white font-sans selection:bg-orange-500/30 overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-6">
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center"><Flame className="w-5 h-5 text-orange-500" /></div>
            <div>
              <h1 className="text-xl font-black tracking-tighter">FocusGap Intel</h1>
              <p className="text-[10px] text-white/20 uppercase font-black tracking-[0.2em]">Pre-launch CRM · {sessions.length} leads tracked</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {(['all', 'v1', 'v2', 'v3', 'v4'] as const).map(v => (
              <button key={v} onClick={() => setVariantFilter(v)} className={`px-4 py-2 rounded-xl text-[11px] font-black tracking-widest uppercase transition-all border ${variantFilter === v ? 'text-black border-transparent shadow-lg' : 'text-white/30 border-white/10 hover:border-white/20 hover:text-white/60'}`} style={variantFilter === v ? { backgroundColor: VARIANT_COLORS[v] } : {}}>{v}</button>
            ))}
            <div className="w-px h-6 bg-white/10 mx-1" />
            <button onClick={() => fetchData(projectId, apiKey)} className="p-2 hover:bg-white/5 rounded-xl transition-all text-white/30 hover:text-white border border-white/5"><RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} /></button>
            <button onClick={() => { localStorage.clear(); sessionStorage.clear(); window.location.reload(); }} title="Secure Logout" className="p-2 hover:bg-red-500/10 rounded-xl transition-all text-white/20 hover:text-red-400 border border-white/5"><EyeOff size={16} /></button>
          </div>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard label="Unique Visitors" value={kpis.unique} icon={Users} sub={`${kpis.returning} repeaters`} accent="text-white" />
          <KpiCard label="Email Captures" value={kpis.conversions} icon={Mail} sub="VIP signups" accent="text-green-400" />
          <KpiCard label="Conv. Rate" value={`${kpis.cr}%`} icon={Percent} sub="visitors → email" accent="text-orange-400" />
          <KpiCard label="Avg. Session Time" value={formatSec(kpis.avgDwell)} icon={Clock} sub="dwell per visitor" accent="text-blue-400" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard label="Time to Convert" value={kpis.avgTimeToConvert > 0 ? formatSec(kpis.avgTimeToConvert) : '—'} icon={Zap} sub="avg for converters" accent="text-yellow-400" />
          <KpiCard label="Top Drop-Off" value={kpis.dropSection} icon={AlertTriangle} sub={`−${kpis.maxDrop} visitors lost`} accent="text-red-400" />
          <KpiCard label="Mobile" value={kpis.mobile} icon={Smartphone} sub={`${kpis.unique > 0 ? Math.round(kpis.mobile / kpis.unique * 100) : 0}% of traffic`} accent="text-purple-400" />
          <KpiCard label="Desktop" value={kpis.desktop} icon={Monitor} sub={`${kpis.unique > 0 ? Math.round(kpis.desktop / kpis.unique * 100) : 0}% of traffic`} accent="text-cyan-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden flex flex-col">
            <div className="flex border-b border-white/5 p-2 gap-1">
              {([{ key: 'funnel', label: 'Section Funnel', icon: BarChart2 }, { key: 'leads', label: 'Lead Feed', icon: Users }, { key: 'geo', label: 'Geo Breakdown', icon: Globe }] as const).map(({ key, label, icon: Icon }) => (
                <button key={key} onClick={() => setTab(key)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${tab === key ? 'bg-white/10 text-white' : 'text-white/20 hover:text-white/50'}`}><Icon size={13} />{label}</button>
              ))}
            </div>
            {tab === 'funnel' && (
              <div className="flex-1 p-6 space-y-2 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <div><p className="text-sm font-black text-white">Section-by-Section Funnel</p><p className="text-[10px] text-white/20 uppercase tracking-widest mt-0.5">Scroll depth · dwell heat · audience reach</p></div>
                  <div className="flex items-center gap-3 text-[9px] font-black text-white/20 uppercase tracking-wider"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Cold</span><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> Warm</span><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Hot</span><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Fired</span></div>
                </div>
                {funnel.length > 0 ? funnel.map((item, i) => <FunnelRow key={item.name} item={item} maxVisitors={funnel[0]?.visitors || 1} isDropOff={i > 0 && (funnel[i - 1].visitors - item.visitors) === kpis.maxDrop && kpis.maxDrop > 0} />) : <div className="flex-1 flex items-center justify-center py-20 text-white/20 text-sm">No section events yet</div>}
              </div>
            )}
            {tab === 'leads' && (
              <div className="flex-1 p-4 space-y-2 overflow-y-auto max-h-[600px]">
                {filteredSessions.length === 0 && <div className="flex items-center justify-center py-20 text-white/20 text-sm">No leads yet</div>}
                {filteredSessions.map((s: any) => <LeadCard key={s.id} s={s} selected={selectedUser?.id === s.id} onClick={() => setSelectedUser(selectedUser?.id === s.id ? null : s)} />)}
              </div>
            )}
            {tab === 'geo' && (
              <div className="flex-1 p-6">
                <p className="text-sm font-black text-white mb-1">Geographic Breakdown</p><p className="text-[10px] text-white/20 uppercase tracking-widest mb-6">Top countries by visitor count</p>
                {kpis.topGeo.length === 0 ? <div className="flex items-center justify-center py-20 text-white/20 text-sm">No geo data available yet</div> : (
                  <div className="space-y-3">
                    {kpis.topGeo.map(([country, count], i) => {
                      const pct = kpis.unique > 0 ? (count / kpis.unique) * 100 : 0;
                      return (
                        <div key={country} className="flex items-center gap-4">
                          <div className="w-32 shrink-0 text-[12px] font-black text-white/70">{country}</div>
                          <div className="flex-1 h-4 bg-white/5 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, backgroundColor: activeColor, opacity: 0.6 }} /></div>
                          <div className="w-20 text-right text-[11px] font-black text-white/40">{count} · {Math.round(pct)}%</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl flex flex-col overflow-hidden" style={{ maxHeight: selectedUser ? '280px' : '100%' }}>
              <div className="p-4 border-b border-white/5 flex justify-between items-center"><h3 className="text-sm font-black tracking-tight">Live Activity</h3><div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /></div>
              <div className="overflow-y-auto p-3 space-y-2">
                {sessions.slice(0, 12).map((s: any) => <LeadCard key={s.id} s={s} selected={selectedUser?.id === s.id} onClick={() => setSelectedUser(selectedUser?.id === s.id ? null : s)} />)}
              </div>
            </div>
            {selectedUser && (
              <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden">
                <div className="p-5 border-b border-white/5 flex justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl border ${selectedUser.stats.conv ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>{selectedUser.stats.conv ? <Mail size={18} /> : <User size={18} />}</div>
                    <div><p className="text-sm font-black truncate max-w-[180px]">{selectedUser.email || selectedUser.ip}</p><p className="text-[9px] text-white/20 uppercase font-black tracking-wider mt-0.5">{selectedUser.variant?.toUpperCase()} · {selectedUser.location}</p></div>
                  </div>
                  <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-white/5 rounded-xl text-white/20 hover:text-white/60"><EyeOff size={14} /></button>
                </div>
                <div className="grid grid-cols-3 divide-x divide-white/5 border-b border-white/5">
                  {[{ label: 'Time', val: formatSec(selectedUser.stats.totalSec) }, { label: 'Sections', val: `${selectedUser.stats.sections.size}` }, { label: 'Visits', val: `${selectedUser.stats.visits}` }].map(({ label, val }) => (
                    <div key={label} className="p-3 text-center"><div className="text-lg font-black text-white">{val}</div><div className="text-[9px] text-white/20 uppercase tracking-wide font-black">{label}</div></div>
                  ))}
                </div>
                <div className="p-4 overflow-y-auto max-h-[300px] space-y-2">
                  {selectedUser.timeline.map((item: any, i: number) => (
                    <div key={i} className="flex items-start gap-3 text-[11px]"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" /><div className="flex-1 min-w-0"><span className="font-black text-white/60 uppercase tracking-tight">{item.name.replace('_', ' ').replace('$', '')}</span>{item.section && <span className="text-white/20 ml-1">· {item.section}</span>}{item.dur && <span className="text-green-400 font-black ml-1">+{item.dur}s</span>}</div><span className="text-white/10 shrink-0">{safeTime(item.time)}</span></div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
