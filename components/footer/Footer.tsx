function Footer() {
  return (
    <footer className="w-full flex justify-center py-6 bg-gray-900 border-t border-slate-300 dark:border-slate-700">
      <div className="text-white w-full max-w-7xl">
        <p className="font-bold text-sm text-center sm:text-left">
          © 2022 {process.env.NEXT_PUBLIC_OWNER_NAME}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
