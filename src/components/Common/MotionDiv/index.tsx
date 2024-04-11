import { MotionProps, motion } from "framer-motion";

const MotionDiv : React.FC<MotionProps & React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return(
    <motion.div
      initial={{ opacity: 0, y : 50 }}
      animate={{ opacity: 1, y : 0 }}
      // exit={{ opacity: 0, y : -50 }}
      transition={{ duration : 0.7 }}
      {...props}
      >
      {children}
    </motion.div>
  )
}

export default MotionDiv;