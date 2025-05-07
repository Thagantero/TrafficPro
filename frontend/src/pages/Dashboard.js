import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../components/ui/Card';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

// Simple Table components (add these if you don't have them)
const Table = ({ children }) => <table className="min-w-full divide-y divide-gray-200">{children}</table>;
const TableHeader = ({ children }) => <thead className="bg-gray-50">{children}</thead>;
const TableBody = ({ children }) => <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>;
const TableRow = ({ children }) => <tr>{children}</tr>;
const TableCell = ({ children }) => <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{children}</td>;
const TableHead = ({ children }) => <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</th>;

// Color palette for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Dashboard = () => {
  const { user, getTrafficRecords } = useAuth();
  const [trafficRecords, setTrafficRecords] = useState([]); // Fixed typo in variable name
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setIsLoading(true);
        const records = await getTrafficRecords(timeRange);
        setTrafficRecords(records);
      } catch (error) {
        console.error('Error fetching traffic records:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecords();
  }, [timeRange, getTrafficRecords]);

  const processChartData = () => {
    if (!trafficRecords.length) return { urlData: [], trafficTypeData: [], timeSeriesData: [] };
    
    // Group by URL
    const urlData = trafficRecords.reduce((acc, record) => {
      const existing = acc.find(item => item.url === record.url);
      if (existing) {
        existing.visits += record.visits;
      } else {
        acc.push({ url: record.url, visits: record.visits });
      }
      return acc;
    }, []).sort((a, b) => b.visits - a.visits);

    // Group by traffic type
    const trafficTypeData = trafficRecords.reduce((acc, record) => {
      const existing = acc.find(item => item.name === record.trafficType);
      if (existing) {
        existing.value += record.visits;
      } else {
        acc.push({ name: record.trafficType, value: record.visits });
      }
      return acc;
    }, []).sort((a, b) => b.value - a.value);

    // Time series data
    const timeSeriesData = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      const recordsForDate = trafficRecords.filter(record => {
        const recordDate = new Date(record.timestamp);
        return (
          recordDate.getDate() === date.getDate() &&
          recordDate.getMonth() === date.getMonth() &&
          recordDate.getFullYear() === date.getFullYear()
        );
      });
      
      return {
        date: dateStr,
        visits: recordsForDate.reduce((sum, record) => sum + record.visits, 0),
      };
    });

    return { urlData, trafficTypeData, timeSeriesData };
  };

  const { urlData, trafficTypeData, timeSeriesData } = processChartData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ... rest of your JSX remains the same ... */}
    </div>
  );
};

export default Dashboard;