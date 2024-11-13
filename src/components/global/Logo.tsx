import Link from 'next/link';

const styles = {
  container: {
    base: 'cursor-pointer rounded-lg p-2',
    background: 'bg-gradient-to-bl from-indigo-500 to-purple-500',
    hover: 'hover:scale-[1.025] hover:animate-pulse duration-500 ease-in-out',
  },
  text: 'font-mono text-xl font-bold capitalize text-white',
};

export const Logo = () => {
  return (
    <div
      className={`${styles.container.base} ${styles.container.background} ${styles.container.hover}`}
    >
      <Link href="/" className={styles.text}>
        convert images
      </Link>
    </div>
  );
};
