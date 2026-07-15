import "./ProfileCard.css";

interface ProfileCardProps {
  name: string;
  age: number;
  city: string;
  verified: boolean;
  moveIn: string;
  roommatePreference: string;
}

function ProfileCard({
  name,
  age,
  city,
  verified,
  moveIn,
  roommatePreference,
}: ProfileCardProps) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <article className="profile-card">
      <header className="profile-card__header">
        <div
          className="profile-card__avatar"
          aria-hidden="true"
        >
          {initial}
        </div>

        <div className="profile-card__identity">
          <div className="profile-card__title-row">
            <h2>
              {name}, {age}
            </h2>

            {verified && (
              <span className="profile-card__badge">
                Verified
              </span>
            )}
          </div>

          <p>{city}</p>
        </div>
      </header>

      <div className="profile-card__details">
        <section className="profile-card__detail">
          <h3>Move-in</h3>
          <p>{moveIn}</p>
        </section>

        <section className="profile-card__detail">
          <h3>Roommate preference</h3>
          <p>{roommatePreference}</p>
        </section>
      </div>
    </article>
  );
}

export default ProfileCard;