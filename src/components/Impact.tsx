import { impact } from '../data/profile'
import { Reveal, SectionLabel } from './Reveal'

export default function Impact() {
  const [lead, ...rest] = impact
  return (
    <section className="container section" id="impact">
      <SectionLabel index="03">Leadership & service</SectionLabel>
      <Reveal>
        <h2 className="section-title">Code is only half of it. <em>People</em> are the rest.</h2>
      </Reveal>

      <div className="impact-grid">
        <Reveal className="impact-card impact-lead">
          <div className="impact-role mono">{lead.role}</div>
          <h3 className="impact-org">{lead.org}</h3>
          <p>{lead.body}</p>
          <ol className="phases">
            {lead.phases!.map((ph, i) => (
              <li key={ph}>
                <span className="mono">0{i + 1}</span>
                {ph}
              </li>
            ))}
          </ol>
        </Reveal>
        {rest.map((item, i) => (
          <Reveal key={item.org} delay={0.1 + i * 0.1} className="impact-card">
            <div className="impact-role mono">{item.role}</div>
            <h3 className="impact-org">{item.org}</h3>
            <p>{item.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
