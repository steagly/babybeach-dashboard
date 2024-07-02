import EventModal from "./EventModal";
import { AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useState } from "react";
import useModalStore from "../store/modalStore";
const mountElement = document.getElementById("overlay");

export default function Overlay({ mode }) {
  const isOpen = useModalStore((state) => state.isOpen);
  const setIsOpen = useModalStore((state) => state.setIsOpen);

  return createPortal(
    <AnimatePresence>
      {isOpen && <EventModal setIsOpen={setIsOpen} mode={mode} />}
    </AnimatePresence>,
    mountElement
  );
}
