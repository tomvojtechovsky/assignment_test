// components/filters/global/GlobalFilters.tsx
import { CardStyled } from '../../dashboard/shared/Card';
import TypeFilter from './TypeFilter';
import DateRangeFilter from './DateRangeFilter';
// import AttackTypeFilter from './AttackTypeFilter';

export default function GlobalFilters() {
  return (
    <CardStyled className="mx-6 mt-4 bg-gray-200">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <TypeFilter />
          <DateRangeFilter />
          {/*<AttackTypeFilter /> */}
        </div>
      </div>
    </CardStyled>
  );
}