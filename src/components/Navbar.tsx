import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './Navbar.module.css'
import { useAuthContext } from "../hooks/useAuthContext"

export default function Navbar() {
  const {logout} = useLogout()
  const { user }: any = useAuthContext()

  return (
    <nav className={styles.navbar}>
      <ul className={styles.list}>
        <li className={styles.title}>Crypto Transaction Tracker</li>

        {!user && (
        <>
        <li className="btn btn-success"><Link to="/login">Login</Link></li>
        &nbsp;
        <li className="btn btn-success"><Link to="/signup">Signup</Link></li>
        </>
        )}

        {user && (
        <>
          <li>Hello, {user.displayName}</li>
            <li>
            &nbsp;
        <button className="btn btn-danger" onClick={logout}>Logout</button>
            </li>
        </>
        )}

      </ul>
    </nav>
  )
}