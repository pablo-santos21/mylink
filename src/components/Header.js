import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LogoutButton from '@/components/buttons/LogoutButton';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="bg-white border-b py-4">
      <div className="max-w-4xl flex justify-between mx-auto px-6">
        <div className="flex items-center gap-6">
          <Link href={'/'} className="flex items-center gap-2 text-mainColor">
            <FontAwesomeIcon icon={faLink} className="text-mainColor" />
            <span className="font-bold">LinkList</span>
          </Link>
          <nav className="flex items-center gap-4 text-slate-500 text-sm">
            <Link href={'/about'}>Sobre</Link>
            <Link href={'/pricing'}>Preços</Link>
            <Link href={'/contact'}>Contato</Link>
            <Link href={'/account'}>Configurar página</Link>
          </nav>
        </div>
        <nav className="flex items-center gap-4 text-sm text-slate-500">
          {!!session && (
            <>
              <Link href={'/account'}>olá , {session?.user?.name}</Link>
              <LogoutButton />
            </>
          )}
          {!session && (
            <>
              <Link href={'/login'}>Sign In</Link>
              <Link href={'/login'}>Criar Conta</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
