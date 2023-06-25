import Image from 'next/image'
import { useState, useEffect } from 'react'
import Menu from './Menu'
import UserMenu from './UserMenu'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router';

export default function Header() {
	const router = useRouter();

	const [showMenu, setShowMenu] = useState(false);
	const [showUser, setShowUser] = useState(false);

	const [logoColor, setLogoColor] = useState('light');
	const theme = useTheme();
	useEffect(() => {
		if (theme.theme === 'dark' || (theme.systemTheme === 'dark' && theme.theme === 'system')) {
			setLogoColor('dark');
		} else {
			setLogoColor('light');
		}
	}, [theme.theme, theme.systemTheme])

	return (<div className="fixed w-full top-0 z-50">
		<div className="h-20 flex justify-between p-3 bg-seclight dark:bg-secdark z-50">
			<Image src={`/menu_${logoColor}.svg`} width={100} height={1} alt="logo" className="button"
				onClick={() => (setShowMenu(!showMenu))} />

			<img src={`/logo_${logoColor}_mode.png`} alt="logo"
				className="button" onClick={() => router.push('/')} />

			<Image src={`/user_${logoColor}.svg`} width={100} height={1} alt="logo" className="button"
				onClick={() => (setShowUser(!showUser))} />
		</div>
		<Menu show={showMenu} hide={setShowMenu} />
		<UserMenu show={showUser} hide={setShowUser} />
	</div>)
}