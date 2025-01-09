import { MetricsCardContainer } from './MetricsCardContainer';

interface MetricsCardProps {
  title: string;
  loading?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function MetricsCard({ 
  title, 
  loading = false, 
  children, 
  footer 
}: MetricsCardProps) {
  return (
    <MetricsCardContainer className="relative flex flex-col h-full">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-main rounded-md" />

      <div className="flex-grow p-6 text-center">
        <h3 className="text-xl font-medium text-gray-500 mb-4">{title}</h3>
        
        {loading ? (
          <div className="animate-pulse h-8 bg-gray-300 rounded mt-2 mx-auto w-24" />
        ) : (
          <div className="flex flex-col items-center justify-center mt-2">
            {children}
          </div>
        )}
      </div>

      {footer && (
        <div className="px-6 py-3 bg-gray-100 border-t border-gray-200 text-center rounded-b-lg">
          {footer}
        </div>
      )}
    </MetricsCardContainer>
  );
}