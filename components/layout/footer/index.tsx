function Footer() {
  return (
    <footer className="flex w-full justify-center border-t border-slate-300 bg-gray-900 p-4 py-6 dark:border-slate-700">
      <div className="w-full max-w-7xl text-white">
        <p className="text-center text-sm font-bold sm:text-left">
          © 2022 {process.env.NEXT_PUBLIC_OWNER_NAME}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
