// components/filters/global/GlobalFilters.tsx
import Card from '../../dashboard/shared/Card';
import TypeFilter from './TypeFilter';
import DateRangeFilter from './DateRangeFilter';
// import AttackTypeFilter from './AttackTypeFilter';

export default function GlobalFilters() {
 return (
   <Card className="mx-6 mt-4">
     <div className="space-y-4">
       <h2 className="text-lg font-semibold">Filtry</h2>
       <div className="flex flex-wrap gap-4">
         <TypeFilter />
          <DateRangeFilter />
         {/*<AttackTypeFilter /> */}
       </div>
     </div>
   </Card>
 );
}