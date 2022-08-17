import React, {useState} from 'react';
import MonthYearPicker from 'react-month-year-picker';
import './MonthPicker.css';

function MonthPicker(props) {
let date = props.date;

const [visible,updateVisible] = useState(false);

const pickerLang = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
}

function showFun () {
  updateVisible(true);
}

function pickedYear (year) {
  props.yearFun(year);
}

function pickedMonth (month) {
  updateVisible(false);
  props.monthFun(month);
}
  
return (
      <div>
          <button className="monthpickerbtn" onClick={showFun}>{pickerLang.months[date.month-1]+" "+date.year}</button>
        {
            visible? (<div id="monthDiv">
                    <MonthYearPicker
                      caption=""
                      selectedMonth={date.month}
                      selectedYear={date.year}
                      minYear={2000}
                      maxYear={2022}
                      onChangeYear = {pickedYear}
                      onChangeMonth = {pickedMonth}
                    />
            </div> ):null
        }
      </div>
  );
}

export default MonthPicker;