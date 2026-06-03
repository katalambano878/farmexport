import { Skeleton } from "@/components/ui/skeleton"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Header Skeleton */}
      <section className="bg-[var(--hero-bg)] py-16 md:py-20">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Skeleton className="h-12 w-3/4 bg-white/10" />
            <Skeleton className="h-6 w-full bg-white/10" />
            <Skeleton className="h-6 w-2/3 bg-white/10" />
          </div>
        </Container>
      </section>

      <Section spacing="loose">
        {/* Filters Skeleton */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
            <Skeleton className="h-10 w-full md:max-w-sm" />
            <div className="flex gap-2">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-24" />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[250px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}





