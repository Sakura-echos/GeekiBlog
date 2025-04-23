'use client'
import { Link } from '@heroui/link'
import { Snippet } from '@heroui/snippet'
import { Code } from '@heroui/code'
import { button as buttonStyles } from '@heroui/theme'

import { siteConfig } from '@/config/site'
import { title, subtitle } from '@/components/primitives'
import { GithubIcon } from '@/components/icons'
import { Image } from '@heroui/react'

export default function Home() {
    return (
        <div>
            <Image
                isBlurred
                alt="HeroUI Album Cover"
                className="m-5"
                src="https://heroui.com/images/album-cover.png"
                width={240}
            />
        </div>
    )
}
