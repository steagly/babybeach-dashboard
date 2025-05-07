import { useState, useEffect } from 'react';
import { DatePicker } from '../../modules/date-picker';
import Header from './BookingHeader';
import TimeSlots from './BookingSlots';
import getTimeSlots from '../../api/booking';
import useBookingStore from '../../store/bookingStore';
import PersonCard from './PersonCard';
import BookingSummary from './BookingSummary';
import BookingStep2 from './Step2';
import { useForm, FormProvider } from 'react-hook-form';
import InputError from './InputError';
import SuccessPage from './SuccessPage';

import styles from './Main.module.css';
import axios from 'axios';

export default function Appointment() {
  const {
    selectedDate,
    timeSlots,
    setTimeSlots,
    services,
    changeDate,
    selectedTimeSlot,
    setSelectedTimeSlot,
    changePersonCount,
    bookingInfo,
    step,
    changeStep,
  } = useBookingStore();

  const methods = useForm();

  const {
    formState: { errors },
    register,
    setValue,
  } = methods;

  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  const onSubmit = (data) => {
    console.log('Data submitted:', data);
    console.log('Selected Time Slot:', data.selectedTimeSlot);

    async function bookSlot(data) {
      try {
        const response = await axios.post(`http://localhost:5001/api/booking`, {
          ...data,
          date: data.selectedTimeSlot,
          adult: data.adultNumber,
          kid: bookingInfo.kid.count,
          baby: bookingInfo.baby.count,
        });
        console.log(response.data);
        setIsBookingSuccess(true);
      } catch (error) {
        console.log(error);
      }
    }

    bookSlot(data);
  };

  const handleDayButton = (currentDate) => {
    changeDate(currentDate);
    console.log(selectedDate);
  };

  useEffect(() => {
    if (selectedDate) {
      getTimeSlots(selectedDate, setTimeSlots);
      setSelectedTimeSlot();
    }
  }, [selectedDate]);

  useEffect(() => {
    setValue('selectedTimeSlot', selectedTimeSlot?.start);
    register('selectedTimeSlot', {
      validate: () => selectedTimeSlot || 'Wählen Sie bitte einen Termin',
    });

    setValue('adultNumber', bookingInfo.adult.count);
    register('adultNumber', {
      validate: () =>
        bookingInfo.adult.count >= 1 || 'Mindestens ein Erwachsene auswählen',
    });
  }, [register, selectedTimeSlot, bookingInfo]);

  if (isBookingSuccess) {
    return (
      <div className={styles.sada}>
        <Header />
        <SuccessPage />
      </div>
    );
  }

  return (
    <>
      <Header />
      <FormProvider {...methods}>
        <div className={styles.main_content}>
          <div className={styles.body_wrapper}>
            {step == 0 && (
              <>
                <h1>Termin und Uhrzeit wahlen</h1>
                <div
                  className={
                    errors.selectedTimeSlot
                      ? `${styles.booking_date} ${styles.error}`
                      : `${styles.booking_date}`
                  }
                >
                  {errors.selectedTimeSlot && (
                    <InputError error={errors.selectedTimeSlot} padding={40} />
                  )}
                  <DatePicker
                    changeDay={handleDayButton}
                    selectedDate={selectedDate}
                    isPastDisabled={true}
                  />
                  <TimeSlots timeSlots={timeSlots} />
                </div>
                <h3>Anzahl der personen </h3>
                <div
                  className={
                    errors.adultNumber
                      ? `${styles.person_cards} ${styles.error}`
                      : `${styles.person_cards}`
                  }
                >
                  {errors.adultNumber && (
                    <InputError error={errors.adultNumber} padding={40} />
                  )}
                  {services.map((service) => {
                    return (
                      <PersonCard
                        key={service.id}
                        icon={service.icon}
                        changePersonCount={changePersonCount}
                        type={service.type}
                        bookingInfo={bookingInfo}
                        price={service.price}
                      >
                        {service.title}
                      </PersonCard>
                    );
                  })}
                </div>
              </>
            )}
            {step == 1 && (
              <>
                <h1>Personliche Daten eingeben</h1>
                <BookingStep2></BookingStep2>
              </>
            )}
          </div>
          <BookingSummary
            bookingInfo={bookingInfo}
            step={step}
            changeStep={changeStep}
            selectedTimeSlot={selectedTimeSlot}
            onSubmit={methods.handleSubmit(onSubmit)}
          />
        </div>
      </FormProvider>
    </>
  );
}
