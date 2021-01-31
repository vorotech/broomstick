import styles from '../styles/Home.module.css'
import MyAppBar from '../components/MyAppBar'
import { useSession } from 'next-auth/client'
import MainApp from '../components/MainApp'

const Broomstick = () => {
  const [session, loading] = useSession()

  return (
  <>
    <MyAppBar />
    
    <div >
      <main className={styles.main}>
        {session && <>
        <MainApp />
      </>}
      
      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  </>
)}

export default Broomstick