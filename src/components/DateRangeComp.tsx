import { useEffect, useRef, useState } from "react";
import { DateRange} from 'react-date-range';
// import format from 'date-fns/format';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { makeStyles } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles({
    calendarWrap: {
        position: 'relative'
    },
    searchRange: {
        padding: '15px'
    },
    calendarElement: {
        position: 'absolute',
        top: '50px',
        zIndex: 2
    }
});

const DateRangeComp = () => {
    const classes = useStyles();
    // date state 
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);

    // open close
    const [open, setOpen] = useState(false);

    // get the target element to toggle
    const refOne = useRef<HTMLInputElement>(null);

    useEffect(() => {
        document.addEventListener('keydown', hideOnEscape, true);
        document.addEventListener('click', hideOnClickOutside, true);
    },[])

    // hide dropdown on Esc press
    const hideOnEscape = (e: { key: any; }) => {
        // console.log(e.key);
        if(e.key === 'Escape') {
            setOpen(false);
        }       
    }

    // hide on outside click
    const hideOnClickOutside = (e: { target: any; }) => {
        // console.log(refOne.current);
        // console.log(e.target);
        if(refOne.current && !refOne.current.contains(e.target)) {
            setOpen(false);
        }        
    }

    return (
        <div className={classes.calendarWrap}>
            <input
                value={`${moment(range[0].startDate).format('MM/DD/YYYY')} to ${moment(range[0].endDate).format('MM/DD/YYYY')}`}
                // value={`${format(range[0].startDate, 'MM/dd/yyyy')} to ${format(range[0].endDate, 'MM/dd/yyyy')}`}
                placeholder='Start-Date to End-Date'
                id="dateRange" 
                name="dateRange"
                readOnly
                className={classes.searchRange}
                onClick={() => setOpen(open => !open)}
            />
            <div ref={refOne}>
                {open && 
                    <DateRange 
                        onChange={(item: any) => setRange([item.selection])}
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        ranges={range}
                        months={1}
                        direction='horizontal'
                        className={classes.calendarElement}
                        // minDate={new Date()}                    
                    />

                }
            </div>

        </div>
    )
}

export default DateRangeComp;