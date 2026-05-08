import { Activity, Banknote, Users, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

const stats = [
  { label: 'Users', value: '2,453', icon: Users },
  { label: 'Active Users', value: '2,453', icon: Activity },
  { label: 'Users with Loans', value: '12,453', icon: Banknote },
  { label: 'Users with Savings', value: '102,453', icon: Wallet },
];

export default function DashboardPage() {
  return (
    <section className="dashboard page">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} key={stat.label}>
              <Card className="stat-card">
                <span className="stat-card__icon">
                  <Icon size={20} />
                </span>
                <p>{stat.label}</p>
                <strong>{stat.value}</strong>
              </Card>
            </motion.div>
          );
        })}
      </div>
      <div className="dashboard__grid">
        <Card className="chart-card">
          <h2>Loan activity</h2>
          <div className="chart-card__placeholder" />
        </Card>
        <Card className="chart-card">
          <h2>User growth</h2>
          <div className="chart-card__placeholder chart-card__placeholder--bars" />
        </Card>
      </div>
    </section>
  );
}
