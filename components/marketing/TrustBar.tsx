import { Globe2, FileCheck, Package, ShieldCheck, Leaf, Truck } from 'lucide-react'
import { Container } from '@/components/layout/Container'

const trustItems = [
  { icon: ShieldCheck, title: "Raw / Unrefined", desc: "Grade A Quality" },
  { icon: Leaf, title: "Low Moisture", desc: "Extended Shelf Life" },
  { icon: Package, title: "Clean Packaging", desc: "Food-Grade Drums/Boxes" },
  { icon: FileCheck, title: "Export Docs", desc: "COA, MSDS, Phyto" },
  { icon: Truck, title: "Consistent Supply", desc: "Year-Round Sourcing" },
  { icon: Globe2, title: "Traceability", desc: "Farm to Port" },
]

export function TrustBar() {
  return (
    <div className="py-6 bg-slate-50/50 border-y border-slate-100">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trustItems.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center group p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-300 border border-transparent hover:border-slate-100">
              <div className="mb-2 p-2 rounded-md bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-xs text-slate-900 mb-0.5">{item.title}</h3>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}





