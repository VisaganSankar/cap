import React from 'react';

const Team = () => {
  return (
    <section id="team" className="section alt">
      <div className="container" style={{textAlign: 'center'}}>
        <h2>Built by Final‑Year Engineers</h2>
        <div className="avatars" style={{justifyContent: 'center'}}>
          <div className="avatar">
            <img src="https://api.dicebear.com/7.x/identicon/svg?seed=1" alt="Member" />
            <span>Aishwarya </span><span>Vijayakumar</span>
          </div>
          <div className="avatar">
            <img src="https://api.dicebear.com/7.x/identicon/svg?seed=2" alt="Member" />
            <span>Abinash Das</span>
          </div>
          <div className="avatar">
            <img src="https://api.dicebear.com/7.x/identicon/svg?seed=3" alt="Member" />
            <span>Visagan</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
