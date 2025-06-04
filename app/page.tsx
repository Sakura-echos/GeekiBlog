'use client'
import { Card, CardBody, Image, Button, Slider } from '@heroui/react'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { OrbitingCircles } from '@/components/magicui/orbiting-circles'
import { File, Settings, Search } from 'lucide-react'
import HeroImage from '@/components/hero-image'
const aboutMe = `I am a front-end developer who loves traveling, music, and technology.`

export default function Home() {
    return (
        <div>
            <div className="relative flex justify-end">
                {/* <Image
                    isBlurred
                    alt="HeroUI Album Cover"
                    className="m-5"
                    src="/image/my-avatar.jpg"
                    width={240}
                /> */}
                <div className="absolute left-0 top-52">
                    <p className="text-4xl font-bold">
                        Hi 👋🏻! This is Geeki's blog
                    </p>
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
                <div className="relative w-3/4">
                    <HeroImage />
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
