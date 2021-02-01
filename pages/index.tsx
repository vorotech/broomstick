import styles from "../styles/Home.module.css";
import MyAppBar from "../components/MyAppBar";
import { useSession } from "next-auth/client";
import MainApp from "../components/MainApp";

const Broomstick = () => {
  const [session, loading] = useSession();

  return (
    <>
      <div className={styles.window}>
        <MyAppBar />

        <div className={styles.window__main}>
          <main className={styles.main}>
            {session && (
              <>
                <MainApp />
              </>
            )}
          </main>
        </div>
        <div className={styles.window__footer}>
          <footer className={styles.footer}>Broomstick poduction 2021</footer>
        </div>
      </div>
    </>
  );
};

export default Broomstick;
