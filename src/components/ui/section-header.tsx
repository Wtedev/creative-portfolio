type SectionHeaderProps = {
  title: string;
  intro?: string;
  id?: string;
};

export function SectionHeader({ title, intro, id }: SectionHeaderProps) {
  return (
    <header className="section-header">
      <h2 id={id} className="text-h2 section-header__title">
        {title}
      </h2>
      {intro ? <p className="text-body-lg section-header__intro">{intro}</p> : null}
    </header>
  );
}
