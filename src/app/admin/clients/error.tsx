"use client";
export default function ClientsError({ reset }: { reset: () => void }) {
  return <div className="rounded-2xl bg-white p-8"><h2 className="text-xl font-semibold">Unable to load client records.</h2><p className="mt-3 text-sm text-slate-500">Please check your connection and Firebase configuration, then try again.</p><button onClick={reset} className="mt-5 rounded-full bg-blue-600 px-5 py-3 text-sm text-white">Try again</button></div>;
}
