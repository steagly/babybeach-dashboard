import adultIcon from "../../assets/adult.svg";
import babyIcon from "../../assets/baby.svg";
import kidIcon from "../../assets/kid.svg";
import teenagerIcon from "../../assets/teenager.svg";

export const bookingServices = [
  {
    id: 1,
    icon: adultIcon,
    type: "adult",
    title: "Erwachsene über 18 Jahren",
    serviceType: "Erwaschsene",
    price: 14.5,
    count: 0,
  },
  {
    id: 2,
    type: "teenager",
    icon: teenagerIcon,
    title: "Jugendliche 14-17 Jahren",
    serviceType: "Jugendliche 14-17",
    price: 7.5,
    count: 0,
  },
  {
    id: 3,
    icon: kidIcon,
    type: "kid",
    title: "Kind 3-13 Jahren",
    serviceType: "Kind 3-13",
    price: 2.5,
    count: 0,
  },
  {
    id: 4,
    icon: babyIcon,
    type: "baby",
    title: "Kleinkind unter 3 Jahren",
    serviceType: "Kleinkind unter 3",
    price: 0,
    count: 0,
  },
];
