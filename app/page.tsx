import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { siteConfig } from "@/config/site.config"

export default function Main() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="grid grid-cols-3 gap-4">
        {siteConfig.sections.map((section, index) => {
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardFooter className="flex ">
                <Button asChild variant="default" className="w-full">
                  <Link href={section.href}>Go to example</Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
