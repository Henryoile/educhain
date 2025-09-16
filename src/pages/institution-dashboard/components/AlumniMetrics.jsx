import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AlumniMetrics = ({ metricsData, onExportReport }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1year');
  const [selectedMetric, setSelectedMetric] = useState('employment');

  const timeframeOptions = [
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' },
    { value: '2years', label: 'Last 2 Years' },
    { value: '5years', label: 'Last 5 Years' }
  ];

  const metricOptions = [
    { value: 'employment', label: 'Employment Rates' },
    { value: 'salary', label: 'Salary Progression' },
    { value: 'industry', label: 'Industry Distribution' },
    { value: 'skills', label: 'Skills Demand' }
  ];

  const employmentData = [
    { month: 'Jan', employed: 85, unemployed: 15 },
    { month: 'Feb', employed: 88, unemployed: 12 },
    { month: 'Mar', employed: 92, unemployed: 8 },
    { month: 'Apr', employed: 89, unemployed: 11 },
    { month: 'May', employed: 94, unemployed: 6 },
    { month: 'Jun', employed: 96, unemployed: 4 }
  ];

  const salaryData = [
    { year: '2020', avgSalary: 45000, medianSalary: 42000 },
    { year: '2021', avgSalary: 48000, medianSalary: 45000 },
    { year: '2022', avgSalary: 52000, medianSalary: 49000 },
    { year: '2023', avgSalary: 56000, medianSalary: 53000 },
    { year: '2024', avgSalary: 61000, medianSalary: 58000 }
  ];

  const industryData = [
    { name: 'Technology', value: 35, color: '#1E40AF' },
    { name: 'Healthcare', value: 20, color: '#059669' },
    { name: 'Finance', value: 18, color: '#F59E0B' },
    { name: 'Education', value: 12, color: '#DC2626' },
    { name: 'Manufacturing', value: 10, color: '#64748B' },
    { name: 'Other', value: 5, color: '#6B7280' }
  ];

  const keyMetrics = [
    {
      title: 'Overall Employment Rate',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: 'TrendingUp'
    },
    {
      title: 'Average Starting Salary',
      value: '$61,000',
      change: '+8.9%',
      trend: 'up',
      icon: 'DollarSign'
    },
    {
      title: 'Job Placement Time',
      value: '3.2 months',
      change: '-0.8 months',
      trend: 'up',
      icon: 'Clock'
    },
    {
      title: 'Alumni Satisfaction',
      value: '4.6/5.0',
      change: '+0.2',
      trend: 'up',
      icon: 'Star'
    }
  ];

  const renderChart = () => {
    switch (selectedMetric) {
      case 'employment':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={employmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="employed" fill="#059669" name="Employed %" />
              <Bar dataKey="unemployed" fill="#DC2626" name="Unemployed %" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'salary':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, '']} />
              <Line type="monotone" dataKey="avgSalary" stroke="#1E40AF" name="Average Salary" strokeWidth={2} />
              <Line type="monotone" dataKey="medianSalary" stroke="#059669" name="Median Salary" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'industry':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={industryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {industryData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Alumni Success Metrics</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Track graduate employment rates and career progression data
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Select
              options={timeframeOptions}
              value={selectedTimeframe}
              onChange={setSelectedTimeframe}
              className="w-40"
            />
            <Button
              variant="outline"
              onClick={onExportReport}
              iconName="Download"
            >
              Export Report
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {keyMetrics?.map((metric, index) => (
            <div key={index} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={metric?.icon} size={16} className="text-primary" />
                </div>
                <div className={`flex items-center space-x-1 text-xs ${
                  metric?.trend === 'up' ? 'text-success' : 'text-error'
                }`}>
                  <Icon name={metric?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={12} />
                  <span>{metric?.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-card-foreground mb-1">{metric?.value}</div>
              <div className="text-sm text-muted-foreground">{metric?.title}</div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-md font-medium text-card-foreground">Detailed Analytics</h4>
            <Select
              options={metricOptions}
              value={selectedMetric}
              onChange={setSelectedMetric}
              className="w-48"
            />
          </div>
          
          <div className="w-full h-80">
            {renderChart()}
          </div>
        </div>

        {/* Alumni Highlights */}
        <div className="mt-8">
          <h4 className="text-md font-medium text-card-foreground mb-4">Recent Alumni Achievements</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: 'Sarah Johnson',
                achievement: 'Promoted to Senior Software Engineer at Google',
                date: '2024-08-15',
                impact: 'Increased institutional ranking by 2 points'
              },
              {
                name: 'Michael Chen',
                achievement: 'Founded successful AI startup valued at $50M',
                date: '2024-08-10',
                impact: 'Featured in Forbes 30 Under 30'
              },
              {
                name: 'Emily Rodriguez',
                achievement: 'Published research in Nature journal',
                date: '2024-08-05',
                impact: 'Brought recognition to research program'
              }
            ]?.map((alumni, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                    <Icon name="Award" size={20} className="text-success" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-card-foreground">{alumni?.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">{alumni?.achievement}</div>
                    <div className="text-xs text-muted-foreground mt-2">
                      {new Date(alumni.date)?.toLocaleDateString()}
                    </div>
                    <div className="text-xs text-primary mt-1">{alumni?.impact}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reputation Score */}
        <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-card-foreground">Institutional Reputation Score</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Based on alumni success metrics and employer feedback
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">8.7/10</div>
              <div className="text-sm text-success flex items-center">
                <Icon name="TrendingUp" size={14} className="mr-1" />
                +0.3 this quarter
              </div>
            </div>
          </div>
          
          <div className="mt-4 w-full bg-border rounded-full h-2">
            <div className="bg-primary h-2 rounded-full w-[87%] transition-all duration-300"></div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
            <span>Poor</span>
            <span>Excellent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniMetrics;