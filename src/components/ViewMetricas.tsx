import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartState {
  series: Array<{ name: string; data: number[]; color?: string }>; // Agregué color opcional a cada serie
  options: {
    chart: {
      type: 'bar';
      height: number;
      stacked: boolean;
      toolbar: { show: boolean };
      zoom: { enabled: boolean };
    };
    responsive: Array<{
      breakpoint: number;
      options: {
        legend: { position: 'bottom'; offsetX: number; offsetY: number };
      };
    }>;
    plotOptions: {
      bar: {
        horizontal: boolean;
        borderRadius: number;
        borderRadiusApplication: 'end';
        borderRadiusWhenStacked: 'last';
        dataLabels: {
          total: {
            enabled: boolean;
            style: { fontSize: string; fontWeight: number };
          };
        };
      };
    };
    xaxis: {
      type: 'category';
      categories: string[];
    };
    legend: { position: 'right'; offsetY: number };
    fill: { opacity: number };
    colors: string[];
  };
}

const ApexChart: React.FC = () => {
  const [state, setState] = useState<ChartState>({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: { show: true },
        zoom: { enabled: true },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: { position: 'bottom', offsetX: -10, offsetY: 0 },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          borderRadiusApplication: 'end',
          borderRadiusWhenStacked: 'last',
          dataLabels: {
            total: {
              enabled: true,
              style: { fontSize: '13px', fontWeight: 900 },
            },
          },
        },
      },
      xaxis: {
        type: 'category',
        categories: [],
      },
      legend: { position: 'right', offsetY: 40 },
      fill: { opacity: 1 },
      colors: [],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/metricas');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();

        // Ordenar categorías del 1 al 5
        const sortedCategories = data.categories.sort((a: string, b: string) => {
          const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
          const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
          return numA - numB;
        });

        // Definir colores únicos para cada serie
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A1'];

        setState((prevState) => ({
          ...prevState,
          series: data.series.map((serie: any, index: number) => ({
            ...serie,
            color: colors[index % colors.length], // Asignar color único a cada serie
          })),
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: sortedCategories,
            },
            colors: colors.slice(0, data.series.length), // Aplicar colores a las series
          },
        }));
      } catch (error) {
        console.error('Error al cargar las métricas:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
    </div>
  );
};

export default ApexChart;
