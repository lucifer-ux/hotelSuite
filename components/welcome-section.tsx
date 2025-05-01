import { Card, CardContent } from "@/components/ui/card"

interface WelcomeSectionProps {
  name: string
}

export default function WelcomeSection({ name }: WelcomeSectionProps) {
  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Welcome, {name}!</h1>
      </CardContent>
    </Card>
  )
}
