import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameDay, isSameMonth, addDays } from 'date-fns';
import { Toaster, toast } from 'react-hot-toast';

const PlainDatePicker = ({ initialDate, returnData }) => {
  const [currentMonth, setCurrentMonth] = useState(initialDate || new Date());
  const [selectedDate, setSelectedDate] = useState(initialDate || null);
  const datePickerRef = useRef(null);
  const weekdaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthStartDate = startOfWeek(monthStart);
  const monthEndDate = endOfWeek(monthEnd);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const days = [];
  let day = monthStartDate;

  while (day <= monthEndDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (day) => {
    if (day < new Date(format(new Date(), 'yyyy-MM-dd') + 'T00:00:00.000Z')) {
      return;
    }
    setSelectedDate(day);
    returnData(day);
  };

  return (
    <div>
      <div className="my-5 sm:mt-10 lg:mt-0 bg-white shadow-lg rounded-lg">
        <div className="text-lg font-custom-lora font-bold text-primary pl-5 pt-2">
          {selectedDate ? 'Selected Date' : 'Select Date'}
        </div>
        <div className="text-sms pl-5 font-custom-lora text-primary">
          {selectedDate ? format(selectedDate, 'dd MMMM') : ''}
        </div>
        <div className="px-5 pb-5 h-min lg:h-full rounded-md shadow-none" ref={datePickerRef}>
          <div>
            <div className="flex items-center justify-between py-2">
              <span className="font-custom-lora font-normal text-primary text-md">
                {format(currentMonth, 'MMMM yyyy')}
              </span>
              <div className="flex justify-end gap-2">
                <button
                  className="text-gray-500 hover:text-gray-700 transition-colors font-custom-lora focus:outline-none"
                  onClick={handlePrevMonth}
                >
                  <img src="/images/icons/back-arrow.svg" alt="left arrow" className="w-5 h-5" />
                </button>
                <button
                  className="text-gray-500 hover:text-gray-700 transition-colors font-custom-lora focus:outline-none"
                  onClick={handleNextMonth}
                >
                  <img src="/images/icons/back-arrow.svg" alt="right arrow" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex mb-2 justify-around">
            {weekdaysShort.map((day) => (
              <div key={day} className="w-12 text-center font-custom-lora text-sm text-gray-600 font-medium">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {days.map((day) => (
              <div className="py-2 flex justify-center items-center">
                <div
                  key={day}
                  className={`flex w-full font-custom-lora items-center justify-center cursor-pointer ${
                    !isSameMonth(day, monthStart) ? 'text-gray-500 cursor-not-allowed' : ''
                  }${
                    day < new Date(format(new Date(), 'yyyy-MM-dd') + 'T00:00:00.000Z')
                      ? 'text-gray-500 cursor-not-allowed'
                      : ''
                  }
                     ${
                       isSameDay(day, selectedDate)
                         ? 'bg-primary text-white rounded-full'
                         : ''
                     }`}
                  onClick={() => handleDateClick(day)}
                >
                  {format(day, 'd')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

PlainDatePicker.propTypes = {
  setSelectedDate: PropTypes.func,
  onClickOutside: PropTypes.func,
};

export default PlainDatePicker;
