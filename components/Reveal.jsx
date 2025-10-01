'use client'
import { useEffect, useRef, useState } from 'react'

export default function Reveal({image='/reveal-bg.jpg'}){
  const [open, setOpen] = useState(false)
  const cardRef = useRef(null)
  const maskRef = useRef(null)

  // useEffect 1: Initial position setup. 
  // এই useEffect এ DOM ম্যানিপুলেট করা হচ্ছে, যা লজিক্যালি onMove এর সাথে একই useEffect এ রাখা উচিত নয়।
  // তবে যেহেতু এর মধ্যে কোনো লজিক্যাল সমস্যা নেই, তাই রাখা হলো।
  useEffect(()=>{
    const el = cardRef.current
    if(!el) return
    el.style.setProperty('--cx', '50%')
    el.style.setProperty('--cy', '52%')
  }, [])

  // useEffect 2: MouseMove Listener Setup
  useEffect(()=>{
    const el = cardRef.current
    if(!el) return
    const onMove = (e)=>{
      const r = el.getBoundingClientRect()
      const cx = ((e.clientX - r.left)/r.width)*100
      const cy = ((e.clientY - r.top)/r.height)*100
      el.style.setProperty('--cx', cx + '%')
      el.style.setProperty('--cy', cy + '%')
    }
    el.addEventListener('mousemove', onMove)
    
    // FIX: মেমরি লিক এড়াতে ক্লিনআপ ফাংশন ঠিক আছে।
    return ()=> el.removeEventListener('mousemove', onMove)
  }, []) // [ ] নির্ভরতা অ্যারে ঠিক আছে, কারণ onMove ভেতরে ডিক্লেয়ার করা।

  const toggle = ()=> setOpen(v=>!v)

  return ( // <-- return স্টেটমেন্ট শুরু
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 py-12">
      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">I have a little secret for you...</h1>
        <p className="text-slate-300">And trust me... only <strong>YOU</strong> deserve this ✨</p>
        <div className="mt-4">
          <button onClick={toggle} className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-slate-200/10 bg-white/3 backdrop-blur text-white">
            {open ? 'Close' : 'Open it'}
          </button>
        </div>
      </div>

      <div ref={cardRef} className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#071026] to-[#081726]" style={{height: '420px', '--cx': '50%', '--cy': '52%'}}>
        
        {/* Image Placeholder Div */}
        <div 
          className={`absolute inset-0 bg-cover bg-center transform transition-transform duration-[900ms] ${open ? 'scale-105 -rotate-1' : ''}`} 
          style={{backgroundImage:`url(${image})`}} 
        />
        
        {/* FIX 1: Mask Div সিনট্যাক্স এরর ফিক্স: maskRef এর ভেতরের div টি সেল্ফ-ক্লোজিং ট্যাগ ছিল না এবং তার অ্যাট্রিবিউটগুলো ভুলভাবে লেখা হয়েছিল। */}
        {/* FIX 2: maskRef এর div ট্যাগটি অতিরিক্ত ছিল, সেটিকে সরিয়ে ভেতরের div-এ ref অ্যাট্রিবিউট যোগ করা হয়েছে। */}
        <div 
          ref={maskRef} // <-- ref অ্যাট্রিবিউট এই div এ আনা হলো
          className="absolute inset-0 reveal-mask pointer-events-none" 
          style={{
            clipPath: open ? 'circle(200% at var(--cx) var(--cy))' : 'circle(0% at var(--cx) var(--cy))',
            WebkitClipPath: open ? 'circle(200% at var(--cx) var(--cy))' : 'circle(0% at var(--cx) var(--cy))',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.35))'
          }}
        >
          
          {/* Content Div 1 */}
          <div className={`absolute inset-0 z-10 flex items-center justify-center p-6 transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="max-w-xs text-center rounded-xl p-6 bg-white/6 backdrop-blur border border-white/6">
              <h3 className="text-xl font-semibold text-white">Here’s your secret ✨</h3>
              <p className="text-slate-200 mt-2">You are awesome. Keep building cool stuff — and never stop learning.</p>
              <div className="mt-4">
                <a className="inline-block px-4 py-2 rounded-full bg-white/8 border border-white/10 text-white" href="#">Say Thanks</a>
              </div>
            </div>
          </div>

          {/* Content Div 2 */}
          <div className={`absolute inset-0 z-20 flex items-center justify-center p-6 transition-opacity duration-500 ${open ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">I have a little secret for you...</h2>
              <p className="text-slate-200 mt-2">Press <span className="font-semibold">Open it</span> to reveal.</p>
            </div>
          </div>
        </div> {/* maskRef div বন্ধ */}

      </div> {/* cardRef div বন্ধ */}
    </div>
  ) // <-- return স্টেটমেন্ট বন্ধনী
} // <-- Reveal ফাংশন বন্ধনী
