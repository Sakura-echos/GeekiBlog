'use client'
import { Card, CardBody, Image, Button, Slider } from '@heroui/react'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { OrbitingCircles } from '@/components/magicui/orbiting-circles'
import { File, Settings, Search } from 'lucide-react'
const aboutMe = `这 里 是 Geeki 的 博 客 ， 一 名 热 爱 旅 游 ， 音 乐 与 技 术 的 前 端 开 发 者 。`

export default function Home() {
    return (
        <div className="">
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
                            简历（中文）
                        </InteractiveHoverButton>
                        <InteractiveHoverButton>
                            CV (English)
                        </InteractiveHoverButton>
                    </div>
                </div>
            </div>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>
            <p>2</p>

            {/* <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
                <OrbitingCircles>
                    <p>React</p>
                    <p>Vue</p>
                    <p>Angular</p>
                    <p>ReactNative</p>
                    <p>Redux</p>
                    <p>TypeScript</p>
                </OrbitingCircles>
                <OrbitingCircles radius={100} reverse>
                    <p>Android</p>
                    <p>IOS</p>
                    <p>Git</p>
                    <p>Charles</p>
                    <p>WireShark</p>
                </OrbitingCircles>
            </div> */}
        </div>
    )
}
