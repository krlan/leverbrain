export default function WavyDivider({ dark = false }: { dark?: boolean }) {
  return <div className={dark ? 'wavy-divider-dark' : 'wavy-divider'} aria-hidden="true" />
}
