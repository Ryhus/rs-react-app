import './AboutStyles.scss';

function About() {
  return (
    <section className="about-container">
      <img className="autors-photo" src="photos/me.jpeg" alt="Author photo" />
      <h1>Yevhen Ryhus</h1>
      <p>
        I am a <span className="about-highlight">Data Scientist</span> and{' '}
        <span className="about-highlight">Software Engineer</span> with a
        passion for <span className="about-highlight">Machine Learning</span>,
        <span className="about-highlight">Quantitative Finance</span>, and
        creating things that work beautifully — whether it is a predictive model
        or a full-stack web app.
      </p>

      <div className="about-rss">
        <a href="https://rs.school/" target="_blank" rel="noopener noreferrer">
          <img
            src="/logos/rs-school-logo.svg"
            alt="RS School Logo"
            className="about-rss-logo"
          />
        </a>
        <p className="about-rss-text">Powered by RS School 🏫</p>
      </div>
    </section>
  );
}

export default About;
