import * as React from "react";
import { motion } from "framer-motion";

interface ListMotionProps {
  children: React.ReactNode;
  className?: string;
}

const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const item = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 20 },
};

export const ListMotion: React.FC<ListMotionProps> = ({
  children,
  className,
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={list}
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={item}>{child}</motion.div>
      ))}
    </motion.div>
  );
};
