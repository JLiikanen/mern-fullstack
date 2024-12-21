import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

export default function MyTest() {
    return (
        <div>
            <div>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                </SelectContent>
            </Select>
            </div>
        <div className="md:container mx-16 border-2 border-slate-500">
            <ul>
                <li>iiiiiiiiiiiiitem</li>
            </ul>
        </div>
                {/* Example of using the aspect class */}
            <div className="mx-16 mt-4 border-2 border-blue-500 aspect-[16/9] bg-gray-100 mb-80">
            <p className="text-center">Aspect Ratio: 16:9</p>
        </div>
        </div>
        

    )

}

