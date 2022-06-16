import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { useAppDispatch } from '../app/hooks';
import { doDateRangeSearch} from '../store/actions/campaigntable.action';

const DateRangePickerComp = (props: any) => {
  const dispatch = useAppDispatch();
  const validateDateRange = (searchDate: DateRange | null) => {   
    dispatch(doDateRangeSearch(searchDate));
  };

  const handleClean = () => {
    validateDateRange(null);
  }

  return (
    <>
      <DateRangePicker 
        format='MM/dd/yyyy'
        placeholder="Select Date Range"
        size="lg" 
        onOk={(searchVal) => validateDateRange(searchVal)}
        onClean={() => handleClean()}/>
    </>
  );
}

export default DateRangePickerComp;