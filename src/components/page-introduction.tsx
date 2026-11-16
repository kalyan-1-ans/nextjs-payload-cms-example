const sizes = {
  home: {
    stack: 'gap-4',
    eyebrow: 'text-eyebrow leading-[1.6]',
    title: 'text-display',
    lede: 'text-lede',
  },
  about: {
    stack: 'gap-[18px]',
    eyebrow: 'text-eyebrow leading-[1.65]',
    title: 'text-title',
    lede: 'text-lede leading-[1.65]',
  },
} as const

type PageIntroductionProps = {
  eyebrow: string
  title: string
  lede: string
  size: keyof typeof sizes
}

export function PageIntroduction({ eyebrow, title, lede, size }: PageIntroductionProps) {
  const styles = sizes[size]

  return (
    <header className={`flex flex-col ${styles.stack}`}>
      <p className={`${styles.eyebrow} text-accent`}>{eyebrow}</p>
      <h1 className={`${styles.title} text-ink`}>{title}</h1>
      <p className={`${styles.lede} whitespace-pre-line text-secondary`}>{lede}</p>
    </header>
  )
}
