import { Card, CardContent } from "@/components/ui/card"

interface WelcomeSectionProps {
  name: string
}

export default function WelcomeSection({ name }: WelcomeSectionProps) {
  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, {name}!</h1>
        <p className="text-gray-600 mt-2">We're delighted to have you as our guest. Enjoy your stay with us!</p>
      </CardContent>
    </Card>
  )
}
