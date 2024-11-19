export const outlineStyles = {
  dot: "w-2 h-2 bg-blue-500 rounded-full",
  border: "border-2 border-blue-500 border-dashed rounded-3xl pointer-events-none",
  positions: {
    topLeft: "-translate-x-1/2 -translate-y-1/2",
    topRight: "translate-x-1/2 -translate-y-1/2",
    bottomLeft: "-translate-x-1/2 translate-y-1/2",
    bottomRight: "translate-x-1/2 translate-y-1/2",
    topCenter: "-translate-x-1/2 -translate-y-1/2",
    bottomCenter: "-translate-x-1/2 translate-y-1/2",
    centerLeft: "-translate-x-1/2 -translate-y-1/2",
    centerRight: "translate-x-1/2 -translate-y-1/2"
  }
}

export const containerStyles = {
  main: "fixed inset-0 bg-black/90 backdrop-blur-md z-50",
  inner: "h-screen w-screen flex items-center justify-center",
  content: "bg-slate-200 w-full h-full p-4 relative editor-container flex",
  sidebar: "w-72 bg-zinc-800 p-4 rounded-lg shadow-lg h-full overflow-y-auto ml-4"
}

export const headerStyles = {
  container: "sticky top-0 z-[1000] bg-slate-800/40 backdrop-blur-md border-b border-slate-700/30",
  inner: "container mx-auto px-6 py-4",
  nav: "hidden md:flex items-center gap-8"
} 