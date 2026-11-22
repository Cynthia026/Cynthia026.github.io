import { skills } from '@/content';
import { Section } from '@/components/layout/Section';
import styles from './Skills.module.css';

export function Skills() {
  return (
    <Section
      id="habilidades"
      component="Skills"
      title="Habilidades y certificaciones"
      intro="Herramientas con las que están construidos los proyectos de arriba, más mi certificación e idiomas."
    >
      <div className={styles.grid}>
        {skills.map((group) => (
          <div key={group.name} className={styles.group}>
            <h3 className={styles.name}>{group.name}</h3>
            <ul role="list" className={styles.items}>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
