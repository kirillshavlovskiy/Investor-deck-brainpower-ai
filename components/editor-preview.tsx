'use client'

import React from 'react'

export function EditorPreview() {
  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-2xl">
      {/* Top Bar */}
      <div className="bg-zinc-800 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>

      {/* Editor Interface */}
      <div className="flex h-[600px]">
        {/* Left Sidebar - Tools */}
        <div className="w-16 bg-zinc-800 p-2 flex flex-col gap-4">
          {/* Tool Icons */}
          {['text', 'image', 'shape', 'widget', 'layout'].map((tool) => (
            <div
              key={tool}
              className="w-12 h-12 rounded-lg bg-zinc-700 hover:bg-zinc-600 transition-colors cursor-pointer flex items-center justify-center text-white/60"
            >
              {tool[0].toUpperCase()}
            </div>
          ))}
        </div>

        {/* Main Editing Area */}
        <div className="flex-1 p-8 bg-zinc-950">
          {/* Editing Canvas */}
          <div className="bg-white rounded-lg h-full p-8">
            {/* Example Content */}
            <div className="space-y-4">
              <div className="h-12 w-3/4 bg-blue-100 rounded animate-pulse" />
              <div className="h-8 w-1/2 bg-gray-100 rounded animate-pulse" />
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="h-32 bg-purple-50 rounded animate-pulse" />
                <div className="h-32 bg-purple-50 rounded animate-pulse" />
                <div className="h-32 bg-purple-50 rounded animate-pulse" />
              </div>
              <div className="h-40 w-full bg-blue-50 rounded mt-8 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-64 bg-zinc-800 p-4">
          <div className="space-y-4">
            <div className="text-white/80 text-sm">Properties</div>
            {/* Property Controls */}
            {['Style', 'Layout', 'Effects', 'Animation'].map((prop) => (
              <div key={prop} className="p-3 bg-zinc-700 rounded-lg">
                <div className="text-white/60 text-sm">{prop}</div>
                <div className="h-4 bg-zinc-600 rounded mt-2 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 