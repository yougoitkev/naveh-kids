function Reveal(props: { children: React.ReactNode, delay?: number }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            type: "spring",
            delay: props.delay ?? 0.3,
            stiffness: 250,
            damping: 40,
          },
        }}
      >
        {props.children}
      </motion.div>
    </>
  );
}