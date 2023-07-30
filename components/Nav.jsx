"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Nav = () => {
  const {data:session}=useSession()
  const [providers, setProviders] = useState(null);
  const [toggleDropdown,setToggleDropdown]=useState(false)
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    setUpProviders();
  },[]);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <p className="logo_text text-green-800 font-bold">Kuotes.ID</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link className="black_btn" href={"/create-sambat"}>
              Create Quotes
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign out
            </button>
            <Link href={"/profile"}>
              <Image
                src={session?.user.image }
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
      {session?.user ? (
        <div className='flex'>
          <Image
            src={session?.user.image}
            width={37}
            height={37}
            className='rounded-full'
            alt='profile'
            onClick={() => setToggleDropdown(!toggleDropdown)}
          />

          {toggleDropdown && (
            <div className='dropdown'>
            <Link
                href='/'
                className='dropdown_link'
                onClick={() => setToggleDropdown(false)}
              >
                Home
              </Link>
              <Link
                href='/profile'
                className='dropdown_link'
                onClick={() => setToggleDropdown(false)}
              >
                {session?.user.name} Profile
              </Link>
              <Link
                href='/create-sambat'
                className='dropdown_link'
                onClick={() => setToggleDropdown(false)}
              >
                Gawe Sambat
              </Link>
              <button
                type='button'
                onClick={() => {
                  setToggleDropdown(false);
                  signOut();
                }}
                className='mt-5 w-full black_btn'
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type='button'
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}
                className='black_btn'
              >
                Sign in
              </button>
            ))}
        </>
      )}
    </div>
    </nav>
  );
};

export default Nav;
