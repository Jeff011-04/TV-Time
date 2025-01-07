// pages/profile.js
import { useSession } from "next-auth/react";
import { firestore } from "../lib/firebase";

const Profile = () => {
  const { data: session } = useSession();

  const fetchWatchHistory = async () => {
    const userRef = firestore.collection("users").doc(session.user.email);
    const doc = await userRef.get();
    return doc.data()?.watchedShows || [];
  };

  return (
    <div>
      <h1>{session ? `${session.user.name}'s Profile` : "Loading..."}</h1>
      {session && (
        <div>
          <h2>Watch History:</h2>
          <ul>
            {fetchWatchHistory().map((show, index) => (
              <li key={index}>{show}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
