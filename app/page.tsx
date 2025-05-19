'use client'
import { Card, CardBody, Image, Button, Slider } from '@heroui/react'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { OrbitingCircles } from '@/components/magicui/orbiting-circles'
import { File, Settings, Search } from 'lucide-react'
const aboutMe = `Hi! This is Geeki's blog, a front-end developer who loves traveling, music, and technology.`

export default function Home() {
    return (
        <div>
            <div className="flex items-center justify-center m-32">
                <Image
                    isBlurred
                    alt="HeroUI Album Cover"
                    className="m-5"
                    src="/image/my-avatar.jpg"
                    width={240}
                />
                <div className="ml-20">
                    <p className="text-4xl font-bold">Welcome Geeki's blog!</p>
                    <TextGenerateEffect words={aboutMe} />
                    <div className="flex mt-5 gap-4">
                        <InteractiveHoverButton>
                            CV (English)
                        </InteractiveHoverButton>
                        <InteractiveHoverButton>
                            简历（中文）
                        </InteractiveHoverButton>
                    </div>
                </div>
            </div>

            <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
                <OrbitingCircles>
                    <Image
                        src="/icons/React.svg"
                        alt="React Icon"
                        width={50}
                        height={50}
                    />
                    <Image
                        src="/icons/Vue.svg"
                        alt="Vue Icon"
                        width={50}
                        height={50}
                    />
                    <Image
                        src="/icons/Angular.svg"
                        alt="Angular Icon"
                        width={50}
                        height={50}
                    />
                    <Image
                        src="/icons/CSS3.svg"
                        alt="CSS3 Icon"
                        width={50}
                        height={50}
                    />
                    <Image
                        src="/icons/HTML5.svg"
                        alt="HTML5 Icon"
                        width={50}
                        height={50}
                    />
                    <Image
                        src="/icons/Typescript.svg"
                        alt="Typescript Icon"
                        width={50}
                        height={50}
                    />
                    <Image
                        src="/icons/Javascript.svg"
                        alt="Javascript Icon"
                        width={50}
                        height={50}
                    />
                </OrbitingCircles>
                <OrbitingCircles radius={90} reverse>
                    <Image
                        src="/icons/Android.svg"
                        alt="Android Icon"
                        width={50}
                        height={50}
                    />
                    <Image
                        src="/icons/Ios.svg"
                        alt="Ios Icon"
                        width={50}
                        height={50}
                    />
                    <Image
                        src="/icons/Github.svg"
                        alt="Github Icon"
                        width={50}
                        height={50}
                    />
                    <Image
                        src="/icons/Wireshark.svg"
                        alt="Wireshark Icon"
                        width={50}
                        height={50}
                    />
                </OrbitingCircles>
            </div>

            <div className="flex flex-col gap-10"></div>
        </div>
    )
}
