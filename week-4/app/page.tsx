import React from "react"

export default function Home() {
  
  const ping = 10;
  return <div className="flex flex-col items-center justify-center gap-6 p-20 font-mono">
    <div>ping count: {ping}</div>
    <button className="border p-2 font-semibold rounded-lg px-12">ping</button>
  </div>
}