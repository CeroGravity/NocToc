import Image from 'next/image'
import { auth } from '../firebase'
import useAuth from '../hooks/useAuth'
import { useAuthState } from 'react-firebase-hooks/auth'

interface Props {
  logoutOnPress: boolean
}

function Avatar({ logoutOnPress }: Props) {
  const { logout } = useAuth()
  const [user] = useAuthState(auth)

  return (
    <Image
      className="rounded-full bg-black cursor-pointer hover:opacity-75"
      src={`https://avatars.dicebear.com/api/miniavs/male/${user?.email}.svg`}
      layout="fill"
      onClick={() => logoutOnPress && logout()}
      alt="userAvs"
    />
  )
}

export default Avatar
