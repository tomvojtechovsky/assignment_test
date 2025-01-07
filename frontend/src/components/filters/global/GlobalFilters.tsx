// components/filters/global/GlobalFilters.tsx
import { CardStyled } from '../../dashboard/shared/Card';
import TypeFilter from './TypeFilter';
import DateRangeFilter from './DateRangeFilter';
// import AttackTypeFilter from './AttackTypeFilter';

export default function GlobalFilters() {
  return (
    <CardStyled className="bg-gray-200">
      <div className="space-y-2 sm:space-y-4">
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4">
          <TypeFilter />
          <DateRangeFilter />
          {/*<AttackTypeFilter /> */}
        </div>
      </div>
    </CardStyled>
  );
}