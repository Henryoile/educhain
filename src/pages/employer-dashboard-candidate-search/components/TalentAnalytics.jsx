import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TalentAnalytics = () => {
  const [selectedMetric, setSelectedMetric] = useState('skills');
  const [timeRange, setTimeRange] = useState('30d');

  const skillDemandData = [
    { skill: 'React', demand: 85, supply: 65, gap: 20 },
    { skill: 'Node.js', demand: 78, supply: 70, gap: 8 },
    { skill: 'Python', demand: 92, supply: 80, gap: 12 },
    { skill: 'Blockchain', demand: 95, supply: 25, gap: 70 },
    { skill: 'Solidity', demand: 88, supply: 15, gap: 73 },
    { skill: 'AWS', demand: 82, supply: 60, gap: 22 },
    { skill: 'Docker', demand: 75, supply: 55, gap: 20 }
  ];

  const salaryTrendsData = [
    { month: 'Jan', junior: 65, mid: 95, senior: 140 },
    { month: 'Feb', junior: 68, mid: 98, senior: 145 },
    { month: 'Mar', junior: 70, mid: 102, senior: 150 },
    { month: 'Apr', junior: 72, mid: 105, senior: 155 },
    { month: 'May', junior: 75, mid: 108, senior: 160 },
    { month: 'Jun', junior: 78, mid: 112, senior: 165 }
  ];

  const locationDistribution = [
    { name: 'Remote', value: 45, color: '#1E40AF' },
    { name: 'San Francisco', value: 20, color: '#059669' },
    { name: 'New York', value: 15, color: '#DC2626' },
    { name: 'London', value: 10, color: '#F59E0B' },
    { name: 'Other', value: 10, color: '#64748B' }
  ];

  const availabilityData = [
    { category: 'Immediate', count: 1250, percentage: 35 },
    { category: '2 weeks', count: 890, percentage: 25 },
    { category: '1 month', count: 715, percentage: 20 },
    { category: '2+ months', count: 715, percentage: 20 }
  ];

  const metricOptions = [
    { value: 'skills', label: 'Skills Analysis' },
    { value: 'salary', label: 'Salary Trends' },
    { value: 'location', label: 'Location Distribution' },
    { value: 'availability', label: 'Availability Status' }
  ];

  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' }
  ];

  const renderChart = () => {
    switch (selectedMetric) {
      case 'skills':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillDemandData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="skill" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="demand" fill="#1E40AF" name="Demand" />
              <Bar dataKey="supply" fill="#059669" name="Supply" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'salary':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salaryTrendsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="junior" stroke="#F59E0B" strokeWidth={2} name="Junior ($k)" />
              <Line type="monotone" dataKey="mid" stroke="#1E40AF" strokeWidth={2} name="Mid-level ($k)" />
              <Line type="monotone" dataKey="senior" stroke="#DC2626" strokeWidth={2} name="Senior ($k)" />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'location':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={locationDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percentage }) => `${name} ${percentage}%`}
              >
                {locationDistribution?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'availability':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={availabilityData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" stroke="#6B7280" />
              <YAxis dataKey="category" type="category" stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" fill="#059669" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Talent Pool Analytics</h3>
            <p className="text-sm text-muted-foreground">Market insights and candidate trends</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select
            placeholder="Select metric..."
            options={metricOptions}
            value={selectedMetric}
            onChange={setSelectedMetric}
            className="w-48"
          />
          <Select
            placeholder="Time range..."
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-36"
          />
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
      {/* Chart Area */}
      <div className="p-6">
        {renderChart()}
      </div>
      {/* Key Insights */}
      <div className="p-6 border-t border-border">
        <h4 className="text-sm font-semibold text-foreground mb-4">Key Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Total Candidates</span>
            </div>
            <div className="text-2xl font-bold text-foreground">3,570</div>
            <div className="text-xs text-success">+12% this month</div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm font-medium text-foreground">Verified Profiles</span>
            </div>
            <div className="text-2xl font-bold text-foreground">2,890</div>
            <div className="text-xs text-success">81% verified</div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="DollarSign" size={16} className="text-warning" />
              <span className="text-sm font-medium text-foreground">Avg. Salary</span>
            </div>
            <div className="text-2xl font-bold text-foreground">$108k</div>
            <div className="text-xs text-warning">+5% vs last quarter</div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-accent" />
              <span className="text-sm font-medium text-foreground">Avg. Response</span>
            </div>
            <div className="text-2xl font-bold text-foreground">2.3 days</div>
            <div className="text-xs text-accent">Faster than average</div>
          </div>
        </div>
      </div>
      {/* Skills Gap Analysis */}
      {selectedMetric === 'skills' && (
        <div className="p-6 border-t border-border">
          <h4 className="text-sm font-semibold text-foreground mb-4">Skills Gap Analysis</h4>
          <div className="space-y-3">
            {skillDemandData?.slice(0, 3)?.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    skill?.gap > 50 ? 'bg-error' : skill?.gap > 20 ? 'bg-warning' : 'bg-success'
                  }`}></div>
                  <span className="text-sm font-medium text-foreground">{skill?.skill}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-muted-foreground">Gap: {skill?.gap}%</span>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    skill?.gap > 50 ? 'bg-error/10 text-error' : 
                    skill?.gap > 20 ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                  }`}>
                    {skill?.gap > 50 ? 'Critical' : skill?.gap > 20 ? 'High' : 'Moderate'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TalentAnalytics;