import { useMemo, useState } from 'react';

const money = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value || 0));

export default function App() {
  const [settings, setSettings] = useState({ targetIncome: 180000, workingDays: 22, hoursPerDay: 8, overhead: 24000, tax: 18, adminTime: 15, margin: 25 });

  const pricing = useMemo(() => {
    const billableHours = settings.workingDays * settings.hoursPerDay * (1 - settings.adminTime / 100);
    const expectedProfit = Number(settings.targetIncome) + Number(settings.overhead) + Number(settings.targetIncome) * (settings.tax / 100);
    const hourly = expectedProfit / billableHours;
    const dayRate = hourly * settings.hoursPerDay;
    const fixedQuote = dayRate * 25 * (1 + settings.margin / 100);
    return { billableHours, hourly, dayRate, fixedQuote };
  }, [settings]);

  return (
    <div className="app-shell">
      <div className="panel hero-panel">
        <div>
          <p className="eyebrow">Price your work with confidence</p>
          <h1>Freelance Rate Calculator</h1>
        </div>
      </div>

      <div className="panel">
        <h2>Inputs</h2>
        <div className="form-grid two-columns">
          <input type="number" value={settings.targetIncome} onChange={(e) => setSettings({ ...settings, targetIncome: Number(e.target.value) })} placeholder="Target monthly income" />
          <input type="number" value={settings.workingDays} onChange={(e) => setSettings({ ...settings, workingDays: Number(e.target.value) })} placeholder="Working days" />
          <input type="number" value={settings.hoursPerDay} onChange={(e) => setSettings({ ...settings, hoursPerDay: Number(e.target.value) })} placeholder="Hours per day" />
          <input type="number" value={settings.overhead} onChange={(e) => setSettings({ ...settings, overhead: Number(e.target.value) })} placeholder="Overhead cost" />
          <input type="number" value={settings.tax} onChange={(e) => setSettings({ ...settings, tax: Number(e.target.value) })} placeholder="Tax %" />
          <input type="number" value={settings.adminTime} onChange={(e) => setSettings({ ...settings, adminTime: Number(e.target.value) })} placeholder="Admin time %" />
          <input type="number" value={settings.margin} onChange={(e) => setSettings({ ...settings, margin: Number(e.target.value) })} placeholder="Profit margin %" className="full-width" />
        </div>
      </div>

      <div className="panel">
        <h2>Recommended pricing</h2>
        <div className="stat-grid">
          <div><span>Hourly</span><strong>{money(pricing.hourly)}</strong></div>
          <div><span>Day rate</span><strong>{money(pricing.dayRate)}</strong></div>
          <div><span>Fixed 25h project</span><strong>{money(pricing.fixedQuote)}</strong></div>
          <div><span>Billable hours</span><strong>{pricing.billableHours.toFixed(1)}</strong></div>
        </div>
      </div>
    </div>
  );
}
